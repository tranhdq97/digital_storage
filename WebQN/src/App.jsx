/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation } from "react-router-dom";
import Layout from "src/components/Layout";
import Home from "src/pages/Home";
import Login from "src/pages/Login";
import AddFile from "src/pages/Files/AddFile";
import { ToastContainer, Zoom } from 'react-toastify';
import DigitizingFile from "src/pages/Files/DigitizingFile";
import DueFile from "src/pages/Files/DueFile";
import KhoLuuTruLichSu from "src/pages/LuuTruLichSu/KhoLuuTruLichSu";
import HoSoTaiLieuGiaoNop from "src/pages/LuuTruCoQuan/HoSoTaiLieuGiaoNop";
import KhoLuuTruCoQuan from "src/pages/LuuTruCoQuan/KhoLuuTruCoQuan";
import HSdenhannopluuLS from "src/pages/LuuTruCoQuan/HSdenhannopluuLS";
import Search from "src/pages/Search";
import BaoCaoThongKe from "src/pages/BaoCaoThongKe";
import Decentralization from "src/pages/SystemManagement/Decentralization";
import User from "src/pages/SystemManagement/User";
import WareHouse from "src/pages/KhaiBaoDanhMuc/DanhMucKhoLuuTru/WareHouse";
import WareHouseRoom from "src/pages/KhaiBaoDanhMuc/DanhMucKhoLuuTru/WareHouseRoom";
import Shelf from "src/pages/KhaiBaoDanhMuc/DanhMucKhoLuuTru/Shelf";
import Drawers from "src/pages/KhaiBaoDanhMuc/DanhMucKhoLuuTru/Drawers";
import ReturnFile from "src/pages/Files/ReturnFile";
import LoginSSO from "src/pages/LoginSSO";
import HoSoBiTraVeCoQuan from "src/pages/LuuTruCoQuan/HoSoBiTraVeCoQuan";
import NhanVien from "src/pages/KhaiBaoDanhMuc/DanhMucCoQuan/NhanVien";
import PhongBan from "src/pages/KhaiBaoDanhMuc/DanhMucCoQuan/PhongBan";
import CoQuan from "src/pages/KhaiBaoDanhMuc/DanhMucCoQuan/CoQuan";
import DanhMucHoSo from "src/pages/KhaiBaoDanhMuc/DanhMucHoSo";
import KeHoachThuThap from "src/pages/ThuThapVaNopLuu/KeHoachThuThap";
import ThuThapHoSo from "src/pages/ThuThapVaNopLuu/ThuThapHoSo";
import BienBanBanGiao from "src/pages/ThuThapVaNopLuu/BienBanBanGiao";
import DuyetHoSoNopLuu from "src/pages/ThuThapVaNopLuu/DuyetHoSoNopLuu";
import NopLuuCoQuan from "src/pages/ThuThapVaNopLuu/NopLuuCoQuan";
import HoSoDaNhanNopLuu from "src/pages/ThuThapVaNopLuu/HoSoDaNhanNopLuu";
import HetThoiHanBaoQuan from "src/pages/TieuHuyHoSo/DSHoSoChoTieuHuy/HetThoiHanBaoQuan";
import DanhSachHoSoChoTieuHuy from "src/pages/TieuHuyHoSo/DSHoSoChoTieuHuy/ThoiGianKetThuc";
import TaoQuyetDinh from "src/pages/TieuHuyHoSo/QuyetDinh/TaoQuyetDinh"
import TraVe from "src/pages/TieuHuyHoSo/QuyetDinh/Trave"
import DuyetQuyetDinh from "src/pages/TieuHuyHoSo/QuyetDinh/DuyetQuyetDinh"
import SoNoiVuPheDuyet from "./pages/LuuTruLichSu/SoNoiVuPheDuyet";
import DanhMucChucVu from "src/pages/KhaiBaoDanhMuc/DanhMucChucVu";
import KhoiPhucHoSo from "src/pages/TieuHuyHoSo/KhoiPhuc/TaoQuyetDinhKhoiPhuc";
import DuyetQuyetDinhKhoiPhuc from "src/pages/TieuHuyHoSo/KhoiPhuc/DuyetQuyetDinhKhoiPhuc";
import TraVeQuyetDinhKhoiPhuc from "src/pages/TieuHuyHoSo/KhoiPhuc/TraVeQuyetDinhKhoiPhuc";
import BienMucHoSo from "src/pages/BienMucChinhLy/BienMucHoSo";
import KeHoachChinhLy from "src/pages/BienMucChinhLy/KeHoachChinhLy";
import DuyetChinhLy from "src/pages/DuyetChinhLy";
import KhaiBaoDanhMucNgonNgu from "src/pages/KhaiBaoDanhMuc/DanhMucNgonNgu";
import KhaiBaoDanhMucThoiHanBaoQuan from "src/pages/KhaiBaoDanhMuc/DanhMucThoiHanBaoQuan";
import KhaiBaoDanhMucTinhTrangVatLy from "src/pages/KhaiBaoDanhMuc/DanhMucTinhTrangVatLy";
import KhaiBaiDanhMucPhong from "src/pages/KhaiBaoDanhMuc/DanhMucPhong";
import PheDuyetLuuKho from "./pages/BienMucChinhLy/PheDuyetLuuKho";
import HoSoNopLuuBiTraVe from "./pages/ThuThapVaNopLuu/HoSoNopLuuBiTraVe";
import KeHoachThuThapBiTuChoi from "./pages/ThuThapVaNopLuu/KeHoachThuThapBiTuChoi";
import PheDuyetKeHoachThuThap from "./pages/ThuThapVaNopLuu/PheDuyetKeHoachThuThap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setUserPermission } from "./actions/userPermission"
import DuyetSaoHoSo from "./pages/QuanLiKhaiThac/SaoHoSo";
import DuyetSaoVaChungThucHoSo from "./pages/QuanLiKhaiThac/SaoVaChungThuc";

