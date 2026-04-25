-- Add missing tables for the website
-- Run this script on your DigitalOcean database

-- Sliders table for hero slider
CREATE TABLE IF NOT EXISTS sliders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  image_url VARCHAR(500),
  link_url VARCHAR(500),
  link_text VARCHAR(100),
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Settings table for site configuration
CREATE TABLE IF NOT EXISTS settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Contact messages table (rename from contacts if needed)
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status ENUM('unread', 'read', 'replied') DEFAULT 'unread',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT IGNORE INTO settings (setting_key, setting_value) VALUES
('site_name', 'SMA Negeri 1 Purbalingga'),
('site_description', 'Sekolah Menengah Atas Negeri 1 Purbalingga - Mencetak generasi unggul, berkarakter, dan siap bersaing di era global'),
('contact_email', 'info@sma1purbalingga.sch.id'),
('contact_phone', '(0281) 891202'),
('address', 'Jl. Letjend. S. Parman No. 150, Purbalingga, Jawa Tengah 53312'),
('operational_hours', 'Senin - Jumat: 07.00 - 15.00 WIB'),
('facebook_url', 'https://facebook.com/sman1purbalingga'),
('instagram_url', 'https://instagram.com/sman1purbalingga'),
('youtube_url', 'https://youtube.com/@sman1purbalingga');

-- Insert default sliders
INSERT IGNORE INTO sliders (title, subtitle, image_url, link_url, link_text, sort_order, is_active) VALUES
('Selamat Datang di SMA Negeri 1 Purbalingga', 'Mencetak generasi unggul, berkarakter, dan siap bersaing di era global', 'https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=1080&fit=crop', '/profil/sejarah', 'Pelajari Lebih Lanjut', 1, TRUE),
('Prestasi Akademik Unggulan', 'Raih prestasi gemilang di berbagai kompetisi sains dan olimpiade tingkat nasional', 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&h=1080&fit=crop', '/berita', 'Lihat Prestasi', 2, TRUE),
('Fasilitas Modern & Lengkap', 'Didukung sarana prasarana terkini untuk menunjang proses belajar mengajar', 'https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=1080&fit=crop', '/profil/visi-misi', 'Fasilitas Kami', 3, TRUE);
