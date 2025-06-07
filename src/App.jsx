import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetail from "./pages/MovieDetail";
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminFilmsPage from './pages/AdminFilmsPage';
import AddMovieForm from "./service/addMovie";





function App(){
  return (
    <BrowserRouter>
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/chitietphim/:maPhim" element={<MovieDetail />} />
  <Route path="/phongve/:maLichChieu" element={<div>Trang phòng vé đang phát triển...</div>} />  
  <Route path="/dangky" element={<RegisterPage />} />
  <Route path="/register" element={<RegisterPage />} />
   <Route path="/dangnhap" element={<LoginPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/admin/films" element={<AdminFilmsPage />} />
    <Route path="/admin/films/addNew" element={<AddMovieForm />} />


</Routes>

    </BrowserRouter>
  );
}

export default App;
