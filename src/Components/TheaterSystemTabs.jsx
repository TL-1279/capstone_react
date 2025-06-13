import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShowtimePanel from './ShowtimePanel';

const TheaterSystemTabs = () => {
  const [systems, setSystems] = useState([]); // Danh sách hệ thống rạp
  const [selectedSystem, setSelectedSystem] = useState(null); // mã hệ thống hiện tại đang chọn
  const [showtimes, setShowtimes] = useState([]); // Dữ liệu showtime cho hệ thống đang chọn

  useEffect(() => {
    // Lấy danh sách hệ thống rạp
    axios
      .get('https://movieapi.cyberlearn.vn/api/QuanLyRap/LayThongTinHeThongRap')
      .then((res) => {
        setSystems(res.data.content); // mảng hệ thống rạp
        if (res.data.content.length > 0) {
          // Mặc định chọn hệ thống đầu tiên
          const firstSystem = res.data.content[0];
          setSelectedSystem(firstSystem.maHeThongRap);
        }
      })
      .catch((err) => {
        console.error('Lỗi khi fetch hệ thống rạp:', err);
      });
  }, []);

  // Khi selectedSystem thay đổi, fetch showtime cho hệ thống đó
  useEffect(() => {
    if (!selectedSystem) return;

    axios
      .get(
        `https://movieapi.cyberlearn.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${selectedSystem}&maNhom=GP01`
      )
      .then((res) => {
        setShowtimes(res.data.content); // mảng heThongRapChieu cho system được chọn
      })
      .catch((err) => {
        console.error('Lỗi khi fetch lịch chiếu hệ thống:', err);
        setShowtimes([]);
      });
  }, [selectedSystem]);

  return (
    <div className="theater-system-tabs flex px-4 py-8 gap-6">
      {/* Cột trái: danh sách logo hệ thống rạp */}
      <div className="w-1/6 max-h-[600px]">
        {systems.map((sys) => (
          <div
            key={sys.maHeThongRap}
            className={`mb-4 cursor-pointer p-2 border rounded-lg transition-all ${
              selectedSystem === sys.maHeThongRap
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:shadow-md'
            }`}
            onClick={() => setSelectedSystem(sys.maHeThongRap)}
          >
            <img
              src={sys.logo}
              alt={sys.tenHeThongRap}
              className="w-full object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://via.placeholder.com/100?text=No+Logo';
              }}
            />
          </div>
        ))}
      </div>

      {/* Cột phải: hiển thị showtimes của hệ thống được chọn */}
      <div className="w-5/6 border rounded-lg shadow-inner">
        <ShowtimePanel heThongRapChieu={showtimes} />
      </div>
    </div>
  );
};

export default TheaterSystemTabs;
