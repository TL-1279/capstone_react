import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditMovieForm = () => {
  const { idFilm } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [hinhAnh, setHinhAnh] = useState(null);

  useEffect(() => {
    axios
      .get(`https://movieapi.cyberlearn.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${idFilm}`)
      .then((res) => setMovie(res.data.content))
      .catch((err) => console.error('Lỗi lấy thông tin phim:', err));
  }, [idFilm]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMovie({
      ...movie,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setHinhAnh(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in movie) {
      formData.append(key, movie[key]);
    }
    if (hinhAnh) {
      formData.append('File', hinhAnh);
    }

    axios
      .post('https://movieapi.cyberlearn.vn/api/QuanLyPhim/CapNhatPhimUpload', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => {
        alert('Cập nhật phim thành công!');
        navigate('/admin/films');
      })
      .catch((err) => {
        console.error('Lỗi cập nhật phim:', err);
        alert('Cập nhật thất bại!');
      });
  };

  if (!movie) return <div>Đang tải thông tin phim...</div>;

  return (
    <div className="container mt-4">
      <h2>Chỉnh sửa phim: {movie.tenPhim}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Tên phim</label>
          <input className="form-control" name="tenPhim" value={movie.tenPhim} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Trailer</label>
          <input className="form-control" name="trailer" value={movie.trailer} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Mô tả</label>
          <textarea className="form-control" name="moTa" value={movie.moTa} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Ngày khởi chiếu</label>
          <input type="date" className="form-control" name="ngayKhoiChieu" value={movie.ngayKhoiChieu} onChange={handleChange} />
        </div>
        <div className="form-check form-switch mb-3">
          <input className="form-check-input" type="checkbox" name="dangChieu" checked={movie.dangChieu} onChange={handleChange} />
          <label className="form-check-label">Đang chiếu</label>
        </div>
        <div className="form-check form-switch mb-3">
          <input className="form-check-input" type="checkbox" name="sapChieu" checked={movie.sapChieu} onChange={handleChange} />
          <label className="form-check-label">Sắp chiếu</label>
        </div>
        <div className="form-check form-switch mb-3">
          <input className="form-check-input" type="checkbox" name="hot" checked={movie.hot} onChange={handleChange} />
          <label className="form-check-label">Hot</label>
        </div>
        <div className="mb-3">
          <label>Đánh giá</label>
          <input type="number" className="form-control" name="danhGia" value={movie.danhGia} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Hình ảnh</label>
          <input type="file" className="form-control" onChange={handleImageChange} />
          {movie.hinhAnh && <img src={movie.hinhAnh} alt="poster" className="mt-2" style={{ width: 150 }} />}
        </div>
        <button type="submit" className="btn btn-primary">Cập nhật</button>
      </form>
    </div>
  );
};

export default EditMovieForm;
