/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import AddDoc from "./AddDoc";
import { Table } from "../../../custom/Components";
import axiosHttpService from "src/utils/httpService";
import FixDoc from "./FixDoc";
import EOFFICE from "./EOFFICE";
import { DeleteData, GetDataFromIDFile } from "../../../custom/Function";
import { Button, Popconfirm, Input } from "antd";
import * as XLSX from "xlsx/xlsx.mjs";

import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch, useSelector } from "react-redux";
import LoginEoffice from "./LoginEoffice";
import DocumentAPIService from "src/service/api/DocumentAPIService";

const API_DOCUMENT_GET = import.meta.env.VITE_API_DOCUMENT_GET;
const API_DOCUMENT_DELETE = import.meta.env.VITE_API_DOCUMENT_DELETE;
const API_EXPORT_EXCEL = import.meta.env.VITE_API_EXPORT_EXCEL;

const TABLE_FIELDS = [
  { title: "TT", key: "doc_ordinal", width: "50px" },
  { title: "Ngày ban hành", key: "issued_date", width: "100%" },
  { title: "Bút ký", key: "autograph", width: "100%" },
  { title: "Mã văn bản", key: "code_number", width: "100%" },
  { title: "Tên văn bản", key: "doc_name", width: "100%" },
  { title: "Chức năng", key: "Function", width: "100px" },
];

const ButtonFunctions = ({
  pdfData,
  URL_PDF_FILE,
  handleClickOnDocument,
  pdfID,
  fetchDocumentsOfFile,
  govFileID,
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    DeleteData(API_DOCUMENT_DELETE, { id: pdfID }, "Xóa văn bản thành công");
    setTimeout(async () => {
      await fetchDocumentsOfFile(govFileID);
    }, 500);
    setOpen(false);
  };

  useEffect(() => {
    const popupContainer = document.querySelectorAll(
      ".ant-popover.ant-popconfirm.css-dev-only-do-not-override-1fviqcj.css-dev-only-do-not-override-1fviqcj.ant-popover-placement-top"
    )[0];

    if (popupContainer === undefined) return;

    const buttonAccepts = document.querySelectorAll(
      ".ant-popconfirm-buttons > .ant-btn-primary"
    );
    buttonAccepts.forEach((buttonCancel) => {
      buttonCancel.textContent = "Xóa";
    });

    const buttonCancels = document.querySelectorAll(
      ".ant-popconfirm-buttons > .ant-btn-default "
    );
    buttonCancels.forEach((buttonAccept) => {
      buttonAccept.textContent = "Hủy";
    });
  }, [open]);

  return (
    <div className="flex justify-between">
      <Button
        onClick={(ev) => handleClickOnDocument(URL_PDF_FILE, pdfData, pdfID)}
        className="w-[33%] px-[2px] border-none font-bold italic block text-center text-[16px] hover:underline text-[#537FE7]"
        title="Xem chi tiết"
      >
        <i className="fa-regular fa-eye"></i>
      </Button>

      <Popconfirm
        title="Xóa văn bản"
        open={open}
        description="Bạn có chắc chắn xóa?"
        onConfirm={handleConfirm}
        onCancel={handleClose}
      >
        <Button
          onClick={() => {
            setOpen(true);
          }}
          className="w-[33%] px-[2px] border-none font-bold italic block text-center text-[16px] hover:underline text-[#7d8183]"
          title="Xóa"
        >
          <i className="fa-solid fa-trash-can"></i>
        </Button>
      </Popconfirm>

      <Button
        className="w-[33%] px-[2px] border-none font-bold italic block text-center text-[16px] hover:underline text-[#FF8400]"
        title="Phân quyền"
      >
        <i className="fa-solid fa-user-doctor"></i>
      </Button>
    </div>
  );
};

