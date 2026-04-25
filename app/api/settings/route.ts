import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import type { SiteSetting } from '@/lib/types';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// Default settings (used when database is empty)
const defaultSettings: Record<string, string> = {
  site_name: "SMA Negeri 1 Purbalingga",
  site_description: "Sekolah Menengah Atas Negeri 1 Purbalingga - Mencetak generasi unggul, berkarakter, dan siap bersaing di era global",
  contact_email: "info@sma1purbalingga.sch.id",
  contact_phone: "(0281) 891202",
  address: "Jl. Letjend. S. Parman No. 150, Purbalingga, Jawa Tengah 53312",
  operational_hours: "Senin - Jumat: 07.00 - 15.00 WIB",
  facebook_url: "https://facebook.com/sman1purbalingga",
  instagram_url: "https://instagram.com/sman1purbalingga",
  youtube_url: "https://youtube.com/@sman1purbalingga",
  maps_embed_url: "",
};

// GET /api/settings - Get all settings
export async function GET(request: NextRequest) {
  try {
    const settings = await query<RowDataPacket[]>(`SELECT * FROM settings`);

    const settingsMap: Record<string, string> = { ...defaultSettings };
    (settings as unknown as SiteSetting[]).forEach((setting) => {
      settingsMap[setting.setting_key] = setting.setting_value;
    });

    return NextResponse.json(settingsMap);
  } catch (error) {
    console.error('Error fetching settings:', error);
    // Return default settings if database fails
    return NextResponse.json(defaultSettings);
  }
}

// PUT /api/settings - Update settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Handle both formats: direct object or wrapped in "settings" key
    const settings = body.settings || body;

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Settings object is required' },
        { status: 400 }
      );
    }

    const authHeader = request.headers.get('authorization');
    const cookieToken = request.cookies.get('auth_token')?.value;
    const token = authHeader?.replace('Bearer ', '') || cookieToken;
    
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Update each setting in database
    for (const [key, value] of Object.entries(settings)) {
      if (typeof value === 'string') {
        await query<ResultSetHeader>(
          `INSERT INTO settings (setting_key, setting_value) 
           VALUES (?, ?) 
           ON DUPLICATE KEY UPDATE setting_value = ?, updated_at = NOW()`,
          [key, value, value]
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Pengaturan berhasil disimpan',
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal menyimpan pengaturan. Pastikan database terhubung.' },
      { status: 500 }
    );
  }
}
