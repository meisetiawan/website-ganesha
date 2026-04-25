import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import type { Event } from '@/lib/types';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// GET /api/events - Get all events (public) or with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const upcoming = searchParams.get('upcoming');
    const admin = searchParams.get('admin') === 'true';
    const offset = (page - 1) * limit;

    // Admin can see all statuses, public only sees published
    // Database uses is_published (1/0) instead of status
    // Note: LIMIT and OFFSET must be embedded directly in query string for MySQL prepared statements
    const upcomingFilter = upcoming === 'true' ? ` AND start_date >= CURDATE()` : '';
    
    const sql = admin 
      ? `SELECT *, CASE WHEN is_published = 1 THEN 'published' ELSE 'draft' END as status FROM events WHERE 1=1${upcomingFilter} ORDER BY start_date ASC LIMIT ${limit} OFFSET ${offset}` 
      : `SELECT *, 'published' as status FROM events WHERE is_published = 1${upcomingFilter} ORDER BY start_date ASC LIMIT ${limit} OFFSET ${offset}`;

    const events = await query<RowDataPacket[]>(sql);

    // Get total count for pagination
    let countSql = admin 
      ? `SELECT COUNT(*) as total FROM events WHERE 1=1` 
      : `SELECT COUNT(*) as total FROM events WHERE is_published = 1`;
    if (upcoming === 'true') {
      countSql += ` AND start_date >= CURDATE()`;
    }

    const [countResult] = await query<RowDataPacket[]>(countSql);
    const total = countResult?.total || 0;

    return NextResponse.json({
      success: true,
      data: events as unknown as Event[],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data agenda. Pastikan database terhubung.' },
      { status: 500 }
    );
  }
}

// POST /api/events - Create event (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, description, image_url, location, start_date, end_date, status } = body;

    if (!title || !start_date) {
      return NextResponse.json(
        { success: false, error: 'Judul dan tanggal mulai harus diisi' },
        { status: 400 }
      );
    }

    // Generate slug if not provided
    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || request.cookies.get('auth_token')?.value;
    
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const isPublished = status === 'published' ? 1 : 0;
    const result = await query<ResultSetHeader>(
      `INSERT INTO events (title, slug, description, image_url, location, start_date, end_date, is_published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, finalSlug, description || '', image_url || '', location || '', start_date, end_date || start_date, isPublished]
    );

    return NextResponse.json({
      success: true,
      data: { id: result.insertId, slug: finalSlug },
      message: 'Agenda berhasil ditambahkan',
    });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal menambahkan agenda. Pastikan database terhubung.' },
      { status: 500 }
    );
  }
}
