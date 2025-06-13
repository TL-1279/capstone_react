// src/pages/MovieDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Chi tiết phim</h1>
      <p>Mã phim: {id}</p>
      {/* Bạn có thể gọi API để lấy thông tin chi tiết phim ở đây */}
    </div>
  );
};

export default MovieDetail;
