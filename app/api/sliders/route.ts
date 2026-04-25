import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import type { Slider } from '@/lib/types';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// GET /api/sliders - Get all sliders
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const admin = searchParams.get('admin') === 'true';

    const sql = admin 
      ? `SELECT * FROM sliders ORDER BY sort_order ASC`
      : `SELECT * FROM sliders WHERE is_active = 1 ORDER BY sort_order ASC`;
    
    const sliders = await query<RowDataPacket[]>(sql);
    return NextResponse.json(sliders as unknown as Slider[]);
  } catch (error) {
    console.error('Error fetching sliders:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data slider. Pastikan database terhubung.' },
      { status: 500 }
    );
  }
}

// POST /api/sliders - Create slider
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, subtitle, image_url, link_url, link_text, sort_order, is_active } = body;

    if (!title || !image_url) {
      return NextResponse.json(
        { error: 'Judul dan URL gambar harus diisi' },
        { status: 400 }
      );
    }

    const result = await query<ResultSetHeader>(
      `INSERT INTO sliders (title, subtitle, image_url, link_url, link_text, sort_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, subtitle || '', image_url, link_url || '', link_text || '', sort_order || 0, is_active !== false ? 1 : 0]
    );

    return NextResponse.json({
      success: true,
      data: { id: result.insertId },
      message: 'Slider berhasil ditambahkan',
    });
  } catch (error) {
    console.error('Error creating slider:', error);
    return NextResponse.json(
      { error: 'Gagal menambahkan slider. Pastikan database terhubung.' },
      { status: 500 }
    );
  }
}
