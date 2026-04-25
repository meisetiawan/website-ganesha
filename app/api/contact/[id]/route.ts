import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { RowDataPacket, ResultSetHeader } from "mysql2";

// GET single message (protected)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.cookies.get("auth_token")?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const rows = await query<RowDataPacket[]>(
      "SELECT * FROM contact_messages WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Pesan tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error fetching message:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data pesan" },
      { status: 500 }
    );
  }
}

// PUT mark as read (protected)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.cookies.get("auth_token")?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { is_read } = body;

    const result = await query<ResultSetHeader>(
      "UPDATE contact_messages SET is_read = ? WHERE id = ?",
      [is_read ? 1 : 0, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Pesan tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Status pesan berhasil diperbarui" });
  } catch (error) {
    console.error("Error updating message:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui pesan" },
      { status: 500 }
    );
  }
}

// DELETE message (protected)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.cookies.get("auth_token")?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const result = await query<ResultSetHeader>(
      "DELETE FROM contact_messages WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Pesan tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Pesan berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { error: "Gagal menghapus pesan" },
      { status: 500 }
    );
  }
}
