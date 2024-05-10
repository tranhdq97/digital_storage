import React, { Fragment, useRef, useState } from "react";
import { Spin } from "antd";
import { FaSearch } from "react-icons/fa";
import "./searchbar.css";
import axiosHttpService from "src/utils/httpService";
import {useSelector } from "react-redux";
import Doc from "./Doc";
import File from "./File";

const API_SEARCH = import.meta.env.VITE_API_SEARCH;
const API_GOV_FILE_GET = import.meta.env.VITE_API_GOV_FILE_GET

const Searchbar = () => {
	const [stateDoc, setStateDoc] = useState(false)
	const [idDOc, setIdDoc] = useState(null)
	const [govFileId, setGovFileId] = useState(null)
	const refInput = useRef();
	const [searching, setSearching] = useState(false);
	const [completeGetAPI, setCompleteGetAPI] = useState(false);
	const [searchedFile, setSearchedFile] = useState([]);
	const [textSearch, setTextSearch] = useState("");
	const [numberOfData, setNumberOfData] = useState(-1);
	const userPermissionId = useSelector(state => state.user.permission_id)
	const [stateFile, setStateFile] = useState(false)
	const getFileName = async (items) => {
		const searchedFileWithFileName = []
		try {
			for (const item of items) {
				const response = await axiosHttpService.get(API_GOV_FILE_GET + "id=" + item.gov_file_id + "&perm_token=" + userPermissionId)
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
	}

	const handleSearch = (e) => {
		const query = refInput.current.value;

		const fetchData = () => {
			setSearching(true);
			setTimeout(async () => {
				const response = await axiosHttpService.post(API_SEARCH, {
					query: query,
				});

				setTextSearch(query)
				setCompleteGetAPI(true);
				setSearching(false);
				setTimeout(() => {
					getFileName(response.data.items)
				}, 320);
			}, 2000);
		};

		if (e.key === "Enter" || e.type === "click")
			fetchData();


	};

	const viewDoc = (idFile, idDoc) => {
		setIdDoc(idDoc)
		setGovFileId(idFile)
		setStateDoc(true)
	};

	const viewFile = (idFile) => {
		setStateFile(true)
		setGovFileId(idFile)
	}

	return (
		<Fragment>
			<div className="bg-white h-[80vh] relative">
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
								className="w-[21px] h-[25.2px] "
								id="search-icon"
								onClick={handleSearch}
							/>
						)}
						<input
							ref={refInput}
							placeholder="Nhập nội dung cần tìm kiếm..."
							onKeyDown={handleSearch}
							disabled={searching}
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
										<div className="flex justify-left items-center text-[20px]">
											<span
												onClick={() => viewFile(file.gov_file_id)}
												className="cursor-pointer text-[rgba(0,0,0,.45)]"
											>
												{file.file_name}
											</span>
											&nbsp;/ &nbsp;
											<span className="cursor-pointer" onClick={() => { viewDoc(file.gov_file_id, file.doc_id) }}>{file.doc_name}</span>
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
			<Doc stateFixDoc={stateDoc} setStateFixDoc={setStateDoc} id={idDOc} govFileId={govFileId} />
			<File stateFile={stateFile} setStateFile={setStateFile} govFileId={govFileId}/>
		</Fragment>

	);
};

export default Searchbar;
