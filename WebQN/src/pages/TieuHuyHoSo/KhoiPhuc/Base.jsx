/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input} from "antd";
import { Table } from "src/custom/Components/Table";
import { Link } from "react-router-dom";


const FIELDS_TABLE = [
    { title: "Tên quyết định", key: "name", width: "150%" },
    { title: "Ngày quyết định", key: "date", width: "100%" },
    { title: "Cơ quan / Đơn vị lập quyết định", key: "organ", width: "100%" },
    { title: "Trạng thái", key: "state", width: "100%" },
    { title: "Chức năng", key: "function", width: "120px" },
];


const BasePage = ({
    parent,
    current,
    plan,
    isLoading,
    btnActions = null,
    setSelectedPlan = null,
}) => {

    const BUTTON_ACTIONS = [
        {
            title: "Tìm kiếm",
            btn_class_name: "custom-btn-search",
            icon: <i className="fa-solid fa-magnifying-glass"></i>,
        }
    ];


    return (
        <div className="w-full">
            <div className="w-full px-[24px] pt-[12px] pb-[16px] bg-white">
                <p className="text-[14px] font-300 cursor-pointer ">
                    <span className="text-[rgba(0,0,0,.45)]">
                        <Link to={parent.link}>
                            {parent.title} / &nbsp;
                        </Link>
                    </span>
                    <span>
                        <Link to={parent.link}>
                            {current.title}
                        </Link>
                    </span>
                </p>
            </div>

            <div className="w-full px-[24px] pb-[16px] bg-white flex justify-between">
                <p className="text-[20px] font-bold ">{current.title}</p>
            </div>

            <div className="mt-[16px] mx-[24px] flex ">
                <div className="w-[11.11111%] px-[5px]">
                    <Input
                        allowClear
                        name="title"
                        placeholder="Tìm kiếm tên quyết định"
                        className="rounded-md border-[0.1rem] text-[12px] w-full px-[12px] py-[6px] truncate h-[32px] flex items-center"
                    ></Input>
                </div>
                <div className="w-[11.11111%] px-[5px]">
                    <Input
                        name="start_date"
                        placeholder="Năm"
                        type="text"
                        onBlur={(e) => (e.target.type = "text")}
                        className="rounded-md border-[0.1rem] text-[12px] w-full px-[12px] py-[6px] truncate h-[32px]"
                    ></Input>
                </div>
                <div className="w-[11.11111%] px-[5px]">
                    <Input
                        name="end_date"
                        placeholder="Cơ quan đơn vị"
                        type="text"
                        onBlur={(e) => (e.target.type = "text")}
                        className="rounded-md border-[0.1rem] text-[12px] w-full px-[12px] py-[6px] truncate h-[32px]"
                    ></Input>
                </div>
                {BUTTON_ACTIONS.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="w-[11.11111%] text-white text-center px-[5px] rounded-[5px] flex"
                        >
                            <Button
                                onClick={item.onClick}
                                className={`rounded-[5px] flex justify-center bg-[#00f] w-full px-[12px] py-[6px] text-[12px] text-white items-center ${item.btn_class_name}`}
                            >
                                <div className="mr-[8px]">{item.icon}</div>
                                {item.title}
                            </Button>
                        </div>
                    );
                })}
                {btnActions && btnActions.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="w-[11.11111%] text-white text-center px-[5px] rounded-[5px] flex"
                        >
                            <Button
                                onClick={item.onClick}
                                className={`rounded-[5px] flex justify-center bg-[#00f] w-full px-[12px] py-[6px] text-[12px] text-white items-center ${item.btn_class_name}`}
                            >
                                <div className="mr-[8px]">{item.icon}</div>
                                {item.title}
                            </Button>
                        </div>
                    );
                })}
            </div>

            <Table
                setStateCheckBox={setSelectedPlan}
                fieldNames={FIELDS_TABLE}
                fieldDatas={plan}
                isLoading={isLoading}
                isCheckBox={true}
            />
        </div>
    );
};

export default BasePage;
