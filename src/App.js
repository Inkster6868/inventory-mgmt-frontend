import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddProduct from "./pages/addProduct/AddProduct";
import ProductDetail from "./components/product/productDetail/ProductDetail";
import EditProduct from "./pages/editProduct/EditProduct";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Contact from "./pages/contact/Contact";


axios.defaults.withCredentials=true;     /* so by default we set it to tru meaning every req will now receive the cookie*/

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {      /* what this hook will do is basically whenever the user refresehes the page, afer the first render this hook will run and get the login status, this will be repeadted everytime te user refreshes the page , so we get the login status through backend so that the user doesnt seem logged out to us and keep his state preserved   */
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);                   

  return (
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />        {/* the path here specifies the url in the browser,when the url is '/' meaning the homepage it will render this element */}
        <Route path="/login" element={<Login />} />        {/* the path here specifies the url in the browser,when the url is '/login' meaning the homepage it will render this element */}
        <Route path="/register" element={<Register />} />        {/* the path here specifies the url in the browser,when the url is '/register' meaning the homepage it will render this element */}
        <Route path="/forgotpassword" element={<Forgot />} />        {/* the path here specifies the url in the browser,when the url is '/forgotpassword' meaning the homepage it will render this element */}
        <Route path="/resetpassword/:resetToken" element={<Reset />} />        {/* the path here specifies the url in the browser,when the url is '/resetpassword/:resetToken' meaning the homepage it will render this element */}

        <Route path="/dashboard" element={                                      
        <Sidebar>
        <Layout>        {/* agr dashboard per ho toh ye display kro */}
          <Dashboard/>        {/* ok now here we have done nesting of parent->child, so the sidebarcomponent(parent) accepts {children}, sidebar will reserve the left corner for itself and the rest part will be given to {children},, now in children we pass the 'layout'component, which also accepts {children}, it will reserve 'top' and 'botom' for 'header' and 'footer' components and the center part for the {children}  now in its children we will pass the dashboard component which will contain the center part  */}
        </Layout>
        </Sidebar>
        } />


         <Route path="/add-product" element={                                      
        <Sidebar>
        <Layout>                        {/* agr add-product per ho toh yr display kro, ismai center mai humne add-product vala component render krdiya bas aur kuch ni */}
          <AddProduct/>        {/* ok now here we have done nesting of parent->child, so the sidebarcomponent(parent) accepts {children}, sidebar will reserve the left corner for itself and the rest part will be given to {children},, now in children we pass the 'layout'component, which also accepts {children}, it will reserve 'top' and 'botom' for 'header' and 'footer' components and the center part for the {children}  now in its children we will pass the dashboard component which will contain the center part  */}
        </Layout>
        </Sidebar>
        } />   

         <Route path="/product-detail/:id" element={                                      
        <Sidebar>
        <Layout>                        {/* agr add-product per ho toh yr display kro, ismai center mai humne add-product vala component render krdiya bas aur kuch ni */}
          <ProductDetail/>        {/* ok now here we have done nesting of parent->child, so the sidebarcomponent(parent) accepts {children}, sidebar will reserve the left corner for itself and the rest part will be given to {children},, now in children we pass the 'layout'component, which also accepts {children}, it will reserve 'top' and 'botom' for 'header' and 'footer' components and the center part for the {children}  now in its children we will pass the dashboard component which will contain the center part  */}
        </Layout>
        </Sidebar>
        } />   

         <Route path="/edit-product/:id" element={                                      
        <Sidebar>
        <Layout>                        {/* agr add-product per ho toh yr display kro, ismai center mai humne add-product vala component render krdiya bas aur kuch ni */}
          <EditProduct/>        {/* ok now here we have done nesting of parent->child, so the sidebarcomponent(parent) accepts {children}, sidebar will reserve the left corner for itself and the rest part will be given to {children},, now in children we pass the 'layout'component, which also accepts {children}, it will reserve 'top' and 'botom' for 'header' and 'footer' components and the center part for the {children}  now in its children we will pass the dashboard component which will contain the center part  */}
        </Layout>
        </Sidebar>
        } />  


         <Route path="/profile" element={                                      
        <Sidebar>
        <Layout>                        {/* agr add-product per ho toh yr display kro, ismai center mai humne add-product vala component render krdiya bas aur kuch ni */}
          <Profile/>        {/* ok now here we have done nesting of parent->child, so the sidebarcomponent(parent) accepts {children}, sidebar will reserve the left corner for itself and the rest part will be given to {children},, now in children we pass the 'layout'component, which also accepts {children}, it will reserve 'top' and 'botom' for 'header' and 'footer' components and the center part for the {children}  now in its children we will pass the dashboard component which will contain the center part  */}
        </Layout>
        </Sidebar>
        } />  


         <Route path="/edit-profile" element={                                      
        <Sidebar>
        <Layout>                        {/* agr add-product per ho toh yr display kro, ismai center mai humne add-product vala component render krdiya bas aur kuch ni */}
          <EditProfile/>        {/* ok now here we have done nesting of parent->child, so the sidebarcomponent(parent) accepts {children}, sidebar will reserve the left corner for itself and the rest part will be given to {children},, now in children we pass the 'layout'component, which also accepts {children}, it will reserve 'top' and 'botom' for 'header' and 'footer' components and the center part for the {children}  now in its children we will pass the dashboard component which will contain the center part  */}
        </Layout>
        </Sidebar>
        } />  

         <Route path="/contact-us" element={                                      
        <Sidebar>
        <Layout>                        {/* agr add-product per ho toh yr display kro, ismai center mai humne add-product vala component render krdiya bas aur kuch ni */}
          <Contact/>        {/* ok now here we have done nesting of parent->child, so the sidebarcomponent(parent) accepts {children}, sidebar will reserve the left corner for itself and the rest part will be given to {children},, now in children we pass the 'layout'component, which also accepts {children}, it will reserve 'top' and 'botom' for 'header' and 'footer' components and the center part for the {children}  now in its children we will pass the dashboard component which will contain the center part  */}
        </Layout>
        </Sidebar>
        } />   
      </Routes>
    </BrowserRouter>
  );
}

export default App;
