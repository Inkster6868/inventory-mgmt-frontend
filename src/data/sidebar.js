/* This is just a file we have created to keep the data under vision and a lil bit organised, so we use this file in the actual "Sidebas.js placed in the data folder" */
import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";

/* This 'menu' contains all the enteries of the sidebar,their icon,and the path we will go to on clicking them   */
const Menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Add Product",
    icon: <BiImageAdd />,
    path: "/add-product",
  },
  {
    title: "Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Report Bug",
    icon: <FaCommentAlt />,
    path: "/contact-us",
  },
];

export default Menu;
