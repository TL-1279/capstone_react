import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [form, setForm] = useState({
    taiKhoan: '',
    matKhau: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/DangNhap', form);
      console.log('Đăng nhập thành công:', res.data.content);
      localStorage.setItem('userLogin', JSON.stringify(res.data.content));
      setMessage('Đăng nhập thành công!');
      navigate('/'); // điều hướng về trang chủ hoặc trang dashboard
    } catch (err) {
      console.error('Lỗi đăng nhập:', err.response?.data?.content || err.message);
      setMessage(err.response?.data?.content || 'Sai tài khoản hoặc mật khẩu');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="taiKhoan"
          value={form.taiKhoan}
          onChange={handleChange}
          placeholder="Tài khoản"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="matKhau"
          value={form.matKhau}
          onChange={handleChange}
          placeholder="Mật khẩu"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
          Đăng nhập
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default LoginPage;
