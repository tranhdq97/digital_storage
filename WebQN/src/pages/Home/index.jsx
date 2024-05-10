import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import TimKiemToanVan from "src/assets/img/TimKiemToanVan.png";
import PhanQuyenHeThong from "src/assets/img/PhanQuyenHeThong.png";
import DenHanNopLuu from "src/assets/img/HoSoDenHanNopLuu.png";
import LuuTruCoQuan from "src/assets/img/LuuTruCoQuan.png";
import LuuTruLichSu from "src/assets/img/LuuTruLichSu.png";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axiosHttpService from "src/utils/httpService";

const API_GOV_FILE_GET_ALL = import.meta.env.VITE_API_GOV_FILE_GET_ALL;

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    axiosHttpService
      .get(API_GOV_FILE_GET_ALL)
      .then((response) => {
        setFileData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label;
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };
  const countByStatus = {
    '1': 0, //Hồ sơ mở
    '2': 0, //Hồ sơ đóng
    '4': 0, //Kho lưu trữ cơ quan
    '7': 0, //Nộp lưu cơ quan bị trả về
    '6': 0, //Kho lưu trữ lịch sử
    '8': 0, //Nộp lưu lịch sử bị trả về
  };

  if (fileData) {
    fileData.forEach((file) => {
      const status = file.state;
      if (countByStatus[status]) {
        countByStatus[status]++;
      } else {
        countByStatus[status] = 1;
      }
    });
  }

  const data = {
    labels: [
      "Hồ sơ mở",
      "Hồ sơ đóng",
      "Kho lưu trữ cơ quan",
      "Nộp lưu cơ quan bị trả về",
      "Kho lưu trữ lịch sử",
      "Nộp lưu lịch sử bị trả về",
    ],
    datasets: [
      {
        label: "Số lượng hồ sơ",
        data: [
          countByStatus['1'] || 0,
          countByStatus['2'] || 0,
          countByStatus['4'] || 0,
          countByStatus['7'] || 0,
          countByStatus['6'] || 0,
          countByStatus['8'] || 0,
        ],
        backgroundColor: [
          "rgba(0, 0, 255, 0.5)", //mở
          "RGBA( 255, 0, 0, 0.6)", //đóng
          "rgba(255,255,0,0.5)",
          "rgba(0, 255, 0, 0.5)",
          "RGBA( 255, 140, 0, 0.5 )",
          "rgba(128, 0, 128, 0.5)",
        ],
        borderColor: [
          "rgba(0, 0, 255, 0.8)",
          "RGBA( 255, 0, 0, 0.8)",
          "rgba(255,255,0,0.8)",
          "rgba(0, 255, 0, 0.8)",
          "RGBA( 255, 140, 0, 0.8 )",
          "rgba(128, 0, 128, 0.8)",
        ],
        hoverBackgroundColor: [
          "rgba(0, 0, 255, 1)",
          "RGBA( 255, 0, 0, 1)",
          "rgba(255,255,0,1)",
          "rgba(0, 255, 0, 1)",
          "RGBA( 255, 69, 0, 1 )",
          "rgba(128, 0, 128, 1)",
        ],
        borderWidth: 1.5,
      },
    ],
  };

  return (
    <div className="flex">
      <div className="w-2/4 border-[2px] border-yellow-400 bg-gray-200 ml-[1em] mr-[1em] h-[600px] rounded-[8px]">
        <div className="flex items-center mt-[10px]">
          <h1 className="text-[20px] text-blue-500  font-bold ml-[10px] mr-2">
            Hồ sơ
          </h1>
          <hr className="border-blue-500 border-[1px] h-0 w-[85%] " />
        </div>
        <div className="container">
          <Link
            to="/ho-so/ho-so-den-han-nop-luu"
            className="box hover:bg-blue-200 hover:border-[2px] hover: border-blue-500"
          >
            <div className="icon mt-[10px]">
              <img
                className="w-[80px]"
                alt="Hồ Sơ cần nộp lưu cơ quan"
                src={DenHanNopLuu}
              />
            </div>
            <div className="text font-bold">
              <h3>[LTCQ] Hồ sơ cần nộp lưu</h3>
            </div>
          </Link>
          <Link
            to="/luu-tru-co-quan/kho-luu-tru-co-quan"
            className="box hover:bg-blue-200 hover:border-[2px] hover: border-blue-500"
          >
            <div className="icon mt-[10px]">
              <img
                className="w-[80px]"
                alt="Kho lưu trữ cơ quan"
                src={LuuTruCoQuan}
              />
            </div>
            <div className="text font-bold">
              <h3>[LTCQ] Kho lưu trữ cơ quan</h3>
            </div>
          </Link>
        </div>

        <div className="container">
          <Link
            to="/luu-tru-co-quan/ho-so-den-han-nop-luu-lich-su"
            className="box hover:bg-blue-200 hover:border-[2px] hover: border-blue-500 mt-[20px]"
          >
            <div className="icon mt-[10px]">
              <img
                className="w-[80px]"
                alt="Hồ sơ đến hạn nộp lưu lịch sử"
                src={DenHanNopLuu}
              />
            </div>
            <div className="text font-bold">
              <h3>[LTLS] Hồ sơ cần nộp lưu</h3>
            </div>
          </Link>
          <Link
            to="/luu-tru-lich-su/kho-luu-tru-lich-su"
            className="box hover:bg-blue-200 hover:border-[2px] hover: border-blue-500 mt-[20px]"
          >
            <div className="icon mt-[10px]">
              <img
                className="w-[80px]"
                alt="Kho lưu trữ lịch sử"
                src={LuuTruLichSu}
              />
            </div>
            <div className="text font-bold">
              <h3>[LTLS] Kho lưu trữ lịch sử</h3>
            </div>
          </Link>
        </div>
        <div className="flex items-center mt-[15px]">
          <h1 className="text-[20px] text-blue-500  font-bold ml-[10px] mr-2">
            Dịch vụ hệ thống
          </h1>
          <hr className="border-blue-500 border-[1px] h-0 w-[69%] " />
        </div>
        <div className="container">
          <Link to="/tra-cuu-va-tim-kiem" className="box hover:bg-blue-200 hover:border-[2px] hover: border-blue-500">
            <div className="icon mt-[10px]">
              <img
                className="w-[80px]"
                alt="Danh sách hồ sơ"
                src={TimKiemToanVan}
              />
            </div>
            <div className="text font-bold">
              <h3>Tìm kiếm toàn văn</h3>
            </div>
          </Link>
          <Link
            to="/quan-ly-he-thong/phan-quyen-he-thong"
            className="box hover:bg-blue-200 hover:border-[2px] hover: border-blue-500"
          >
            <div className="icon mt-[10px]">
              <img
                className="w-[80px]"
                alt="Danh sách hồ sơ"
                src={PhanQuyenHeThong}
              />
            </div>
            <div className="text font-bold">
              <h3>Phân quyền hệ thống</h3>
            </div>
          </Link>
        </div>
      </div>
      <div className="w-2/4  border-[2px] border-yellow-400 mr-[1em] h-[600px] rounded-[8px] flex justify-top items-center flex-col bg-gray-200">
        <div className="text-[23px] font-bold text-center mt-[5px] text-blue-500">
          Thống kê
        </div>
        <div className="w-[550px] h-[550px] ">
          <Pie data={data} options={options}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
