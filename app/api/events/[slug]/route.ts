import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import type { Event } from '@/lib/types';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// GET /api/events/[slug] - Get single event by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const url = new URL(request.url);
    const isAdmin = url.searchParams.get('admin') === 'true';
    
    const statusCondition = isAdmin ? '' : 'AND is_published = 1';
    const events = await query<RowDataPacket[]>(
      `SELECT *, CASE WHEN is_published = 1 THEN 'published' ELSE 'draft' END as status FROM events WHERE slug = ? ${statusCondition}`,
      [slug]
    );

    if (events && events.length > 0) {
      return NextResponse.json(events[0] as unknown as Event);
    }

    return NextResponse.json(
      { success: false, error: 'Agenda tidak ditemukan' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data agenda' },
      { status: 500 }
    );
  }
}

// PUT /api/events/[slug] - Update event (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { title, description, location, image_url, start_date, end_date, status } = body;

    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || request.cookies.get('auth_token')?.value;
    
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const isPublished = status === 'published' ? 1 : (status === 'draft' ? 0 : null);

    const result = await query<ResultSetHeader>(
      `UPDATE events SET 
        title = COALESCE(?, title),
        description = COALESCE(?, description),
        location = COALESCE(?, location),
        image_url = COALESCE(?, image_url),
        start_date = COALESCE(?, start_date),
        end_date = COALESCE(?, end_date),
        is_published = COALESCE(?, is_published),
        updated_at = NOW()
       WHERE slug = ?`,
      [title, description, location, image_url, start_date, end_date, isPublished, slug]
    );

    if (result.affectedRows > 0) {
      return NextResponse.json({
        success: true,
        message: 'Agenda berhasil diperbarui',
      });
    }

    return NextResponse.json(
      { success: false, error: 'Agenda tidak ditemukan' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal memperbarui agenda' },
      { status: 500 }
    );
  }
}

// DELETE /api/events/[slug] - Delete event (admin only)
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
      `DELETE FROM events WHERE slug = ?`,
      [slug]
    );

    if (result.affectedRows > 0) {
      return NextResponse.json({
        success: true,
        message: 'Agenda berhasil dihapus',
      });
    }

    return NextResponse.json(
      { success: false, error: 'Agenda tidak ditemukan' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal menghapus agenda' },
      { status: 500 }
    );
  }
}
