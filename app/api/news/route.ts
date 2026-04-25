import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import type { News } from '@/lib/types';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// GET /api/news - Get all news (public) or with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const admin = searchParams.get('admin') === 'true';
    const offset = (page - 1) * limit;

    // Admin can see all statuses, public only sees published
    // Database uses is_published (1/0) instead of status
    // Note: LIMIT and OFFSET must be embedded directly in query string for MySQL prepared statements
    const sql = admin 
      ? `SELECT *, CASE WHEN is_published = 1 THEN 'published' ELSE 'draft' END as status FROM news WHERE 1=1 ORDER BY published_at DESC LIMIT ${limit} OFFSET ${offset}` 
      : `SELECT *, 'published' as status FROM news WHERE is_published = 1 ORDER BY published_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const news = await query<RowDataPacket[]>(sql);

    // Get total count for pagination
    let countSql = admin 
      ? `SELECT COUNT(*) as total FROM news WHERE 1=1` 
      : `SELECT COUNT(*) as total FROM news WHERE is_published = 1`;

    const [countResult] = await query<RowDataPacket[]>(countSql);
    const total = countResult?.total || 0;

    return NextResponse.json({
      success: true,
      data: news as unknown as News[],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data berita. Pastikan database terhubung.' },
      { status: 500 }
    );
  }
}

// POST /api/news - Create news (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, image_url, status } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Judul dan konten harus diisi' },
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
      `INSERT INTO news (title, slug, excerpt, content, image_url, is_published, published_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [title, finalSlug, excerpt || '', content, image_url || '', isPublished]
    );

    return NextResponse.json({
      success: true,
      data: { id: result.insertId, slug: finalSlug },
      message: 'Berita berhasil ditambahkan',
    });
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal menambahkan berita. Pastikan database terhubung.' },
      { status: 500 }
    );
  }
}
