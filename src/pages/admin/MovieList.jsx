import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  const fetchMovies = () => {
    axios
      .get('https://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01')
      .then((res) => setMovies(res.data.content))
      .catch((err) => console.error('Lỗi lấy danh sách phim:', err));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = (maPhim) => {
    if (!window.confirm('Bạn có chắc muốn xoá phim này?')) return;

    axios
      .delete(`https://movieapi.cyberlearn.vn/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => {
        alert('Xoá phim thành công!');
        fetchMovies();
      })
      .catch((err) => {
        console.error('Lỗi xoá phim:', err);
        alert('Xoá phim thất bại!');
      });
  };

  const filteredMovies = movies.filter((movie) =>
    movie.tenPhim.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>Quản lý Phim</h2>
      <div className="mb-3 d-flex justify-content-between">
        <Link to="/admin/films/addnew" className="btn btn-success">Thêm phim</Link>
        <input
          type="text"
          placeholder="Tìm kiếm phim..."
          className="form-control w-50"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Mã phim</th>
            <th>Hình ảnh</th>
            <th>Tên phim</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredMovies.map((movie) => (
            <tr key={movie.maPhim}>
              <td>{movie.maPhim}</td>
              <td>
                <img src={movie.hinhAnh} alt={movie.tenPhim} style={{ width: 60 }} />
              </td>
              <td>{movie.tenPhim}</td>
              <td>{movie.moTa.length > 100 ? movie.moTa.slice(0, 100) + '...' : movie.moTa}</td>
              <td>
                <Link to={`/admin/films/edit/${movie.maPhim}`} className="btn btn-sm btn-outline-primary me-2">
                  ✏️
                </Link>
                <button onClick={() => handleDelete(movie.maPhim)} className="btn btn-sm btn-outline-danger me-2">
                  🗑️
                </button>
                <Link to={`/admin/films/showtimes/${movie.maPhim}`} className="btn btn-sm btn-outline-success">
                  📅
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieList;
