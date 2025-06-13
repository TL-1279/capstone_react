import React from 'react';

const BookingInfo = ({ thongTinPhim, selectedSeats }) => {
  const total = selectedSeats.reduce((sum, seat) => sum + seat.giaVe, 0);

  return (
    <div>
      <h3>Thông tin đặt vé</h3>
      <p><strong>Phim:</strong> {thongTinPhim.tenPhim}</p>
      <p><strong>Địa điểm:</strong> {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}</p>
      <p><strong>Ngày chiếu:</strong> {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</p>
      <hr />
      <ul>
        {selectedSeats.map(seat => (
          <li key={seat.maGhe}>Ghế {seat.tenGhe} - {seat.giaVe.toLocaleString()}đ</li>
        ))}
      </ul>
      <hr />
      <p><strong>Tổng tiền:</strong> {total.toLocaleString()}đ</p>
      <button onClick={() => alert("Đặt vé thành công!")}>Đặt vé</button>
    </div>
  );
};

export default BookingInfo;
