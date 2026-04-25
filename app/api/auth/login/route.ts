import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { comparePassword, generateToken, hashPassword } from '@/lib/auth';
import { RowDataPacket } from 'mysql2';

interface AdminRow extends RowDataPacket {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  full_name: string;
  role: string;
  is_active: number;
}

// Get admin credentials from environment variables
const getAdminCredentials = () => ({
  id: 1,
  username: process.env.ADMIN_USERNAME || 'admin',
  email: process.env.ADMIN_EMAIL || 'admin@sma1purbalingga.sch.id',
  password: process.env.ADMIN_PASSWORD || 'admin123',
  full_name: process.env.ADMIN_FULL_NAME || 'Administrator',
  role: 'superadmin',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username dan password harus diisi' },
        { status: 400 }
      );
    }

    let admin: { id: number; username: string; email: string; full_name: string; role: string } | null = null;
    let isValidPassword = false;

    // Try database connection first
    try {
      const admins = await query<AdminRow[]>(
        `SELECT * FROM admins WHERE (username = ? OR email = ?) AND is_active = 1`,
        [username, username]
      );

      if (admins && admins.length > 0) {
        const dbAdmin = admins[0];
        isValidPassword = await comparePassword(password, dbAdmin.password_hash);
        if (isValidPassword) {
          admin = {
            id: dbAdmin.id,
            username: dbAdmin.username,
            email: dbAdmin.email,
            full_name: dbAdmin.full_name,
            role: dbAdmin.role,
          };
          // Update last login
          await query(`UPDATE admins SET last_login = NOW() WHERE id = ?`, [dbAdmin.id]);
        }
      }
    } catch (dbError) {
      // Database not available, use admin from environment variables
      const envAdmin = getAdminCredentials();
      
      if ((username === envAdmin.username || username === envAdmin.email) && password === envAdmin.password) {
        isValidPassword = true;
        admin = {
          id: envAdmin.id,
          username: envAdmin.username,
          email: envAdmin.email,
          full_name: envAdmin.full_name,
          role: envAdmin.role,
        };
      }
    }

    if (!admin || !isValidPassword) {
      return NextResponse.json(
        { success: false, error: 'Username atau password salah' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    });

    // Set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      data: {
        token,
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          full_name: admin.full_name,
          role: admin.role,
        },
      },
      message: 'Login berhasil',
    });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { success: false, error: 'Login gagal. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}
