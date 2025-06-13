import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ShowtimePage = () => {
  const { idFilm } = useParams();
  const [film, setFilm] = useState({});
  const [heThongRap, setHeThongRap] = useState([]);
  const [cumRap, setCumRap] = useState([]);
  const [form, setForm] = useState({
    maPhim: idFilm,
    ngayChieuGioChieu: "",
    maRap: "",
    giaVe: "",
  });

  // Load film info (you may load from location.state or API)
  useEffect(() => {
    // Dummy example (replace with real call if needed)
    setFilm({
      tenPhim: "Avenger 123",
      hinhAnh: "https://i.imgur.com/zl0RH6F.png", // Replace with real API img
    });
  }, [idFilm]);

  // Load hệ thống rạp
  useEffect(() => {
    axios
      .get("https://domain.xyz/api/QuanLyRap/LayThongTinHeThongRap")
      .then((res) => setHeThongRap(res.data))
      .catch(console.error);
  }, []);

  const handleHeThongRapChange = (e) => {
    const maHeThongRap = e.target.value;
    axios
      .get(
        `https://domain.xyz/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
      )
      .then((res) => setCumRap(res.data))
      .catch(console.error);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://domain.xyz/api/QuanLyDatVe/TaoLichChieu", form, {
        headers: {
          Authorization: "Bearer your_access_token",
        },
      })
      .then(() => alert("Tạo lịch chiếu thành công!"))
      .catch((err) => alert("Lỗi: " + err.response?.data?.content || err.message));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Tạo lịch chiếu - {film.tenPhim}</h2>
      <img src={film.hinhAnh} alt="poster" className="w-40 mb-4 rounded shadow" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Hệ thống rạp:</label>
          <select className="w-full border p-2 rounded" onChange={handleHeThongRapChange}>
            <option value="">Chọn hệ thống rạp</option>
            {heThongRap.map((item) => (
              <option key={item.maHeThongRap} value={item.maHeThongRap}>
                {item.tenHeThongRap}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Cụm rạp:</label>
          <select
            className="w-full border p-2 rounded"
            name="maRap"
            onChange={handleChange}
          >
            <option value="">Chọn cụm rạp</option>
            {cumRap.flatMap((cr) =>
              cr.danhSachRap?.map((rap) => (
                <option key={rap.maRap} value={rap.maRap}>
                  {rap.tenRap}
                </option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Ngày chiếu giờ chiếu:</label>
          <input
            type="datetime-local"
            name="ngayChieuGioChieu"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Giá vé:</label>
          <input
            type="number"
            name="giaVe"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Tạo lịch chiếu
        </button>
      </form>
    </div>
  );
};

export default ShowtimePage;
