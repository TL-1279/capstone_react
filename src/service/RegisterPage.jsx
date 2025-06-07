import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [form, setForm] = useState({
    taiKhoan: '',
    matKhau: '',
    email: '',
    soDt: '',
    maNhom: 'GP01',
    hoTen: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/DangKy', form);
      setMessage('Đăng ký thành công!');
      console.log('Đăng ký thành công:', res.data);
    } catch (err) {
      console.error('Lỗi đăng ký:', err.response?.data?.content || err.message);
      setMessage(err.response?.data?.content || 'Đăng ký thất bại');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Đăng ký tài khoản</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="taiKhoan" value={form.taiKhoan} onChange={handleChange} placeholder="Tài khoản" className="w-full p-2 border rounded" required />
        <input type="password" name="matKhau" value={form.matKhau} onChange={handleChange} placeholder="Mật khẩu" className="w-full p-2 border rounded" required />
        <input type="text" name="hoTen" value={form.hoTen} onChange={handleChange} placeholder="Họ tên" className="w-full p-2 border rounded" required />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" required />
        <input type="text" name="soDt" value={form.soDt} onChange={handleChange} placeholder="Số điện thoại" className="w-full p-2 border rounded" required />

        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded">
          Đăng ký
        </button>
      </form>

      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default RegisterPage;
