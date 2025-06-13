import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetail from "./pages/MovieDetail";
import RegisterPage from './service/RegisterPage';
import LoginPage from './service/LoginPage';
import AdminFilmsPage from './pages/admin/films/AdminFilmsPage';
import AddMovieForm from "./pages/admin/films/addMovie";
import TicketRoomPage from './pages/TicketRoomPage';
import MovieList from "./pages/admin/MovieList";
import EditMovieForm from './pages/admin/films/EditMovieForm';
import ShowtimePage from "./pages/admin/films/ShowtimePage";

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
  <Route path="/admin" element={<MovieList />} />
  <Route path="/admin/films/addNew" element={<AddMovieForm />} />
  <Route path="/chitietphongve/:maLichChieu" element={<TicketRoomPage />} />
  <Route path="/admin/films/edit/:idFilm" element={<EditMovieForm />} />
  <Route path="/admin/films/showtime/:idFilm" element={<ShowtimePage />} />

</Routes>

    </BrowserRouter>
  );
}

export default App;
