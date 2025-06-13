import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Seat from './Seat';
import BookingInfo from './BookingInfo';

const TicketRoomPage = () => {
  const { maLichChieu } = useParams();
  const [danhSachGhe, setDanhSachGhe] = useState([]);
  const [thongTinPhim, setThongTinPhim] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    fetch(`https://domain.xyz/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
      .then(res => res.json())
      .then(data => {
        setDanhSachGhe(data.content.danhSachGhe);
        setThongTinPhim(data.content.thongTinPhim);
      });
  }, [maLichChieu]);

  const handleToggleSeat = (ghe) => {
    setSelectedSeats(prev =>
      prev.find(item => item.maGhe === ghe.maGhe)
        ? prev.filter(item => item.maGhe !== ghe.maGhe)
        : [...prev, ghe]
    );
  };

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      <div style={{ flex: 2 }}>
        <h2>{thongTinPhim.tenPhim}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(16, 1fr)', gap: '5px' }}>
          {danhSachGhe.map(ghe => (
            <Seat
              key={ghe.maGhe}
              ghe={ghe}
              isSelected={selectedSeats.some(item => item.maGhe === ghe.maGhe)}
              onToggle={() => handleToggleSeat(ghe)}
            />
          ))}
        </div>
      </div>
      <div style={{ flex: 1, marginLeft: '40px' }}>
        <BookingInfo
          thongTinPhim={thongTinPhim}
          selectedSeats={selectedSeats}
        />
      </div>
    </div>
  );
};

export default TicketRoomPage;
