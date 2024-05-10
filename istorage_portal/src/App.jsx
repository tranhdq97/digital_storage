/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login/login";
import Register from "./pages/Login/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DocumentSearch from "./pages/DocumentSearch";
import FileSearch from "./pages/FileSearch";
import DocumentMetaData from "./pages/DocumentMetaData";
import FileMetaData from "./pages/FileMetaData";
import CartPage from "./pages/Cart";
import { ToastContainer, Zoom } from "react-toastify";
import { useDispatch } from "react-redux";
import InitApp from "./init";
import { LoginAction } from "./service/actions/userAction";
import { useEffect } from "react";
const routes = [
	{ path: "/", element: <Layout children={<Home />} /> },
	{ path: "/van-ban", element: <Layout children={<DocumentSearch />} /> },
	{ path: "/ho-so", element: <Layout children={<FileSearch />} /> },
	{ path: "/van-ban/:idFile/:id", element: <Layout children={<DocumentMetaData />} /> },
	{ path: "/ho-so/:id", element: <Layout children={<FileMetaData />} /> },
	{ path: "/gio-hang", element: <Layout children={<CartPage />} /> },
	{ path: "/login", element: <Login /> },
	{ path: "/register", element: <Register /> },
];

const App = () => {
	const dispatch = useDispatch();

	const Init = async () => {
		const userInfo = await InitApp.initUserInfo();
		console.log(userInfo);
		if (userInfo) {
			dispatch(LoginAction(userInfo.user.email, userInfo.user.username));
		}
	}

	useEffect(() => {
		Init();
	}, [])

	return (
		<div>
			<ToastContainer
				position="top-center"
				autoClose={5000}
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
					{routes.map((route, index) => (
						<Route key={index} path={route.path} element={route.element} />
					))}

				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
