import React, { Fragment, useEffect, useRef, useState } from "react";
import { Spin } from "antd";
import { FaSearch } from "react-icons/fa";
import "./searchbar.css";
import axiosCrossDomainHttpService from "src/utils/httpService";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHeaderUnfixed } from "src/service/actions/headerAction";
import { addDocToCart } from "src/service/actions/cartAction";
import { Button } from "@mui/material";
import { notifySuccess } from "src/utils/function";

const API_SEARCH = import.meta.env.VITE_API_SEARCH;
const API_GOV_FILE_GET = import.meta.env.VITE_API_GOV_FILE_GET

const DocumentSearch = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const searchQuery = new URLSearchParams(location.search).get('search');
	const [searchTerm, setSearchTerm] = useState(searchQuery);
	const refInput = useRef();
	const [searching, setSearching] = useState(false);
	const [completeGetAPI, setCompleteGetAPI] = useState(false);
	const [searchedFile, setSearchedFile] = useState([]);
	const [textSearch, setTextSearch] = useState("");
	const [numberOfData, setNumberOfData] = useState(-1);
	const userPermissionId = 1
	const dispatch = useDispatch();
    dispatch(setHeaderUnfixed());

	const getFileName = async (items, search) => {
		const searchedFileWithFileName = []
		try {
			for (const item of items) {
				const response = await axiosCrossDomainHttpService.get(API_GOV_FILE_GET + "id=" + item.gov_file_id + "&perm_token=" + userPermissionId)
				searchedFileWithFileName.push({
					...item,
					file_name: response.data[0].title
				})
			}
		} catch (err) {
			console.log(err)
		}
		setSearchedFile(searchedFileWithFileName)
		setNumberOfData(searchedFileWithFileName.length);
		setTextSearch(search)
		setSearching(false);
	}

	const handleSearch = (search) => {
		const fetchData = () => {
			setSearching(true);
			navigate("/van-ban?search=" + searchTerm)
			setTimeout(async () => {
				const response = await axiosCrossDomainHttpService.post(API_SEARCH, {
					query: search,
				});
				setCompleteGetAPI(true);
				setTimeout(() => {
					getFileName(response.data.items, search)
				}, 100);
			}, 1000);
		};
		fetchData();
	};

	const viewDocument = (idFile, idDoc) => {
		navigate("/van-ban/" + idFile + "/" + idDoc)
	}

	const handleKeyDown = (e) => {
		if (e.key === "Enter" || e.type === "click"){
			handleSearch(searchTerm)
		}
	}

	const handleChangeSearchTerm = (e) => {
		setSearchTerm(e.target.value)
	}

	useEffect(() => {
		if (searchTerm) {
			handleSearch(searchTerm)
		}
	}, [])

	const handleClickAddDocToCart = (idFile, idDoc) => {
		dispatch(addDocToCart(idFile, idDoc))
		notifySuccess("Thêm văn bản vào giỏ hàng thành công")
	}

	return (
		<Fragment>
			<div className="bg-white h-[100vh] relative">
				<div
					className={`w-full flex justify-center flex-col items-center absolute transition-all top-[150px] duration-300 ${completeGetAPI === true ? "search-bar-after-search" : ""
						}`}
				>
					<h1 className="text-[25px] font-bold pb-[20px] duration-300 transition-all">
						Tìm kiếm văn bản theo nội dung
					</h1>
					<div className="input-wrapper mb-[20px] duration-300 transition-all">
						{searching ? (
							<Spin />
						) : (
							<FaSearch
								className="w-[21px] h-[25.2px]"
								id="search-icon"
								onClick={handleSearch}
							/>
						)}
						<input
							ref={refInput}
							placeholder="Nhập nội dung cần tìm kiếm..."
							onChange={handleChangeSearchTerm}
							onKeyDown={handleKeyDown}
							disabled={searching}
							className="ml-[6px]"
						/>
					</div>
				</div>

				<div>
					<div className="pt-[110px] px-[10%]">
						{numberOfData > -1 &&
							<div className="text-center pb-[20px]">
								Tổng số văn bản tìm kiếm được: {numberOfData}
							</div>
						}

						{searchedFile.length > 0 &&
							searchedFile.map((file, index) => {
								return (
									<div className="border-[2px] border-solid p-[8px] rounded-[5px] mb-[16px]">
										<div className="flex justify-between items-center">
											<div className="flex justify-left items-center text-[20px]">
												<span
													className="text-[rgba(0,0,0,.45)]"
												>
													{file.file_name}
												</span>
												&nbsp;/ &nbsp;
												<span
													className="cursor-pointer "
													onClick={() => viewDocument(file.gov_file_id, file.doc_id)}
												>{file.doc_name}</span>
											</div>
											<Button className="italic underline text-blue-500 cursor-pointer" onClick={() => handleClickAddDocToCart(file.gov_file_id, file.doc_id)}>
												Mượn
											</Button>
										</div>

										<div className="font-bold">
											{textSearch}
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>

		</Fragment>

	);
};

export default DocumentSearch;