import axiosHttpService from "src/utils/httpService";
import DuyetKeHoachChinhLy from "./pages/BienMucChinhLy/DuyetKeHoachChinhLy";
import KeHoachChinhLyBiTuChoi from "./pages/BienMucChinhLy/KeHoachChinhLyBiTuChoi";
import BoSungHoSoTaiLieu from "./pages/BienMucChinhLy/BienMucBoSung/BoSungHoSoTaiLieu";
import HoSoTaiLieuDaDuocBoSung from "./pages/BienMucChinhLy/BienMucBoSung/HoSoTaiLieuDaDuocBoSung";
import TaoKeHoachLuuTruLichSu from "./pages/LuuTruLichSu/TaoKeHoachNopLuuLichSu";
import PheDuyetKeHoachLuuTruLichSu from "./pages/LuuTruLichSu/PheDuyetKeHoachLuuTruLichSu";
import KeHoachLuuTruLichSuBiTuChoi from "./pages/LuuTruLichSu/KeHoachLuuTruLichSuBiTuChoi";
import BoSungHoSoTaiLieuDaLuuKho from "./pages/BienMucChinhLy/BienMucBoSung/BoSungHoSoTaiLieuDaLuuKho";
import YeuCauBoSungHoSoTaiLieuDaLuuKho from "./pages/BienMucChinhLy/BienMucBoSung/YeuCauBoSungHoSoTaiLieuDaLuuKho";
import DuyetBoSungHoSoTaiLieuDaLuuKho from "./pages/BienMucChinhLy/PheDuyetLuuKhoBoSung/DuyetBoSungHoSoTaiLieuDaLuuKho";
import BienBanBanGiaoLuuTruLichSu from "./pages/LuuTruLichSu/BienBanBanGiaoLuuTruLichSu";
import TimKiemNangCao from "./pages/QuanLiKhaiThac/TimKiemNangCao";
import TimKiemVaDangKyMuonHoSo from "./pages/QuanLiKhaiThac/TimKiemVaDangKyMuonHoSo";
import GioTaiLieu from "./pages/QuanLiKhaiThac/GioTaiLieu";
import DuyetBoSungHoSoTaiLieu from "./pages/BienMucChinhLy/PheDuyetLuuKhoBoSung/DuyetBoSungHoSoTaiLieu";
import TimKiemVaDangKyMuonVanBan from "./pages/QuanLiKhaiThac/TimKiemVaDangKyMuonVanBan";
import KeHoachThuThapDuocDuyet from "./pages/ThuThapVaNopLuu/KeHoachThuThapDuocDuyet";
import TaoHoSoTTHC from "./pages/LuuTruToChucCaNhan/TaoHoSoTTHC";
import DuyetHoSoTTHC from "./pages/LuuTruToChucCaNhan/DuyetHoSoTTHC";
import HoSoTTHCBiTuChoi from "./pages/LuuTruToChucCaNhan/HoSoTTHCBiTuChoi";
import KhoHoSoTTHC from "./pages/LuuTruToChucCaNhan/KhoHoSoTTHC";
import HoSoChinhLyBiTraVe from "./pages/BienMucChinhLy/HoSoChinhLyBiTraVe";
import HoSoDenHanNopLuu from "./pages/ThuThapVaNopLuu/HoSoDenHanNopLuu";
import InitApp from "./init";
import { LoginAction } from "./service/actions/authenAction";
import { Fragment } from "react";
const API_ORGAN_GET_STAFF = import.meta.env.VITE_API_ORGAN_GET_STAFF

function LoggedIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const params = useParams();

    useEffect(() => {
        const fetchPermission = async () => {
            localStorage.setItem('userID', params.id);
            if (params.id === "0") {
                dispatch(setUserPermission([]));
                return;
            }
            const res = await axiosHttpService.get(API_ORGAN_GET_STAFF + "/" + params.id);
            dispatch(setUserPermission(res.data.permission_group_id));
        }
        fetchPermission();
        dispatch({ type: "LOGINED" });
        navigate("/")
    }, [])

    return (
        <div></div>
    )
}

const getLanguages = async () => {
    const res = await axiosHttpService.get(import.meta.env.VITE_API_LANGUAGE);
    const languages = res.data.map((item) => {
        return {
            label: item.name,
            value: item.id
        }
    })
    return languages;
}

const getMaintance = async () => {
    const res = await axiosHttpService.get(import.meta.env.VITE_API_STORAGE_DURATION);
    const maintance = res.data.map((item) => {
        if (item.duration === "Vĩnh viễn") return {
            label: item.duration,
            value: item.id
        }
        return {
            label: item.duration + " năm",
            value: item.id
        }
    })
    return maintance;
}

const getFormat = async () => {
    const res = await axiosHttpService.get(import.meta.env.VITE_API_PHYSICAL_STATE);
    const format = res.data.map((item) => {
        return {
            label: item.name,
            value: item.id
        }
    })
    return format;
}

const getOrganId = async () => {
    const res = await axiosHttpService.get(import.meta.env.VITE_API_FOND);
    const organId = res.data.map((item) => {
        return {
            label: item.fond_name,
            value: item.id
        }
    })
    return organId;
}

const loginPage = () => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
        return <Login />
    } else {
        return <Navigate to="/" />
    }
}

