-- Seed data for SMA Negeri 1 Purbalingga
-- Run after 001-create-schema.sql

-- Insert default admin (password: admin123 - change in production!)
-- Password hash for 'admin123' using bcrypt
INSERT INTO admins (username, password, email, name, role) VALUES
  ('admin', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4GjlOFTqJP5.aJEu', 'admin@sman1purbalingga.sch.id', 'Administrator', 'superadmin')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Insert sample news
INSERT INTO news (title, slug, excerpt, content, is_published, published_at, author_id) VALUES
  (
    'Selamat Datang di Website Resmi SMAN 1 Purbalingga',
    'selamat-datang-website-resmi',
    'Website resmi SMA Negeri 1 Purbalingga telah hadir dengan tampilan baru yang lebih modern dan informatif.',
    '<p>Dengan bangga kami mengumumkan peluncuran website resmi SMA Negeri 1 Purbalingga dengan tampilan baru yang lebih modern, responsif, dan informatif.</p><p>Website ini dirancang untuk memberikan informasi terkini tentang kegiatan sekolah, prestasi siswa, agenda akademik, dan berbagai informasi penting lainnya bagi siswa, orang tua, dan masyarakat umum.</p><p>Kami berharap website ini dapat menjadi jembatan komunikasi yang efektif antara sekolah dengan seluruh stakeholder pendidikan.</p>',
    TRUE,
    NOW(),
    1
  ),
  (
    'Prestasi Siswa dalam Olimpiade Sains Nasional',
    'prestasi-osn-2024',
    'Siswa SMAN 1 Purbalingga berhasil meraih medali emas dalam Olimpiade Sains Nasional bidang Matematika.',
    '<p>Prestasi membanggakan kembali diraih oleh siswa SMA Negeri 1 Purbalingga. Dalam ajang Olimpiade Sains Nasional (OSN) tahun ini, perwakilan sekolah kami berhasil meraih medali emas di bidang Matematika.</p><p>Pencapaian ini merupakan hasil dari kerja keras siswa dan bimbingan intensif dari para guru pembina olimpiade. Selamat kepada seluruh tim yang telah berjuang keras!</p>',
    TRUE,
    DATE_SUB(NOW(), INTERVAL 3 DAY),
    1
  ),
  (
    'Pembukaan Pendaftaran Peserta Didik Baru',
    'ppdb-2024-2025',
    'Pendaftaran Peserta Didik Baru (PPDB) tahun ajaran 2024/2025 telah dibuka. Simak informasi lengkapnya di sini.',
    '<p>SMA Negeri 1 Purbalingga membuka pendaftaran Peserta Didik Baru (PPDB) untuk tahun ajaran 2024/2025. Pendaftaran dapat dilakukan secara online melalui sistem PPDB provinsi.</p><h3>Persyaratan:</h3><ul><li>Fotokopi ijazah SMP/MTs atau surat keterangan lulus</li><li>Fotokopi SKHUN</li><li>Fotokopi akta kelahiran</li><li>Fotokopi Kartu Keluarga</li><li>Pas foto 3x4 sebanyak 4 lembar</li></ul><p>Untuk informasi lebih lanjut, silakan hubungi panitia PPDB di nomor telepon sekolah.</p>',
    TRUE,
    DATE_SUB(NOW(), INTERVAL 7 DAY),
    1
  )
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- Insert sample events
INSERT INTO events (title, slug, description, content, location, start_date, end_date, is_published) VALUES
  (
    'Upacara Hari Pendidikan Nasional',
    'upacara-hardiknas-2024',
    'Upacara peringatan Hari Pendidikan Nasional yang diikuti oleh seluruh civitas akademika SMAN 1 Purbalingga.',
    '<p>Seluruh civitas akademika SMA Negeri 1 Purbalingga akan mengikuti upacara peringatan Hari Pendidikan Nasional. Upacara akan diselenggarakan dengan khidmat untuk mengenang jasa Ki Hajar Dewantara sebagai Bapak Pendidikan Indonesia.</p>',
    'Lapangan Upacara SMAN 1 Purbalingga',
    DATE_ADD(CURDATE(), INTERVAL 7 DAY),
    DATE_ADD(CURDATE(), INTERVAL 7 DAY),
    TRUE
  ),
  (
    'Penilaian Tengah Semester Genap',
    'pts-genap-2024',
    'Pelaksanaan Penilaian Tengah Semester (PTS) Genap untuk seluruh siswa kelas X, XI, dan XII.',
    '<p>Penilaian Tengah Semester (PTS) Genap akan dilaksanakan selama satu minggu. Siswa diharapkan mempersiapkan diri dengan baik dan mematuhi tata tertib ujian.</p>',
    'Ruang Kelas SMAN 1 Purbalingga',
    DATE_ADD(CURDATE(), INTERVAL 14 DAY),
    DATE_ADD(CURDATE(), INTERVAL 21 DAY),
    TRUE
  ),
  (
    'Pentas Seni dan Kreativitas Siswa',
    'pensi-2024',
    'Acara pentas seni tahunan yang menampilkan berbagai bakat dan kreativitas siswa SMAN 1 Purbalingga.',
    '<p>Pentas Seni (Pensi) tahunan SMAN 1 Purbalingga akan menampilkan berbagai pertunjukan seni dari siswa-siswi berbakat. Acara ini terbuka untuk umum dan gratis.</p>',
    'Aula SMAN 1 Purbalingga',
    DATE_ADD(CURDATE(), INTERVAL 30 DAY),
    DATE_ADD(CURDATE(), INTERVAL 30 DAY),
    TRUE
  )
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- Insert sample staff
INSERT INTO staff (name, position, department, bio, order_index, is_active) VALUES
  ('Drs. H. Slamet Riyadi, M.Pd.', 'Kepala Sekolah', 'Pimpinan', 'Kepala Sekolah SMAN 1 Purbalingga sejak tahun 2020. Berpengalaman dalam dunia pendidikan selama lebih dari 25 tahun.', 1, TRUE),
  ('Dra. Hj. Sri Wahyuni, M.M.', 'Wakil Kepala Bidang Kurikulum', 'Pimpinan', 'Wakil Kepala Sekolah bidang kurikulum yang bertanggung jawab atas perencanaan dan pelaksanaan kegiatan pembelajaran.', 2, TRUE),
  ('Drs. Bambang Supriyanto', 'Wakil Kepala Bidang Kesiswaan', 'Pimpinan', 'Wakil Kepala Sekolah bidang kesiswaan yang membina kegiatan ekstrakurikuler dan pembinaan siswa.', 3, TRUE),
  ('Hj. Endang Sulistyowati, S.Pd., M.Pd.', 'Wakil Kepala Bidang Sarana Prasarana', 'Pimpinan', 'Wakil Kepala Sekolah bidang sarana prasarana yang mengelola fasilitas dan infrastruktur sekolah.', 4, TRUE),
  ('Drs. Ahmad Fauzi, M.Pd.', 'Guru Matematika', 'Guru', 'Guru senior bidang Matematika dengan pengalaman mengajar lebih dari 20 tahun.', 10, TRUE),
  ('Siti Nurhasanah, S.Pd., M.Pd.', 'Guru Bahasa Indonesia', 'Guru', 'Guru Bahasa Indonesia yang aktif dalam pembinaan literasi dan karya tulis ilmiah.', 11, TRUE),
  ('Dr. Budi Santoso, M.Si.', 'Guru Fisika', 'Guru', 'Guru Fisika yang berpengalaman membina siswa dalam olimpiade sains tingkat nasional.', 12, TRUE),
  ('Rina Kusumawardani, S.Pd., M.Pd.', 'Guru Bahasa Inggris', 'Guru', 'Guru Bahasa Inggris yang aktif dalam program pertukaran pelajar internasional.', 13, TRUE)
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Insert sample facilities
INSERT INTO facilities (name, description, order_index, is_active) VALUES
  ('Laboratorium IPA', 'Laboratorium lengkap untuk praktikum Fisika, Kimia, dan Biologi dengan peralatan modern.', 1, TRUE),
  ('Laboratorium Komputer', 'Dua ruang laboratorium komputer dengan 80 unit komputer terbaru dan koneksi internet fiber optic.', 2, TRUE),
  ('Perpustakaan', 'Perpustakaan dengan koleksi lebih dari 15.000 judul buku dan fasilitas e-library.', 3, TRUE),
  ('Ruang Multimedia', 'Ruang multimedia dengan peralatan audio visual untuk presentasi dan pembelajaran interaktif.', 4, TRUE),
  ('Lapangan Olahraga', 'Lapangan basket, voli, dan sepak bola dengan tribun penonton.', 5, TRUE),
  ('Aula Serbaguna', 'Aula dengan kapasitas 500 orang untuk kegiatan sekolah dan acara besar.', 6, TRUE),
  ('Mushola', 'Mushola dengan kapasitas 300 jamaah dilengkapi tempat wudhu yang nyaman.', 7, TRUE),
  ('Kantin Sehat', 'Kantin dengan menu makanan sehat dan higienis untuk siswa dan guru.', 8, TRUE)
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Insert sample gallery categories
INSERT INTO gallery (title, description, category, order_index, is_published) VALUES
  ('Gedung Utama SMAN 1 Purbalingga', 'Tampak depan gedung utama sekolah yang megah dan modern.', 'fasilitas', 1, TRUE),
  ('Upacara Bendera', 'Kegiatan upacara bendera setiap Senin yang diikuti seluruh warga sekolah.', 'kegiatan', 2, TRUE),
  ('Juara OSN Matematika', 'Siswa peraih medali emas Olimpiade Sains Nasional bidang Matematika.', 'prestasi', 3, TRUE),
  ('Laboratorium Komputer', 'Fasilitas laboratorium komputer dengan 40 unit komputer terbaru.', 'fasilitas', 4, TRUE),
  ('Pentas Seni Tahunan', 'Penampilan siswa dalam acara pentas seni tahunan sekolah.', 'kegiatan', 5, TRUE),
  ('Wisuda Angkatan 2024', 'Momen bahagia wisuda siswa kelas XII angkatan 2024.', 'kegiatan', 6, TRUE)
ON DUPLICATE KEY UPDATE title = VALUES(title);
