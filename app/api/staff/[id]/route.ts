import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import type { Staff } from '@/lib/types';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// GET /api/staff/[id] - Get single staff by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const url = new URL(request.url);
    const isAdmin = url.searchParams.get('admin') === 'true';
    
    const activeCondition = isAdmin ? '' : 'AND is_active = 1';
    const staff = await query<RowDataPacket[]>(
      `SELECT * FROM staff WHERE id = ? ${activeCondition}`,
      [id]
    );

    if (staff && staff.length > 0) {
      return NextResponse.json(staff[0] as unknown as Staff);
    }

    return NextResponse.json(
      { success: false, error: 'Staff tidak ditemukan' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error fetching staff:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data staff' },
      { status: 500 }
    );
  }
}

// PUT /api/staff/[id] - Update staff (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, position, department, image_url, photo_url, email, phone, bio, is_active } = body;

    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || request.cookies.get('auth_token')?.value;
    
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Accept both image_url and photo_url
    const finalImageUrl = image_url || photo_url;

    const result = await query<ResultSetHeader>(
      `UPDATE staff SET 
        name = COALESCE(?, name),
        position = COALESCE(?, position),
        department = COALESCE(?, department),
        image_url = COALESCE(?, image_url),
        email = COALESCE(?, email),
        phone = COALESCE(?, phone),
        bio = COALESCE(?, bio),
        is_active = COALESCE(?, is_active),
        updated_at = NOW()
       WHERE id = ?`,
      [name, position, department, finalImageUrl, email, phone, bio, is_active !== undefined ? (is_active ? 1 : 0) : null, id]
    );

    if (result.affectedRows > 0) {
      return NextResponse.json({
        success: true,
        message: 'Staff berhasil diperbarui',
      });
    }

    return NextResponse.json(
      { success: false, error: 'Staff tidak ditemukan' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error updating staff:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal memperbarui staff' },
      { status: 500 }
    );
  }
}

// DELETE /api/staff/[id] - Delete staff (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || request.cookies.get('auth_token')?.value;
    
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const result = await query<ResultSetHeader>(
      `DELETE FROM staff WHERE id = ?`,
      [id]
    );

    if (result.affectedRows > 0) {
      return NextResponse.json({
        success: true,
        message: 'Staff berhasil dihapus',
      });
    }

    return NextResponse.json(
      { success: false, error: 'Staff tidak ditemukan' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error deleting staff:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal menghapus staff' },
      { status: 500 }
    );
  }
}
