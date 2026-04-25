-- SMA Negeri 1 Purbalingga Database Schema
-- Run this script to create all necessary tables

-- Admin users table
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  role ENUM('superadmin', 'admin', 'editor') DEFAULT 'editor',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_username (username),
  INDEX idx_email (email)
);

-- News/Berita table
CREATE TABLE IF NOT EXISTS news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  image_url VARCHAR(500),
  author_id INT,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES admins(id) ON DELETE SET NULL,
  INDEX idx_slug (slug),
  INDEX idx_published (is_published, published_at),
  FULLTEXT INDEX idx_search (title, excerpt, content)
);

-- Events/Agenda table
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  content LONGTEXT,
  image_url VARCHAR(500),
  location VARCHAR(255) NOT NULL,
  start_date DATETIME NOT NULL,
  end_date DATETIME,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_dates (start_date, end_date),
  INDEX idx_published (is_published)
);

-- Staff/Guru & Tenaga Kependidikan table
CREATE TABLE IF NOT EXISTS staff (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  position VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  image_url VARCHAR(500),
  email VARCHAR(100),
  phone VARCHAR(20),
  bio TEXT,
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_department (department),
  INDEX idx_order (order_index),
  INDEX idx_active (is_active)
);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500) NOT NULL,
  category VARCHAR(50) NOT NULL,
  order_index INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_published (is_published)
);

-- Facilities table
CREATE TABLE IF NOT EXISTS facilities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(500),
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_order (order_index),
  INDEX idx_active (is_active)
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_read (is_read),
  INDEX idx_created (created_at)
);

-- School info/settings table
CREATE TABLE IF NOT EXISTS school_info (
  id INT AUTO_INCREMENT PRIMARY KEY,
  info_key VARCHAR(50) NOT NULL UNIQUE,
  info_value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_key (info_key)
);

-- Insert default school info
INSERT INTO school_info (info_key, info_value) VALUES
  ('school_name', 'SMA Negeri 1 Purbalingga'),
  ('address', 'Jl. Letnan Jenderal S. Parman No. 1, Purbalingga, Jawa Tengah 53311'),
  ('phone', '(0281) 891234'),
  ('email', 'info@sman1purbalingga.sch.id'),
  ('vision', 'Terwujudnya peserta didik yang beriman, bertaqwa, berakhlak mulia, berprestasi, dan berwawasan lingkungan.'),
  ('mission', 'Menyelenggarakan pendidikan yang berkualitas, mengembangkan potensi peserta didik secara optimal, dan menciptakan lingkungan belajar yang kondusif.'),
  ('accreditation', 'A'),
  ('established_year', '1963'),
  ('principal_name', 'Drs. H. Slamet Riyadi, M.Pd.'),
  ('facebook_url', 'https://facebook.com/sman1purbalingga'),
  ('instagram_url', 'https://instagram.com/sman1purbalingga'),
  ('youtube_url', 'https://youtube.com/@sman1purbalingga'),
  ('maps_embed_url', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.2!2d109.3!3d-7.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSMA%20Negeri%201%20Purbalingga!5e0!3m2!1sid!2sid!4v1234567890')
ON DUPLICATE KEY UPDATE info_value = VALUES(info_value);
