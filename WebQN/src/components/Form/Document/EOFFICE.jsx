/* eslint-disable react-hooks/exhaustive-deps */
import "react-confirm-alert/src/react-confirm-alert.css";
import { useState } from "react";
import { Table } from "../../../custom/Components";
import { FaSearch } from "react-icons/fa";
import "./EOFFICEstyle.css";
import { useEffect } from "react";
import DocumentAPIService from "src/service/api/DocumentAPIService";
import Attachment from "./Attachment";
import { Button } from "antd";
import LoginEoffice from "./LoginEoffice";

const TABLE_FIELDS = [
  { title: "Cơ quan ban hành", width: "100%", key: 'coQuanBanHanh' },
  { title: "Số ký hiệu", width: "100%", key: 'soKihieu' },
  { title: "Trích yếu", width: "200%", key: 'trichYeu' },
];

const EOFFICE = ({
  govFileID,
  setStateEoffice,
  stateEoffice,
  fetchDocumentsOfFile
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const [idAttachment, setIdAttachment] = useState(null);
  const [stateAttachment, setStateAttachment] = useState(false);
  const [date, setDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [param, setParam] = useState(null);
  const [openLoginEoffice, setOpenLoginEoffice] = useState(false);

  const handleClickDocument = (id, date) => {
    setIdAttachment(id);
    setDate(date);
    setStateAttachment(true);
  }
  const getDoc = async (page, param) => {
    if (!stateEoffice) return;
    setIsLoading(true);
    const docs = await DocumentAPIService.getEofficeDoc(page, param);
    setIsLoading(false);

    if (!docs) {
      return setDataTable([]);
    }
    setDataTable(docs.map((doc) => {
      return {
        id: doc.id,
        coQuanBanHanh: <p className="cursor-pointer" onClick={() => handleClickDocument(doc.id, doc.ngayVanBan)}>{doc.coQuanBanHanh}</p>,
        soKihieu: doc.soKihieu,
        trichYeu: doc.trichYeu,
      }
    }));
  }

  useEffect(() => {
    getDoc(1);
  }, [stateEoffice])

  const handleNextPage = async () => {
    setCurrentPage(currentPage + 1);
    await getDoc(currentPage + 1, param);
  }

  const handlePreviousPage = async () => {
    setCurrentPage(currentPage - 1);
    await getDoc(currentPage - 1, param);
  }

  const handleChangeAccount = () => {
    setOpenLoginEoffice(true);
  }

  const handleSearch = async (e) => {
    const value = e.target.value.trim();
    setParam(value);
    if (e.key === 'Enter') {
      setCurrentPage(1);
      await getDoc(currentPage, value);
    }
  }

  return (
    <>
      {stateEoffice && (
        <div className="overflow-y-hidden fixed top-0 right-0 bottom-0 left-0 h-full w-full z-[500] bg-[rgba(0,0,0,.45)]">
          <div className="relative  h-[calc(100vh)] top-[20px] pb-[30px] ">
            <div className="h-full relative overflow-y-scroll w-[calc(100vw-80px)] my-0 mx-auto bg-[#f0f2f5]">
              <div className="relative">
                <button
                  onClick={() => setStateEoffice(false)}
                  className="text-[20px] absolute right-0 w-[40px] h-full bg-gray-500 top-[10px] text-black font-medium "
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              <div className="w-full h-full  py-[24px] bg-[#f0f2f5]">
                <div className="flex h-full">

                  <div className="ml-[24px] h-full w-[100%]">
                    <div className="pt-[12px] mx-[24px] flex justify-between">
                      <div className="flex w-[600px]">
                        <div className="input-wrapper">
                          <FaSearch id="search-icon" />
                          <input
                            className="text-[14px]"
                            placeholder="Tìm kiếm ..."
                            onKeyDown={handleSearch}
                          />
                        </div>
                      </div>

                    </div>
                    <div className="mt-[16px]">
                      <div className="flex justify-between items-center">
                        <h2 className="text-[20px] pl-[24px] font-medium">
                          Văn bản, Tài liệu
                        </h2>
                        <div className="flex justify-center mt-4 items-center pr-[24px]">
                          <Button
                            onClick={handlePreviousPage}
                            className="mr-[8px]"
                            disabled={currentPage === 1}
                          >
                            Previous
                          </Button>
                          <p className="text-gray-800 font-bold">{currentPage}</p>
                          <Button
                            onClick={handleNextPage}
                            className="ml-[8px]"
                            disabled={dataTable.length < 20}
                          >
                            Next
                          </Button>
                        </div>
                        <div className="pr-[24px]">
                          <Button onClick={handleChangeAccount}>
                            Chuyển tài khoản
                          </Button>
                        </div>
                      </div>

                      <Table
                        isLoading={isLoading}
                        fieldNames={TABLE_FIELDS}
                        fieldDatas={dataTable}
                        headerBgColor="#ccc"
                      />


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Attachment
        fetchDocumentsOfFile={fetchDocumentsOfFile}
        date={date}
        govFileID={govFileID}
        id={idAttachment}
        state={stateAttachment}
        setState={setStateAttachment}
      />

      <LoginEoffice
        open={openLoginEoffice}
        setOpen={setOpenLoginEoffice}
      />
    </>
  );
};
export default EOFFICE;
