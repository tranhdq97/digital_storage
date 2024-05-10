/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import QuocHuy from '../../../assets/img/QuocHuy.png'
import Expand from "react-expand-animated"
import { TABS_SIDEBAR } from "../../../storage/Storage"
import { useSelector } from "react-redux"
import { Spin } from "antd"


const SideBar = ({ sideBarWidth }) => {
    const permissions = useSelector(state => state.userPermission)
    const locaiton = useLocation()
    const [sidebarTabs, setSidebarTabs] = useState(TABS_SIDEBAR)
    const transitions = ["height"];

    const toggleExpand = (key) => {
        const cur = sidebarTabs.map((tab) => {
            if (tab.key === key)
                return { ...tab, isExpand: !tab['isExpand'] }
            if (tab.numChildTabs > 0)
                tab.childTabs.map((child) => {
                    if (child.key === key) {
                        child['isExpand'] = !child['isExpand']
                    }
                    return child
                })
            return tab
        })
        setSidebarTabs(cur)
    }

    const [currentTab, setCurrentTab] = useState(locaiton.pathname.toLocaleLowerCase());

    console.log("permissions", permissions);
    return (
        permissions === null ? <Spin /> :
        <>
            <div className={`overflow-auto overflow-x-hidden transition-all duration-300 ${sideBarWidth === 250 ? "w-[280px]" : "w-[80px]"} fixed left-0 top-0 shadow h-full bg-[#302f2ff4] pb-[20px]`}>

                <Link to='/' className={`${sideBarWidth === 250 ? 'mx-[16px]' : 'mx-[8px]'} border-[#b7b7b7] flex justify-center my-[16px] pb-[32px] border-b-[2px] border-solid `}>
                    <img className="w-[70px]" alt="Quoc Huy" src={QuocHuy} />
                </Link>
                {sidebarTabs.map((tab) => {
                    return (
                        (tab.number == 0 || permissions.findIndex((permission) => permission==tab.number) >= 0 || permissions.length === 1) &&
                        // eslint-disable-next-line react/jsx-key
                        <div>
                            {
                                <Link to={tab.to} onClick={() => { setCurrentTab(tab.key) }} key={tab.key} className={`
                        block ${sideBarWidth === 250 ? 'sidebar-items--large ' : 'sidebar-items--small '} 
                        `}>
                                    <div className={`${sideBarWidth !== 250 ? "justify-center" : ""} hover:bg-[#aaaaaa25] border-[1.5px] border-transparent hover:border-cyan-400 hover:text-white rounded-[8px] flex relative ${tab.key === currentTab ? "sidebar-items--active" : ""}`} onClick={() => toggleExpand(tab.key)}>
                                        <div className="flex items-center mx-[10px] w-[16px]">
                                            <span dangerouslySetInnerHTML={{ __html: tab.icon }} />
                                        </div>

                                        {sideBarWidth === 250 && <p>{tab.title}</p>}

                                        <div className="flex items-center mx-[10px] w-[16px]">
                                            {tab.numChildTabs > 0 && sideBarWidth === 250 &&
                                                <span className="absolute right-[8px]">
                                                    {tab.isExpand === false ? <i className="fa-solid fa-chevron-down"></i> : <i className="fa-solid fa-chevron-up"></i>}
                                                </span>

                                            }
                                        </div>
                                    </div>
                                    {sideBarWidth === 250 && tab.numChildTabs > 0 &&
                                        <Expand open={tab.isExpand} duration={200} transitions={transitions}>
                                            {tab.numChildTabs > 0 &&
                                                <div className="flex ml-[30px] flex-col">
                                                    {tab.childTabs.map((child) => {
                                                        if (child.numChildTabs === undefined){
                                                            return (
                                                                (permissions.findIndex((permission) => permission==child.number) >= 0 || permissions.length === 1) &&
                                                                <Link key={child.key} className="text-[14px] px-[8px] hover:bg-[#aaaaaa25] border-[1.5px] border-transparent hover:border-cyan-400 hover:text-white rounded-[8px] block mt-[8px] text-wrap-normal" to={child.to} >
                                                                    {sideBarWidth === 250 && <span>{child.title}</span>}
                                                                </Link>
                                                            )}
                                                        else {
                                                            return (
                                                                (permissions.findIndex((permission) => permission==child.number) >= 0 || permissions.length === 1) &&
                                                                <Link to={child.to} onClick={() => { setCurrentTab(child.key) }} key={child.key} className={`block ${sideBarWidth === 250 ? 'sidebar-items--large' : 'sidebar-items--small'} m-0
                        `}>
                                                                    <div className={`${sideBarWidth !== 250 ? "justify-center" : ""} hover:bg-[#aaaaaa25]  px-[8px] border-[1.5px] border-transparent items-center justify-between hover:text-white hover:border-cyan-400 rounded-[8px] flex relative ${child.key === currentTab ? "sidebar-items--active" : ""}`} onClick={() => toggleExpand(child.key)}>
                                                                        {sideBarWidth === 250 && <p>{child.title}</p>}
                                                                        {child.numChildTabs > 0 && sideBarWidth === 250 &&
                                                                            <span className="inline-block">
                                                                                {child.isExpand === false ? <i className="fa-solid fa-chevron-down"></i> : <i className="fa-solid fa-chevron-up"></i>}
                                                                            </span>
                                                                        }
                                                                    </div>
                                                                    <Expand open={child.isExpand} duration={200} transitions={transitions}>
                                                                        <div className="flex flex-col ml-[12px]">
                                                                            {child.childTabs.map((childd) => {
                                                                                return (
                                                                                    (permissions.findIndex((permission) => permission==childd.number) >= 0 || permissions.length === 1) &&
                                                                                    <Link key={childd.key} className="text-[14px] px-[8px] hover:bg-[#aaaaaa25] border-[1.5px] border-transparent  hover:text-white hover:border-cyan-400 rounded-[8px] block mt-[8px] text-wrap-normal" to={childd.to} >
                                                                                        {sideBarWidth === 250 && <span>{childd.title}</span>}
                                                                                    </Link>
                                                                                )
                                                                            })}


                                                                        </div>
                                                                    </Expand>
                                                                </Link>
                                                            )
                                                        }
                                                    })}
                                                </div>
                                            }
                                        </Expand>
                                    }
                                </Link>
                            }
                        </div>
                    )
                })
                }
            </div>
        </>
    )
}

export default SideBar
