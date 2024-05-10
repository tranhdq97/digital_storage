/* eslint-disable react-hooks/exhaustive-deps */
import "react-confirm-alert/src/react-confirm-alert.css";
import { useState } from "react";

import { Table } from "../../../custom/Components";
import { FaSearch } from "react-icons/fa";
import "./EOFFICEstyle.css";
import { useEffect } from "react";
import DocumentAPIService from "src/service/api/DocumentAPIService";
import AddEofficeDoc from "./AddEofficeDoc";
import { notifyError } from "src/custom/Function";

const API_EOFFICE_DOWNLOAD_ATTACHMENT = import.meta.env.VITE_API_EOFFICE_DOWNLOAD_ATTACHMENT;

const TABLE_FIELDS = [
  { title: "Tên", width: "100%", key: 'name' },
  { title: "Thông tin", width: "200%", key: 'info' },
  { title: "Ngày tạo", width: "100%", key: 'createDate' },
];

const Attachment = ({
  id,
  state,
  setState,
  govFileID,
  date,
  fetchDocumentsOfFile
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const [stateDoc, setStateDoc] = useState(false);
  const [url, setUrl] = useState(null);
  const [nameDoc, setNameDoc] = useState('');

  const handleClickDoc = (id, name) => {
    if (!name.endsWith('.pdf')) {
      notifyError('Vui lòng chọn file pdf');
      return;
    }
    setUrl(API_EOFFICE_DOWNLOAD_ATTACHMENT + '/' + id);
    setNameDoc(name);
    setStateDoc(true);
  }
  useEffect(() => {
    const getDoc = async () => {
      if (!state) return;
      setIsLoading(true);
      const docs = await DocumentAPIService.getEofficeAttachmentByDocId(id);

      setDataTable(docs.map((doc) => {
        return {
          id: doc.id,
          name: <span className="cursor-pointer" onClick={() => handleClickDoc(doc.id, doc.name)}> {doc.name}</span>,
          info: doc.info[0],
          createDate: doc.createDate,
        }
      }))
      setIsLoading(false);
    }
    getDoc();
  }, [state])

  return (
    <>
      {state && (
        <div className="overflow-y-hidden fixed top-0 right-0 bottom-0 left-0 h-full w-full z-[500] bg-[rgba(0,0,0,.45)]">
          <div className="relative  h-[calc(100vh)] top-[20px] pb-[30px] ">
            <div className="h-full relative overflow-y-scroll w-[calc(100vw-80px)] my-0 mx-auto bg-[#f0f2f5]">
              <div className="relative">
                <button
                  onClick={() => setState(false)}
                  className="text-[20px] absolute right-0 w-[40px] h-full bg-gray-500 top-0 text-white font-medium "
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <div className="bg-gray-500 text-white font-bold py-[8px] px-[24px]">
                  <p className="text-bold">Thêm văn bản từ EOFFICE</p>
                </div>
              </div>

              <div className="w-full h-full  py-[24px] bg-[#f0f2f5]">
                <div className="flex h-full">

                  <div className="ml-[24px] h-full w-[100%]">
                    <div className="pt-[12px] mx-[24px] flex justify-between">
                      <div className="flex">
                        <div className="input-wrapper">
                          <FaSearch id="search-icon" />
                          <input
                            placeholder="Tìm kiếm ..."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-[16px]">
                      <h2 className="text-[20px] pl-[24px] font-medium">
                        Văn bản, Tài liệu
                      </h2>
                      <Table
                        isLoading={isLoading}
                        fieldNames={TABLE_FIELDS}
                        fieldDatas={dataTable}
                        headerBgColor="#ccc"
                      />

                      <AddEofficeDoc
                        fetchDocumentsOfFile={fetchDocumentsOfFile}
                        date={date}
                        name={nameDoc}
                        govFileID={govFileID}
                        stateAddDoc={stateDoc}
                        setStateAddDoc={setStateDoc}
                        docUrl={url}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};
export default Attachment;
