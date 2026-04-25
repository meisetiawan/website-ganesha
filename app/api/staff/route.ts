import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import type { Staff } from '@/lib/types';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// GET /api/staff - Get all staff (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get('department');
    const admin = searchParams.get('admin') === 'true';

    // Build query with embedded values to avoid prepared statement issues
    const departmentFilter = department ? ` AND department = '${department.replace(/'/g, "''")}'` : '';
    
    const sql = admin 
      ? `SELECT * FROM staff WHERE 1=1${departmentFilter} ORDER BY order_index ASC, name ASC` 
      : `SELECT * FROM staff WHERE is_active = 1${departmentFilter} ORDER BY order_index ASC, name ASC`;

    const staff = await query<RowDataPacket[]>(sql);

    return NextResponse.json({
      success: true,
      data: staff as unknown as Staff[],
    });
  } catch (error) {
    console.error('Error fetching staff:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data staff. Pastikan database terhubung.' },
      { status: 500 }
    );
  }
}

// POST /api/staff - Create staff (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, nip, role, position, department, photo_url, email, phone, education, bio, sort_order, is_active } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Nama harus diisi' },
        { status: 400 }
      );
    }

    // Use role as position if position is not provided
    const finalPosition = position || role || 'Staff';

    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || request.cookies.get('auth_token')?.value;
    
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const result = await query<ResultSetHeader>(
      `INSERT INTO staff (name, position, department, image_url, email, phone, bio, order_index, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, finalPosition, department || '', photo_url || '', email || '', phone || '', bio || '', sort_order || 0, is_active !== false ? 1 : 0]
    );

    return NextResponse.json({
      success: true,
      data: { id: result.insertId },
      message: 'Staff berhasil ditambahkan',
    });
  } catch (error) {
    console.error('Error creating staff:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal menambahkan staff. Pastikan database terhubung.' },
      { status: 500 }
    );
  }
}
