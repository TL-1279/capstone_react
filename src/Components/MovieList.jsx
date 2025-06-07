import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get('https://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachPhim')
      .then((res) => {
        setMovies(res.data.content); // res.data.content là mảng phim
      })
      .catch((err) => {
        console.error('Lỗi khi fetch danh sách phim:', err);
      });
  }, []);

  return (
    <div className="movie-list-container px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Danh sách Phim</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.maPhim}
            className="movie-card border rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={movie.hinhAnh}
              alt={movie.tenPhim}
              className="w-full h-56 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://via.placeholder.com/300x400?text=No+Image';
              }}
            />
            <div className="p-2">
              <h3 className="text-base font-medium mb-1 truncate">
                {movie.tenPhim}
              </h3>
              <button className="mt-2 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700">
                Đặt vé
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
