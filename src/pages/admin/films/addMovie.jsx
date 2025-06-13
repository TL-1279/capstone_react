import React, { useState } from 'react';
import axios from 'axios';

const AddMovieForm = () => {
  const [form, setForm] = useState({
    tenPhim: '',
    trailer: '',
    moTa: '',
    maNhom: 'GP01',
    ngayKhoiChieu: '',
    sapChieu: true,
    dangChieu: true,
    hot: true,
    danhGia: 10,
  });

  const [hinhAnh, setHinhAnh] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setHinhAnh(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }
    formData.append('File', hinhAnh);

    try {
      const res = await axios.post('https://domain.xyz/api/quanlyphim/themphimuploadhinh', formData, {
        headers: {
          'TokenCybersoft': 'YOUR_TOKEN_CYBERSOFT_HERE',
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Thêm phim thành công!');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert('Thêm phim thất bại!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow w-full max-w-xl mx-auto">
      <h2 className="text-xl mb-4 font-bold">Thêm Phim Mới</h2>
      <input name="tenPhim" placeholder="Tên phim" onChange={handleChange} required className="form-control mb-2" />
      <input name="trailer" placeholder="Trailer URL" onChange={handleChange} required className="form-control mb-2" />
      <textarea name="moTa" placeholder="Mô tả" onChange={handleChange} required className="form-control mb-2" />
      <input name="ngayKhoiChieu" type="date" onChange={handleChange} required className="form-control mb-2" />
      <input name="danhGia" type="number" placeholder="Đánh giá" onChange={handleChange} className="form-control mb-2" />
      <div className="form-check mb-2">
        <input type="checkbox" name="sapChieu" checked={form.sapChieu} onChange={handleChange} />
        <label className="form-check-label">Sắp chiếu</label>
      </div>
      <div className="form-check mb-2">
        <input type="checkbox" name="dangChieu" checked={form.dangChieu} onChange={handleChange} />
        <label className="form-check-label">Đang chiếu</label>
      </div>
      <div className="form-check mb-2">
        <input type="checkbox" name="hot" checked={form.hot} onChange={handleChange} />
        <label className="form-check-label">Phim hot</label>
      </div>
      <input type="file" accept="image/*" onChange={handleFileChange} required className="form-control mb-3" />
      <button type="submit" className="btn btn-primary">Thêm Phim</button>
    </form>
  );
};

export default AddMovieForm;
