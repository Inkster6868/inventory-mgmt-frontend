import React, { useState } from 'react';
import {MdKeyboardArrowRight} from "react-icons/md";
import { NavLink } from 'react-router-dom';

const activeLink =({isActive})=>(isActive ? "active" :"link");

/* isActive is a properrty provided by the NavLink itself. basically we destructure the property and check whether it is active or not and then accordingly give class names to the childrens*/
const activeSublink =({isActive})=>(isActive ? "active" :"link")

const SidebarItem = ({item,isOpen}) => {                                /* now we will be returning the components based upon various conditions of the sideBar component states */
        const [expandMenu, setExpandMenu] = useState(false)             /* monitor the state of the 'arrow' that will display down the list of childrens, so we will render differently according to the state */
  if(item.childrens){                                                 /* first is, if the component has childrens that means any sub components to display */
        return (
        <div className={expandMenu ? "sidebar-item s-parent open" : "sidebar-item s-parent"}>
            <div className="sidebar-title"> 
                <span>
                    {item.icon &&  <div className='icon' >{item.icon}</div>}   {/* if the icon exists then show it */}
                    {isOpen &&  <div>{item.title}</div>}  {/* if the sidebar is open then only show the title */}
                </span>

                {isOpen && <MdKeyboardArrowRight size={25} className="arrow-icon" onClick={()=> setExpandMenu(!expandMenu) }/>}
            </div>
                <div className="sidebar-content">
                    {item.childrens.map((child,index)=>{
                        return(
                            <div key={index} className="s-child">
                                <NavLink to={child.path} className={activeSublink}> 
                                <div className="sidebar-item">
                                    <div className="sidebar-title">
                                    <span> 
                                        {child.icon &&  <div className='icon'>{child.icon}</div>}
                                        {isOpen &&  <div>{child.title}</div>}
                                    </span>
                                    </div>
                                </div>
                                 </NavLink>
                            </div>
                        )
                    })}
                </div>           {/* for the childrens*/}

        </div>      /* if the menu is expanded then properties of open class will also be applied, if not then only of the remaining two  */
        )}

else{
        return (
            <NavLink to={item.path} className={activeLink}> 
            <div className="sidebar-item s-parent">
                <div className="sidebar-title">
                <span> 
                    {item.icon &&  <div className='icon'>{item.icon}</div>}
                    {isOpen &&  <div>{item.title}</div>}
                </span>
                </div>
            </div>
             </NavLink>
        )
  }
}

export default SidebarItem