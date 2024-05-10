import { useSelector } from "react-redux";
import { HEADER_FIXED } from "src/service/key";
import Header from "../Header";

const Layout = ({ children }) => {
    const headerState = useSelector(state => state.header);
    const className = headerState !== HEADER_FIXED ? "mt-[114px]" : null;

    return (
        <div>
            <Header />
            <div className={className}>
                {children}
            </div>
        </div>
    );
}

export default Layout;
