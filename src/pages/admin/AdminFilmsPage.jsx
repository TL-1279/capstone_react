import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminFilmsPage = () => {
  const [films, setFilms] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchFilms = async (tenPhim = '') => {
    setLoading(true);
    try {
      const res = await axios.get('https://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachPhim', {
        params: {
          maNhom: 'GP01',
          tenPhim: tenPhim,
        },
        headers: {
            
        },
      });
      setFilms(res.data.content);
    } catch (err) {
      console.error('Lỗi lấy danh sách phim:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFilms(search);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý phim</h1>

      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm phim..."
          className="p-2 border rounded w-full"
        />
        <button className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600">Tìm</button>
      </form>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table className="w-full border table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Mã phim</th>
              <th className="border px-2 py-1">Tên phim</th>
              <th className="border px-2 py-1">Hình ảnh</th>
              <th className="border px-2 py-1">Mô tả</th>
            </tr>
          </thead>
          <tbody>
            {films.map((film) => (
              <tr key={film.maPhim}>
                <td className="border px-2 py-1 text-center">{film.maPhim}</td>
                <td className="border px-2 py-1">{film.tenPhim}</td>
                <td className="border px-2 py-1">
                  <img src={film.hinhAnh} alt={film.tenPhim} className="w-16 h-24 object-cover" />
                </td>
                <td className="border px-2 py-1">{film.moTa?.slice(0, 100)}...</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminFilmsPage;
