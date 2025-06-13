import React from "react";

const ShowtimePanel = ({ heThongRapChieu }) => {
  if (!heThongRapChieu || heThongRapChieu.length === 0) {
    return <div className="p-4">Chưa có lịch chiếu.</div>;
  }

  return (
    <div className="showtime-panel-container max-h-[500px] p-4">
      {heThongRapChieu.map((heThong) => (
        <div key={heThong.maHeThongRap} className="mb-6">
          <h4 className="text-xl font-semibold mb-2">
            {heThong.tenHeThongRap}
          </h4>
          {heThong.cumRapChieu.map((cumRap) => (
            <div
              key={cumRap.maCumRap}
              className="mb-4 border-b pb-3"
            >
              <div className="flex items-center mb-2">
                <img
                  src={cumRap.hinhAnh}
                  alt={cumRap.tenCumRap}
                  className="w-10 h-10 object-cover rounded mr-2"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://via.placeholder.com/40?text=No+Img';
                  }}
                />
                <span className="font-medium">{cumRap.tenCumRap}</span>
              </div>
              <div className="flex flex-wrap gap-2 ml-12">
                {cumRap.danhSachPhim.map((phim) =>
                  phim.lstLichChieuTheoPhim.map((lichChieu) => (
                    <button
                      key={lichChieu.maLichChieu}
                      className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                    >
                      {new Date(lichChieu.ngayChieuGioChieu).getHours().toString().padStart(2, '0')}:
                      {new Date(lichChieu.ngayChieuGioChieu).getMinutes().toString().padStart(2, '0')}
                    </button>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ShowtimePanel;