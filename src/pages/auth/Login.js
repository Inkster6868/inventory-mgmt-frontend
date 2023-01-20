import React, { useState } from "react"; 
import styles from "./auth.module.scss";
import { BiLogIn } from "react-icons/bi";
import Card from "../../components/Card/Card";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../../services/authService";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";


/* same logic as used for registering only the url is changed at the backend authentication part */
const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");    /* goto dashboard if authentication is successfull */
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>  {/* height of componenet */}
      {isLoading && <Loader/>}
    <Card>
      <div className={`${styles.form}`}> 
      <div className="--flex-center">
        <BiLogIn size={35} color="#999"/>   {/* ICON */}
      </div>
      <h2>Login</h2>

      <form onSubmit={login}>
        <input type="email" placeholder="Email" required name="email" value={email} onChange={handleInputChange}/>   {/* required will say the user to fill this field before submitting the form */}
        <input type="password" placeholder="Password" required name="password" value={password} onChange={handleInputChange}/>   {/* required will say the user to fill this field before submitting the form */}
        <button type='submit' className='--btn --btn-primary --btn-block'>Login</button>
    </form>
    <Link  to='/forgotpassword' >Forgot Password</Link>

    <span className={styles.register}>
      <Link to='/'>Home</Link>
      <p>&nbsp; Don't have an account?  &nbsp;</p>
      <Link to='/register'>Register</Link>
    </span>
      </div>
    </Card>
    </div>
  )
}

export default Login