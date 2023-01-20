import React, { useState } from 'react'
import "../sidebar/Sidebar.scss";
import { HiMenuAlt3 } from "react-icons/hi";
import { SiMastodon } from "react-icons/si";
import Menu from "../../data/sidebar"
import SidebarItem from './SidebarItem';
import { useNavigate } from 'react-router-dom';




const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = React.useState(true)            /* here we are using usestate hook to keep a track of whether sidebar is opeened or not and then accordingly show the display layout to the users  */
    const toggle = () => setIsOpen(!isOpen);                 /* what we have done basically now is created a function which will keep changing its state to opposite of what it was before  */
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/")
    }

    return (
        <div className='layout'>
            <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }}>

                <div className="top_section">       {/* the top section which contains hamburger menu and the icon  */}
                    <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
                        <SiMastodon size={30} style={{ cursor: 'pointer' }}  onClick={goHome} />
                    </div>
                    <div className="bars" style={{ marginLeft: isOpen ? "100px" : "0px" }}>
                        <HiMenuAlt3 style={{ cursor: 'pointer' }} onClick={toggle} />
                    </div>
                </div>

                {Menu.map((item, index) => {       {/* calling the side bar item */}
                    return <SidebarItem key={index} item={item} isOpen={isOpen} />
                })}

            </div>
            <main style={{ paddingLeft: isOpen ? "230px" : "60px", transition: "all .5s" }} >
                {children}
            </main>
        </div>
    )
}

export default Sidebar