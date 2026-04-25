import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import type { ContactMessage } from '@/lib/types';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// GET /api/contact - Get all messages (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const offset = (page - 1) * limit;

    // Note: LIMIT and OFFSET must be embedded directly in query string for MySQL prepared statements
    const statusFilter = status ? ` WHERE status = '${status}'` : '';
    const sql = `SELECT * FROM contact_messages${statusFilter} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const messages = await query<RowDataPacket[]>(sql);

    // Get total count
    let countSql = `SELECT COUNT(*) as total FROM contact_messages`;
    const countParams: string[] = [];
    if (status) {
      countSql += ` WHERE status = ?`;
      countParams.push(status);
    }

    const [countResult] = await query<RowDataPacket[]>(countSql, countParams);
    const total = countResult?.total || 0;

    return NextResponse.json({
      success: true,
      data: messages as unknown as ContactMessage[],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data pesan. Pastikan database terhubung.' },
      { status: 500 }
    );
  }
}

// PUT /api/contact - Update message status (admin only)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'ID dan status harus diisi' },
        { status: 400 }
      );
    }

    const validStatuses = ['unread', 'read', 'replied'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Status tidak valid' },
        { status: 400 }
      );
    }

    await query<ResultSetHeader>(
      `UPDATE contact_messages SET status = ?, updated_at = NOW() WHERE id = ?`,
      [status, id]
    );

    return NextResponse.json({
      success: true,
      message: 'Status berhasil diperbarui',
    });
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal memperbarui status' },
      { status: 500 }
    );
  }
}

// POST /api/contact - Submit contact form (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Nama, email, subjek, dan pesan harus diisi' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Format email tidak valid' },
        { status: 400 }
      );
    }

    const result = await query<ResultSetHeader>(
      `INSERT INTO contact_messages (name, email, phone, subject, message, status)
       VALUES (?, ?, ?, ?, ?, 'unread')`,
      [name, email, phone || '', subject, message]
    );

    return NextResponse.json({
      success: true,
      data: { id: result.insertId },
      message: 'Pesan berhasil dikirim',
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengirim pesan. Pastikan database terhubung.' },
      { status: 500 }
    );
  }
}
