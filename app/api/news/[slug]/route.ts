import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import type { News } from '@/lib/types';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// GET /api/news/[slug] - Get single news by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const url = new URL(request.url);
    const isAdmin = url.searchParams.get('admin') === 'true';
    
    const statusCondition = isAdmin ? '' : 'AND is_published = 1';
    const news = await query<RowDataPacket[]>(
      `SELECT *, CASE WHEN is_published = 1 THEN 'published' ELSE 'draft' END as status FROM news WHERE slug = ? ${statusCondition}`,
      [slug]
    );

    if (news && news.length > 0) {
      if (!isAdmin) {
        await query(`UPDATE news SET view_count = view_count + 1 WHERE slug = ?`, [slug]);
      }
      return NextResponse.json(news[0] as unknown as News);
    }

    return NextResponse.json(
      { success: false, error: 'Berita tidak ditemukan' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data berita' },
      { status: 500 }
    );
  }
}

// PUT /api/news/[slug] - Update news (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { title, excerpt, content, featured_image, image_url, status } = body;

    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || request.cookies.get('auth_token')?.value;
    
    console.log('[v0] PUT news - token exists:', !!token);
    console.log('[v0] PUT news - auth header:', authHeader ? 'present' : 'missing');
    console.log('[v0] PUT news - cookie token:', request.cookies.get('auth_token')?.value ? 'present' : 'missing');
    
    if (!token || !verifyToken(token)) {
      console.log('[v0] PUT news - verifyToken result:', token ? verifyToken(token) : 'no token');
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const isPublished = status === 'published' ? 1 : (status === 'draft' ? 0 : null);
    // Accept both featured_image and image_url
    const imageUrl = image_url || featured_image;
    
    const result = await query<ResultSetHeader>(
      `UPDATE news SET 
        title = COALESCE(?, title),
        excerpt = COALESCE(?, excerpt),
        content = COALESCE(?, content),
        image_url = COALESCE(?, image_url),
        is_published = COALESCE(?, is_published),
        updated_at = NOW()
       WHERE slug = ?`,
      [title, excerpt, content, imageUrl, isPublished, slug]
    );

    if (result.affectedRows > 0) {
      return NextResponse.json({
        success: true,
        message: 'Berita berhasil diperbarui',
      });
    }

    return NextResponse.json(
      { success: false, error: 'Berita tidak ditemukan' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal memperbarui berita' },
      { status: 500 }
    );
  }
}

// DELETE /api/news/[slug] - Delete news (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || request.cookies.get('auth_token')?.value;
    
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const result = await query<ResultSetHeader>(
      `DELETE FROM news WHERE slug = ?`,
      [slug]
    );

    if (result.affectedRows > 0) {
      return NextResponse.json({
        success: true,
        message: 'Berita berhasil dihapus',
      });
    }

    return NextResponse.json(
      { success: false, error: 'Berita tidak ditemukan' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal menghapus berita' },
      { status: 500 }
    );
  }
}
