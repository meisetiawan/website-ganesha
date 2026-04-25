import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

// GET single slider
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sliderId = parseInt(id);

    const rows = await query<RowDataPacket[]>(
      "SELECT * FROM sliders WHERE id = ?",
      [sliderId]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Slider tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error fetching slider:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data slider" },
      { status: 500 }
    );
  }
}

// PUT update slider
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sliderId = parseInt(id);
    const body = await request.json();
    const { title, subtitle, image_url, link_url, link_text, is_active, sort_order } = body;

    const result = await query<ResultSetHeader>(
      `UPDATE sliders SET 
        title = ?, subtitle = ?, image_url = ?, link_url = ?, 
        link_text = ?, is_active = ?, sort_order = ?, updated_at = NOW()
      WHERE id = ?`,
      [title, subtitle, image_url, link_url, link_text, is_active ? 1 : 0, sort_order || 0, sliderId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Slider tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Slider berhasil diperbarui" });
  } catch (error) {
    console.error("Error updating slider:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui slider" },
      { status: 500 }
    );
  }
}

// DELETE slider
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sliderId = parseInt(id);

    const result = await query<ResultSetHeader>(
      "DELETE FROM sliders WHERE id = ?",
      [sliderId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Slider tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Slider berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting slider:", error);
    return NextResponse.json(
      { error: "Gagal menghapus slider" },
      { status: 500 }
    );
  }
}
