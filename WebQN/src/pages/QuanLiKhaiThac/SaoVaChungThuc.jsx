import { Table } from "../../custom/Components/Table";

const DuyetSaoVaChungThucHoSo = () => {
  const fieldNames = [
    // Define your field names here
    {title: "Tiêu đề phiếu sao và chứng thực hồ sơ, tài liệu", width: 250 },
    {title: "Lí do", width: 250 },
    {title: "Duyệt", width: 80}
    // Add more field names as needed
  ];

  const fieldDatas = [
    {}
  ];

  return (
    <div className="w-full">
      <div className="w-full px-[24px] pb-[16px] bg-white flex justify-between">
        <p className="text-[20px] font-bold">Danh sách yêu cầu sao và chứng thực hồ sơ, tài liệu</p>
      </div>
      <Table fieldNames={fieldNames} fieldDatas={fieldDatas} isCheckBox={true} />
    </div>
  );
};

export default DuyetSaoVaChungThucHoSo;