const loginSSOPage = () => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin)
        return (
            <LoginSSO />
        )
    return (
        <Navigate to="/" />
    )
}

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const isLogin = localStorage.getItem("isLogin");

    const dispatch = useDispatch();
    getLanguages().then((languages) => {
        dispatch({ type: "GET_LANGUAGE_SUCCESS", payload: languages })
    })

    getMaintance().then((maintance) => {
        dispatch({ type: "GET_MAINTANCE_SUCCESS", payload: maintance })
    })

    getFormat().then((format) => {
        dispatch({ type: "GET_FORMAT_SUCCESS", payload: format })
    })

    getOrganId().then((organId) => {
        dispatch({ type: "GET_ORGAN_ID_SUCCESS", payload: organId })
    })

    const Init = async () => {
        const userInfo = await InitApp.initUserInfo();
        if (userInfo) {
            dispatch(LoginAction(userInfo.email, userInfo.full_name));
            const permissions = userInfo.menu_permission.split("-");
            dispatch(setUserPermission(permissions));
        } else {
            if (window.location.pathname === "/dang-nhap") return;
            dispatch({ type: "LOGOUT" });
        }
        setIsLoading(false);
    };

    useEffect(() => {
        Init();
    }, []);

    const routes = [
        { path: "/", element: <Home /> },
        { path: "/ho-so/tao-ho-so-dien-tu", element: <AddFile /> },
        { path: "/ho-so/so-hoa-ho-so-tai-lieu", element: <DigitizingFile /> },
        { path: "/ho-so/ho-so-den-han-nop-luu", element: <DueFile /> },
        { path: "/thu-thap-va-nop-luu/ho-so-nop-luu-bi-tra-ve", element: <HoSoNopLuuBiTraVe /> },
        { path: "/thu-thap-va-nop-luu/ho-so-den-han-nop-luu", element: <HoSoDenHanNopLuu /> },
        {
            path: "/luu-tru-co-quan/ho-so-tai-lieu-giao-nop",
            element: <HoSoTaiLieuGiaoNop />,
        },
        {
            path: "/luu-tru-lich-su/so-noi-vu-phe-duyet",
            element: <SoNoiVuPheDuyet />,
        },
        {
            path: "/luu-tru-co-quan/kho-luu-tru-co-quan",
            element: <KhoLuuTruCoQuan />,
        },
        {
            path: "/luu-tru-co-quan/ho-so-den-han-nop-luu-lich-su",
            element: <HSdenhannopluuLS />,
        },
        {
            path: "/luu-tru-co-quan/ho-so-bi-tra-ve",
            element: <HoSoBiTraVeCoQuan />,
        },
        // {
        //     path: "/luu-tru-lich-su/ho-so-tai-lieu-giao-nop",
        //     element: <HoSoTaiLieuGiaoNopLS />,
        // },
        {
            path: "/luu-tru-lich-su/phe-duyet-ke-hoach-nop-luu-lich-su",
            element: <PheDuyetKeHoachLuuTruLichSu />,
        },
        {
            path: "/luu-tru-lich-su/kho-luu-tru-lich-su",
            element: <KhoLuuTruLichSu />,
        },
        {
            path: "/tra-cuu-va-tim-kiem",
            element: <Search />
        },
        {
            path: "/bao-cao-va-thong-ke",
            element: <BaoCaoThongKe />
        },
        {
            path: "/quan-ly-he-thong/nguoi-dung",
            element: <User />
        },
        {
            path: "/khai-bao-danh-muc/danh-muc-chuc-vu",
            element: <DanhMucChucVu />
        },
        {
            path: "/quan-ly-he-thong/phan-quyen-he-thong",
            element: <Decentralization />
        },
        {
            path: "/khai-bao-danh-muc/danh-muc-kho-luu-tru/kho",
            element: <WareHouse />
        },
        {
            path: "/khai-bao-danh-muc/danh-muc-kho-luu-tru/phong-kho",
            element: <WareHouseRoom />
        },
        {
            path: "/khai-bao-danh-muc/danh-muc-kho-luu-tru/ke",
            element: <Shelf />
        },
        {
            path: "/khai-bao-danh-muc/danh-muc-kho-luu-tru/hop",
            element: <Drawers />
        },
        {
            path: "/khai-bao-danh-muc/danh-muc-co-quan/:organ_id/:department_id",
            element: <NhanVien />
        },
        {
            path: "/khai-bao-danh-muc/danh-muc-co-quan/:id",
            element: <PhongBan />
        },
        {
            path: "/khai-bao-danh-muc/danh-muc-co-quan",
            element: <CoQuan />
        },
        {
            path: "/khai-bao-danh-muc/danh-muc-ho-so",
            element: <DanhMucHoSo />
        },
        {
            path: "/thu-thap-va-nop-luu/tao-ke-hoach-thu-thap",
            element: <KeHoachThuThap />
        },
        {
            path: "/thu-thap-va-nop-luu/thu-thap-ho-so",
            element: <ThuThapHoSo />
        },
        {
            path: "/thu-thap-va-nop-luu/bien-ban-ban-giao",
            element: <BienBanBanGiao />
        },
        {
            path: "/thu-thap-va-nop-luu/ho-so-da-nhan-nop-luu",
            element: <HoSoDaNhanNopLuu />
        },
        {
            path: "/thu-thap-va-nop-luu/nop-luu-co-quan",
            element: <NopLuuCoQuan />
        },
        {
            path: "/thu-thap-va-nop-luu/duyet-ho-so-nop-luu",
            element: <DuyetHoSoNopLuu />
        },
        {
            path: "/tieu-huy-ho-so/danh-sach-ho-so-cho-tieu-huy",
            element: <DanhSachHoSoChoTieuHuy />
        },
        {
            path: "/tieu-huy-ho-so/danh-sach-ho-so-cho-tieu-huy/het-thoi-han-bao-quan",
            element: <HetThoiHanBaoQuan />
        },
        {
            path: "/tieu-huy-ho-so/quyet-dinh/tra-ve",
            element: <TraVe />
        },
        {
            path: "/tieu-huy-ho-so/quyet-dinh/duyet-quyet-dinh",
            element: <DuyetQuyetDinh />
        },
        {
            path: "/tieu-huy-ho-so/quyet-dinh/tao-quyet-dinh",
            element: <TaoQuyetDinh />
        },
        {
            path: "/tieu-huy-ho-so/khoi-phuc/tra-ve",
            element: <TraVeQuyetDinhKhoiPhuc />
        },
        {
            path: "/tieu-huy-ho-so/khoi-phuc/danh-sach-ho-so-duoc-khoi-phuc",
            element: <DuyetQuyetDinhKhoiPhuc />
        },
        {
            path: "/tieu-huy-ho-so/khoi-phuc/danh-sach-ho-so-bi-tieu-huy",
            element: <KhoiPhucHoSo />
        },

        {
            path: "/bien-muc-chinh-ly/bien-muc-ho-so",
            element: <BienMucHoSo />
        },

        {
            path: "/bien-muc-chinh-ly/ke-hoach-chinh-ly",
            element: <KeHoachChinhLy />
        },

        {
            path: "/khai-bao-danh-muc/danh-muc-ngon-ngu/",
            element: <KhaiBaoDanhMucNgonNgu />
        },

        {
            path: "/khai-bao-danh-muc/danh-muc-thoi-han-bao-quan/",
            element: <KhaiBaoDanhMucThoiHanBaoQuan />
        },

        {
            path: "/khai-bao-danh-muc/danh-muc-tinh-trang-vat-ly/",
            element: <KhaiBaoDanhMucTinhTrangVatLy />
        },

        {
            path: "/khai-bao-danh-muc/danh-muc-phong",
            element: <KhaiBaiDanhMucPhong />
        },

        {
            path: "/bien-muc-chinh-ly/phe-duyet-luu-kho",
            element: <PheDuyetLuuKho />
        },
        {
            path: "duyet-chinh-ly",
            element: <DuyetChinhLy />
        },
        {
            path: "/quan-li-thong-tin-khai-thac/danh-sach-yeu-cau-sao-ho-so-tai-lieu",
            element: <DuyetSaoHoSo />
        },
        {
            path: "/quan-li-thong-tin-khai-thac/danh-sach-yeu-cau-sao-ho-so-va-chung-thuc",
            element: <DuyetSaoVaChungThucHoSo />
        },
        {
            path: "/thu-thap-va-nop-luu/ho-so-nop-luu-bi-tra-ve",
            element: <HoSoNopLuuBiTraVe />
        },
        {
            path: "/thu-thap-va-nop-luu/ke-hoach-thu-thap-bi-tu-choi",
            element: <KeHoachThuThapBiTuChoi />
        },
        {
            path: "/thu-thap-va-nop-luu/phe-duyet-ke-hoach-thu-thap",
            element: <PheDuyetKeHoachThuThap />
        },
        {
            path: "/bien-muc-chinh-ly/duyet-ke-hoach-chinh-ly",
            element: <DuyetKeHoachChinhLy />
        },
        {
            path: "/bien-muc-chinh-ly/ho-so-chinh-ly-bi-tra-ve",
            element: <HoSoChinhLyBiTraVe />
        },
        {
            path: "/bien-muc-chinh-ly/ke-hoach-chinh-ly-bi-tu-choi",
            element: <KeHoachChinhLyBiTuChoi />
        },
        {
            path: "/bien-muc-chinh-ly/bien-muc-bo-sung/bo-sung-ho-so-tai-lieu",
            element: <BoSungHoSoTaiLieu />
        },
        {
            path: "/bien-muc-chinh-ly/bien-muc-bo-sung/bo-sung-ho-so-tai-lieu-da-luu-kho",
            element: <BoSungHoSoTaiLieuDaLuuKho />
        },
        {
            path: "/bien-muc-chinh-ly/bien-muc-bo-sung/yeu-cau-bo-sung-ho-so-tai-lieu-da-luu-kho",
            element: <YeuCauBoSungHoSoTaiLieuDaLuuKho />
        },
        {
            path: "/bien-muc-chinh-ly/phe-duyet-bien-muc-bo-sung/duyet-bo-sung-ho-so-tai-lieu-da-luu-kho",
            element: <DuyetBoSungHoSoTaiLieuDaLuuKho />
        },
        {
            path: "/bien-muc-chinh-ly/bien-muc-bo-sung/ho-so-tai-lieu-da-duoc-bo-sung",
            element: <HoSoTaiLieuDaDuocBoSung />
        },
        {
            path: "/luu-tru-lich-su/tao-ke-hoach-nop-luu-lich-su",
            element: <TaoKeHoachLuuTruLichSu />
        },
        {
            path: "/luu-tru-lich-su/bien-ban-ban-giao",
            element: <BienBanBanGiaoLuuTruLichSu />
        },
        {
            path: "/quan-li-thong-tin-khai-thac/tim-kiem-nang-cao",
            element: <TimKiemNangCao />
        },
        {
            path: "/quan-li-thong-tin-khai-thac/tim-kiem-va-dang-ky-muon-ho-so",
            element: <TimKiemVaDangKyMuonHoSo />
        },
        {
            path: "/quan-li-thong-tin-khai-thac/tim-kiem-va-dang-ky-muon-van-ban",
            element: <TimKiemVaDangKyMuonVanBan />
        },
        {
            path: "/quan-li-thong-tin-khai-thac/gio-tai-lieu",
            element: <GioTaiLieu />
        },
        {
            path: "/bien-muc-chinh-ly/phe-duyet-bien-muc-bo-sung/duyet-bo-sung-ho-so-tai-lieu",
            element: <DuyetBoSungHoSoTaiLieu />
        },
        {
            path: "/luu-tru-lich-su/phe-duyet-ke-hoach-luu-tru-lich-su",
            element: <PheDuyetKeHoachLuuTruLichSu />
        },
        {
            path: "/luu-tru-lich-su/ke-hoach-luu-tru-lich-su-bi-tu-choi",
            element: <KeHoachLuuTruLichSuBiTuChoi />
        },
        {
            path: "/thu-thap-va-nop-luu/ke-hoach-thu-thap-duoc-duyet",
            element: <KeHoachThuThapDuocDuyet />
        },
        {
            path: "/kho-luu-tru-to-chuc-ca-nhan/tao-ho-so-thuc-hien-thu-tuc-hanh-chinh",
            element: <TaoHoSoTTHC />
        },
        {
            path: "/kho-luu-tru-to-chuc-ca-nhan/duyet-ho-so-thuc-hien-thu-tuc-hanh-chinh",
            element: <DuyetHoSoTTHC />
        },
        {
            path: "/kho-luu-tru-to-chuc-ca-nhan/ho-so-thuc-hien-thu-tuc-hanh-chinh-bi-tu-choi",
            element: <HoSoTTHCBiTuChoi />
        },
        {
            path: "/kho-luu-tru-to-chuc-ca-nhan/kho-ho-so-thuc-hien-thu-tuc-hanh-chinh",
            element: <KhoHoSoTTHC />
        },
    ];

    return (
        <Fragment>
            <ToastContainer
                position="top-center"
                autoClose={10000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Zoom}
            />

            <BrowserRouter>
                <Routes>
                    <Route path="/dang-nhap" element={loginPage()} />
                    <Route path="/dang-nhap-sso" element={loginSSOPage()} />
                    <Route path="/logged-in/:id" element={<LoggedIn />} />


                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={isLogin ? <Layout>{route.element}</Layout> : <Navigate to="/dang-nhap" />}
                        />
                    ))}
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
};

export default App;
