import { useState } from 'react'
import Header from './Header'
import SideBar from './Sidebar'
const Layout = ({ children }) => {
    const [sideBarWidth, setSideBarWidth] = useState(250)
    return (
        <>
            <Header sideBarWidth={sideBarWidth} setSideBarWidth={setSideBarWidth} />
            <SideBar sideBarWidth={sideBarWidth} />

            <div className={` transition-all duration-300 ${sideBarWidth === 250 ? "ml-[280px] w-[calc(100%-280px)]" : "ml-[80px] w-[calc(100%-80px)]"} mt-[20px] flex`}>
                <div className='w-full'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout;
