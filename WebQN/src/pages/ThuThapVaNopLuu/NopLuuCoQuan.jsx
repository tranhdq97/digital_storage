import BasePage from "../BasePage";

const newButtons = [
  {
    title: "In mục lục",
    btn_class_name: "custom-btn-export-excel",
    icon: <i className="fa-solid fa-file-excel"></i>,
  },
];

const NopLuuCoQuan = () => {
  const parent = [
    {
      title: "Thu thập và nộp lưu",
     //  link: "/thu-thap-va-nop-luu/tao-ke-hoach-thu-thap",
    },
  ];

  const current = {
    link: "/thu-thap-va-nop-luu/nop-luu-co-quan",
    title: "Nộp lưu cơ quan",
  };
  const filter = (files) => {
    const newFiles = [];
    for (const file of files) {
      if (file.state.props.children !== "Nộp lưu cơ quan") continue;
      newFiles.push(file);
    }

    return newFiles;
  };
  return (
    <BasePage
      parent={parent}
      current={current}
      addNewFile={true}
      filter={filter}
      newButtons={newButtons}
      eOffice={false}
    />
  );
};

export default NopLuuCoQuan;