const DocCategory = ({ eOffice = true }) => {
  const [stateAddDoc, setStateAddDoc] = useState(false);
  const [stateFixDoc, setStateFixDoc] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileLink, setPdfFileLink] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [pdfID, setPdfID] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [stateEoffice, setStateEoffice] = useState(false);
  const [fileSheet, setFileSheet] = useState([]);
  const [openLoginEoffice, setOpenLoginEoffice] = useState(false);
  const userPermissionId = useSelector((state) => state.user.permission_id);
  const stateDocCategory = useSelector((state) => state.docCategory.state);
  const govFileID = useSelector((state) => state.docCategory.id);

  const dispatch = useDispatch();

  const handleClickOnDocument = async (URL_PDF_FILE, pdfData, pdfID) => {
    setPdfFileLink(URL_PDF_FILE);
    setPdfData(pdfData);
    setPdfID(pdfID);
    await axiosHttpService
      .get(URL_PDF_FILE)
      .then((res) => {
        setPdfFile(res.data);
        setStateFixDoc(true);
      })
      .catch((err) => console.log("errors:", err));
  };

  const fetchDocumentsOfFile = (govFileID) => {
    const fetchData = async (govFileID) => {
      const currentAPI = `${API_DOCUMENT_GET}${govFileID}`;
      try {
        setIsLoading(true);
        const response = await fetch(currentAPI);
        if (response.ok) {
          const rawDatas = await response.json();
          setFileSheet(rawDatas);
          const filesArray = [];
          for (const rawData of rawDatas) {
            filesArray.push({
              id: rawData.id,
              doc_ordinal: rawData.doc_ordinal,
              issued_date: rawData.issued_date,
              autograph: rawData.autograph,
              code_number: rawData.code_number,
              doc_name: rawData.doc_name,
              Function: (
                <ButtonFunctions
                  pdfData={rawData}
                  URL_PDF_FILE={rawData.url}
                  handleClickOnDocument={handleClickOnDocument}
                  pdfID={rawData.id}
                  fetchDocumentsOfFile={fetchDocumentsOfFile}
                  govFileID={govFileID}
                />
              ),
            });
          }
          setFiles(filesArray);
        }
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchData(govFileID);
  };

  useEffect(() => {
    const fetchData = async () => {
      fetchDocumentsOfFile(govFileID);
      const data = await GetDataFromIDFile(govFileID, userPermissionId);
      setFileData(data);
    };

    if (govFileID === -1 || govFileID === null || govFileID === undefined)
      return;

    fetchData();
  }, [govFileID]);

  const handleExportExcel = async () => {
    const getExcel = async () => {
      const response = await axiosHttpService.post(
        API_EXPORT_EXCEL,
        {
          luong: 200,
          data: fileSheet,
        },
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `DanhSachVanBan.xlsx`);
      document.body.appendChild(link);
      link.click();
      console.log(fileSheet);
    };
    getExcel();
    // console.log(fileSheet)
    // const wb = XLSX.utils.book_new()
    // const ws = XLSX.utils.json_to_sheet(fileSheet)
    // XLSX.utils.book_append_sheet(wb, ws, "SheetJS")
    // XLSX.writeFile(wb, "sheetVB.xlsx")
  };

  const handleAddDocFromEoffice = async () => {
    const token = localStorage.getItem("eoffice_token");
    if (!token) {
      setOpenLoginEoffice(true);
    } else {
      const data = await DocumentAPIService.getEofficeDoc(1);
      console.log('data', data);
      console.log('is data array', Array.isArray(data));
      if (!Array.isArray(data)) {
        setOpenLoginEoffice(true);
        return;
      }
      setStateEoffice(true);
    }
  }

  return (
    <>
      {stateDocCategory && (
        <div className="overflow-y-hidden fixed top-0 right-0 bottom-0 left-0 h-full w-full z-[500] bg-[rgba(0,0,0,.45)]">
          <div className="relative  h-[calc(100vh)] top-[20px] pb-[30px] ">
            <div className="h-full relative overflow-y-scroll w-[calc(100vw-80px)] my-0 mx-auto bg-[#f0f2f5]">
              <div className="relative">
                <button
                  onClick={() => {
                    dispatch({ type: "close", id: govFileID });
                  }}
                  className="text-[20px] absolute right-0 w-[40px] h-full bg-blue-300 top-0 text-black "
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <div className="bg-blue-300 text-black font-bold py-[8px] px-[24px]">
                  <p className="text-bold">Mục lục văn bản</p>
                </div>
              </div>
              <div className="w-full pb-[24px] bg-[#f0f2f5]">
                <div className="pt-[16px] mx-[24px] flex ">
                  <div className="w-[12.5%] px-[5px]">
                    <Input
                      placeholder="Tác giả"
                      className="text-[12px] rounded-[8px] border-[2px]"
                    ></Input>
                  </div>
                  <div className="w-[12.5%] px-[5px]">
                    <Input
                      placeholder="Số ký hiệu VB"
                      className="text-[12px] rounded-[8px] border-[2px]"
                    ></Input>
                  </div>
                  <div className="w-[12.5%] px-[5px]">
                    <Input
                      placeholder="Trích yếu VB"
                      className="text-[12px] rounded-[8px] border-[2px]"
                    ></Input>
                  </div>
                  <div className="w-[12.5%] px-[5px]">
                    <Input
                      placeholder="Ngày VB"
                      className="text-[12px] rounded-[8px] border-[2px]"
                    ></Input>
                  </div>
                  <div className="w-[12.5%] text-center px-[5px] flex">
                    <button className="rounded-[5px] h-[30px] flex justify-center w-full px-[16px] items-center text-[12px] font-medium custom-btn-search">
                      <div className="mr-[8px]">
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </div>
                      Tìm kiếm
                    </button>
                  </div>

                  <div className="w-[12.5%] text-white  text-center px-[5px]">
                    <form encType="multipart/form-data">
                      <label
                        className="flex justify-center items-center cursor-pointer w-auto h-[30px] bg-[#00f] custom-btn-add-file rounded-[5px] text-white hover:opacity-90 text-[12px]"
                        htmlFor="file-upload"
                      >
                        <i className="fa-solid fa-upload"></i>
                        <p className="ml-[8px]">Thêm văn bản</p>
                      </label>
                      <input
                        onClick={(ev) => {
                          ev.target.value = "";
                        }}
                        type="file"
                        id="file-upload"
                        name="file-upload"
                        className="hidden"
                        onChange={(ev) => {
                          setStateAddDoc(true);
                          setFileUploaded(Array.from(ev.target.files));
                        }}
                        accept="application/pdf"
                        multiple
                      ></input>
                    </form>
                  </div>
                  <div className="w-[12.5%] text-white text-center px-[5px] flex">
                    <button
                      onClick={() => scanToJpg()}
                      className="rounded-[5px] h-[30px] flex justify-center bg-red-500 w-full px-[4px] items-center text-[12px]"
                    >
                      Số hóa tài liệu
                    </button>
                  </div>

                  <div className="w-[12.5%] text-white text-center px-[5px] flex">

                    <button
                      className="rounded-[5px] h-[30px] flex justify-center bg-green-500 w-full px-[4px] items-center text-[12px]"
                      onClick={handleAddDocFromEoffice}
                    >
                      <div className="mr-[8px]">
                      </div>
                      Thêm VB từ EOFFICE
                    </button>
                  </div>
                  <div className="w-[12.5%] text-white text-center px-[5px] flex">

                    <button
                      className="rounded-[5px] h-[30px] flex justify-center bg-green-500 w-full px-[4px] items-center text-[12px]"
                      onClick={handleExportExcel}
                    >
                      <div className="mr-[8px]">
                        <i className="fa-solid fa-file-csv"></i>
                      </div>
                      Xuất Excel
                    </button>

                  </div>
                </div>
                <Table
                  fieldNames={TABLE_FIELDS}
                  fieldDatas={files}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <FixDoc
        pdfID={pdfID}
        pdfData={pdfData}
        pdfFile={pdfFile}
        setStateFixDoc={setStateFixDoc}
        stateFixDoc={stateFixDoc}
        API_PDF={pdfFileLink}
        fetchDocumentsOfFile={fetchDocumentsOfFile}
        govFileID={govFileID}
        fileData={fileData}
      />
      <AddDoc
        stateAddDoc={stateAddDoc}
        setStateAddDoc={setStateAddDoc}
        fileUploaded={fileUploaded}
        fetchDocumentsOfFile={fetchDocumentsOfFile}
        govFileID={govFileID}
        fileData={fileData}
      />
      <EOFFICE
        stateEoffice={stateEoffice}
        setStateEoffice={setStateEoffice}
        fetchDocumentsOfFile={fetchDocumentsOfFile}
        govFileID={govFileID}
      />
      <LoginEoffice
        open={openLoginEoffice}
        setOpen={setOpenLoginEoffice}
        setStateEoffice={setStateEoffice}
      />
    </>
  );
};
export default DocCategory;
