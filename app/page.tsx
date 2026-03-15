"use client";

import { useState, useEffect } from 'react';


export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hideContact, setHideContact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHideContact(window.scrollY > 0);
    };
    handleScroll(); // Set initial state based on current scroll position
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const images = [
    "https://picsum.photos/1024/683?random=1",
    "https://picsum.photos/1024/683?random=11",
    "https://picsum.photos/1024/683?random=12"
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div
          className={`bg-[#003049] text-white font-bold transition-all duration-0 overflow-hidden ${hideContact ? 'max-h-0 py-0' : 'max-h-20 py-0'}`}
        >
          <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 h-12 md:h-14 flex items-center justify-center">
            <div className="flex w-full h-full items-center justify-center md:justify-between gap-2 flex-nowrap">
              <div className="flex items-center gap-2 text-[10px] xs:text-xs sm:text-sm md:text-base whitespace-nowrap">
                <a href="https://wa.me/081393571149" className="hover:text-blue-600 flex items-center mr-2 md:mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFD700" className="w-4 h-4 mr-1">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  081393571149
                </a>
                <a href="mailto:ganesha@sma1purbalingga.sch.id" className="hover:text-blue-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFD700" className="w-4 h-4 mr-1">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  ganesha@sma1purbalingga.sch.id
                </a>
              </div>
              <a href="https://elearning.sma1purbalingga.sch.id" className="bg-yellow-300 px-2 md:px-3 h-full flex items-center text-[#003049] font-semibold hover:bg-yellow-400 transition text-[10px] xs:text-xs sm:text-sm md:text-base whitespace-nowrap">Elearning</a>
            </div>
          </div>
        </div>
        <div
          className="fixed left-0 right-0 z-50 bg-white shadow-md"
          style={{ top: hideContact ? 0 : '3rem', transition: 'top 0ms cubic-bezier(0.4,0,0.2,1)' }}
        >
          <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
            <div className={`flex items-center justify-between w-full gap-2 md:gap-0 relative transition-all duration-300 ${hideContact ? 'py-1 md:py-2' : 'py-2 md:py-4'}`}> 
              {/* Logo */}
              <div className="flex items-center">
                <img
                  src="https://dokumentasi-kegiatan.sgp1.cdn.digitaloceanspaces.com/website-ganesha/logo-ganesha.png"
                  alt="SMA 1 Purbalingga"
                  className={`transition-all duration-300 ${hideContact ? 'h-10 sm:h-12 md:h-14' : 'h-14 sm:h-16 md:h-20'} mr-2 md:mr-4`}
                />
              </div>
              {/* Desktop Menu */}
              <nav className="hidden md:flex flex-1 justify-center space-x-4 md:space-x-8 font-bold text-base md:text-lg">
                <a href="#home" className="text-gray-700 hover:text-blue-600">Beranda</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600">Tentang</a>
                <a href="#news" className="text-gray-700 hover:text-blue-600">Berita</a>
                <a href="#facilities" className="text-gray-700 hover:text-blue-600">Fasilitas</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600">Kontak</a>
              </nav>
              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  aria-label="Toggle menu"
                >
                  {menuOpen ? (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  ) : (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
                  )}
                </button>
              </div>
                  {/* Mobile Menu Dropdown */}
                  {/* Mobile Menu Dropdown (below header, not covering logo) */}
                  <div className={`md:hidden absolute left-0 right-0 bg-white shadow-lg transition-transform duration-300 ${menuOpen ? 'translate-y-0' : '-translate-y-[-100%]'} ease-in-out`} style={{top: '100%', transitionProperty:'transform', zIndex: 40}}>
                    {menuOpen && (
                      <div className="flex flex-col items-center py-6 space-y-4 font-bold text-lg">
                        <a href="#home" className="text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Beranda</a>
                        <a href="#about" className="text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Tentang</a>
                        <a href="#news" className="text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Berita</a>
                        <a href="#facilities" className="text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Fasilitas</a>
                        <a href="#contact" className="text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Kontak</a>
                      </div>
                    )}
                  </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Slider */}
      <section id="home" className="relative mt-12 md:mt-20">
        <div className="relative h-[550px] md:h-[850px] overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{
                width: `${images.length * 100}vw`,
                transform: `translateX(-${currentIndex * 100}vw)`
              }}
            >
              {images.map((img, index) => (
                <div key={index} className="w-[100vw] h-full flex-none overflow-hidden">
                  <img
                    src={img}
                    alt={`Slider ${index + 1}`}
                    className="w-full h-full object-cover object-center zoom-effect"
                    style={{ display: 'block' }}
                  />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">Selamat Datang di SMA 1 Purbalingga</h2>
                <p className="text-xl md:text-2xl mb-8">Sekolah Unggul dengan Pendidikan Berkualitas</p>
                <a href="#about" className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300">Pelajari Lebih Lanjut</a>
              </div>
            </div>
          </div>
          {/* Navigation arrows */}
          <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75">
            ‹
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75">
            ›
          </button>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="relative z-20 -mt-8 px-4 sm:px-6 lg:px-8 pointer-events-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-4 grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1">
            {/* Kurikulum */}
            <div className="group bg-white border border-blue-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 mb-4 mx-auto">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20l9-5-9-5-9 5 9 5z"/><path d="M12 12V4l9 5-9 5-9-5 9-5z"/></svg>
              </div>
              <h4 className="text-xl font-bold text-center mb-2 group-hover:text-blue-600 transition">Kurikulum</h4>
              <div className="text-center text-3xl font-extrabold text-blue-600 mb-2">K13</div>
              <p className="text-gray-500 text-center">Pembelajaran berbasis kompetensi dengan inovasi dan teknologi.</p>
            </div>
            {/* Beasiswa */}
            <div className="group bg-white border border-blue-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-yellow-50 mb-4 mx-auto">
                <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 19l7-7-7-7"/><path d="M5 12h14"/></svg>
              </div>
              <h4 className="text-xl font-bold text-center mb-2 group-hover:text-yellow-600 transition">Beasiswa</h4>
              <div className="text-center text-3xl font-extrabold text-yellow-500 mb-2">30+</div>
              <p className="text-gray-500 text-center">Program beasiswa unggulan untuk prestasi akademik dan non-akademik.</p>
            </div>
            {/* Jumlah Guru */}
            <div className="group bg-white border border-blue-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-50 mb-4 mx-auto">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0 1 13 0"/></svg>
              </div>
              <h4 className="text-xl font-bold text-center mb-2 group-hover:text-green-600 transition">Jumlah Guru</h4>
              <div className="text-center text-3xl font-extrabold text-green-500 mb-2">120+</div>
              <p className="text-gray-500 text-center">Tenaga pendidik profesional dengan sertifikasi dan pengalaman.</p>
            </div>
            {/* Ekstrakurikuler */}
            <div className="group bg-white border border-blue-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-pink-50 mb-4 mx-auto">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
              </div>
              <h4 className="text-xl font-bold text-center mb-2 group-hover:text-pink-600 transition">Ekstrakurikuler</h4>
              <div className="text-center text-3xl font-extrabold text-pink-500 mb-2">40+</div>
              <p className="text-gray-500 text-center">Ragam kegiatan untuk mengasah bakat dan karakter siswa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Cards */}
      <section
        id="about"
        className="pt-70 pb-0 w-full relative mt-16"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Foto Kepala Sekolah (hidden on mobile) */}
            <div className="hidden md:flex flex-shrink-0 w-full md:w-1/3 justify-center items-end relative" style={{ minHeight: '350px' }}>
              <div style={{position:'relative', width:'100%', minHeight:'440px', paddingBottom:0, marginBottom:0}}>
                <img
                  src="https://dokumentasi-kegiatan.sgp1.cdn.digitaloceanspaces.com/website-ganesha/kepala-sekolah.png"
                  alt="Kepala Sekolah"
                  className="object-cover"
                  style={{
                    width: '500px',
                    height: '820px',
                    maxWidth: '90vw',
                    position: 'absolute',
                    left: '50%',
                    bottom: 0,
                    margin: 0,
                    padding: 0,
                    transform: 'translateX(-50%)',
                    zIndex: 2
                  }}
                />
              </div>
            </div>
            {/* Visi Sekolah */}
            <div className="w-full md:w-2/3 flex flex-col justify-between h-full min-h-[440px]">
              <h3 className="text-3xl font-bold mb-0 text-blue-900 text-center">Visi Sekolah</h3>
                <div className="flex flex-col justify-center items-center flex-1 pt-2 pb-70">
                <div className="text-lg text-gray-700 font-semibold text-center">Mewujudkan warga negara indonesia sejati, kuat bereligi, pembelajar, berkarakter, berbudaya, berwawasan lingkungan dan global</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Artikel dan Berita Terbaru</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://picsum.photos/470/313?random=5"
                alt="Berita 1"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-2">Posted on Oktober 24, 2025</p>
                <h4 className="text-lg font-semibold mb-2">Bangga, Alumni SMA 1 Purbalingga Lolos Seleksi</h4>
                <a href="#" className="text-blue-600 hover:underline">Baca Selengkapnya</a>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://picsum.photos/470/313?random=6"
                alt="Berita 2"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-2">Posted on Agustus 8, 2025</p>
                <h4 className="text-lg font-semibold mb-2">Prestasi Baru dari Siswa Kami</h4>
                <a href="#" className="text-blue-600 hover:underline">Baca Selengkapnya</a>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://picsum.photos/470/313?random=7"
                alt="Berita 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-2">Posted on Juli 21, 2025</p>
                <h4 className="text-lg font-semibold mb-2">Kegiatan Sekolah Terbaru</h4>
                <a href="#" className="text-blue-600 hover:underline">Baca Selengkapnya</a>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <a href="#" className="text-blue-600 hover:underline">Load More</a>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <img
                src="https://picsum.photos/300/200?random=8"
                alt="PS5, Billiard"
                className="w-full h-32 object-cover rounded mb-4"
              />
              <h4 className="text-xl font-semibold mb-2">PS5, BILLIARD, LAP. OLAHRAGA</h4>
              <a href="#" className="text-blue-600 hover:underline">Lihat Fasilitas</a>
            </div>
            <div>
              <img
                src="https://picsum.photos/300/200?random=9"
                alt="Laboratorium"
                className="w-full h-32 object-cover rounded mb-4"
              />
              <h4 className="text-xl font-semibold mb-2">LABORATORIUM BAHASA - KOMPUTER - SCIENCE</h4>
              <a href="#" className="text-blue-600 hover:underline">Lihat Fasilitas</a>
            </div>
            <div>
              <img
                src="https://picsum.photos/300/200?random=10"
                alt="Perpustakaan"
                className="w-full h-32 object-cover rounded mb-4"
              />
              <h4 className="text-xl font-semibold mb-2">PERPUSTAKAAN</h4>
              <a href="#" className="text-blue-600 hover:underline">Lihat Fasilitas</a>
            </div>
          </div>
          <div className="text-center mt-12">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-100 p-4 rounded">
                <h5 className="font-semibold">Ranking 1 SMA Terbaik se-Jateng LTMPT 2022</h5>
              </div>
              <div className="bg-green-100 p-4 rounded">
                <h5 className="font-semibold">Peringkat 3 Nasional SMA Terbaik LTMPT 2022</h5>
              </div>
              <div className="bg-purple-100 p-4 rounded">
                <h5 className="font-semibold">Rekor MURI SNBT 2021</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Hubungi Kami</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4">Informasi Kontak</h4>
              <p className="text-gray-600 mb-2"><strong>Alamat:</strong> Jl. Raya Purbalingga, Purbalingga, Jawa Tengah</p>
              <p className="text-gray-600 mb-2"><strong>Telepon:</strong> (0281) 123456</p>
              <p className="text-gray-600 mb-2"><strong>Email:</strong> info@sma1purbalingga.sch.id</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Jam Operasional</h4>
              <p className="text-gray-600 mb-2">Senin - Jumat: 07:00 - 15:00</p>
              <p className="text-gray-600">Sabtu: 08:00 - 12:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Link / Peta Situs</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Visi dan Misi</a></li>
                <li><a href="#" className="hover:underline">FAQ</a></li>
                <li><a href="#" className="hover:underline">Karir</a></li>
                <li><a href="#" className="hover:underline">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Informasi</h4>
              <p>Jl. Raya Purbalingga, Purbalingga, Jawa Tengah</p>
              <p>Tel: (0281) 123456</p>
              <p>Email: info@sma1purbalingga.sch.id</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Sosial Media</h4>
              <p>Ikuti kami di media sosial untuk update terbaru.</p>
            </div>
          </div>
          <div className="text-center mt-8 border-t border-gray-700 pt-4">
            <p>&copy; 2024 SMA 1 Purbalingga. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
