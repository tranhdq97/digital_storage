import BasePage from "../BasePage";

const BaoCaoThongKe = () => {
    const parent = []

    const current = {
        link: "/bao-cao-va-thong-ke",
        title: "Báo cáo và thống kê"
    }

    return <BasePage
        parent={parent}
        current={current}
        showTable={false}
    />
}

export default BaoCaoThongKe;
