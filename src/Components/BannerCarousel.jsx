import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // Lấy danh sách banner từ API CyberSoft
    axios
      .get('https://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachBanner')
      .then((res) => {
        setBanners(res.data.content); 
      })
      .catch((err) => {
        console.error('Lỗi khi fetch banner:', err);
      });
  }, []);

  // Cấu hình cho react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="banner-carousel-container">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.maBanner} className="banner-slide">
            <img
              src={banner.hinhAnh}
              alt={banner.maBanner}
              style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerCarousel;
