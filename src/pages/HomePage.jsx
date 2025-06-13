import React from 'react';
import BannerCarousel from '../Components/BannerCarousel';
import MovieList from './admin/MovieList';
import TheaterSystemTabs from '../Components/TheaterSystemTabs';

const HomePage = () => {
  return (
    <div className="homepage-wrapper">
      {/* Phần banner carousel */}
      <BannerCarousel />

      {/* Phần danh sách phim */}
      <MovieList />

      {/* Phần hệ thống rạp + lịch chiếu */}
      <TheaterSystemTabs />
    </div>
  );
};

export default HomePage;
