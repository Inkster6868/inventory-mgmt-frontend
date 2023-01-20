import React, { useState } from 'react'
import styles from "../auth/auth.module.scss"
import {TiUserAddOutline} from "react-icons/ti";
import Card from '../../components/Card/Card';
import { useDispatch } from 'react-redux';
import { Link , useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser, validateEmail } from '../../services/authService';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';


const initialState={
  name:"",
  email:"",
  password:"",
  password2:""          /* in the backend we will only be receiving only the first3 fields, then password2 is the confirmpassword fiels, that we will just use to check whether use knows what he is entering or not  */
}

const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState(initialState)

  const {name,email,password,password2}=formData

  const handleInputChange=(e)=>{                         /* the e here is the argument which refers to event on which it is being called */
      const {name,value}=e.target;                  /* e.target gets all the properties of the html tag where it is called so we destructure the name and value properties which the user will enter, on every change this function will be called and the last written entry will be stored in the "value" property */
      setFormData({...formData, [name]:value});  /* the "name" and value field in every html tag is different check below, so every enitity if changed will correspondingly get its value changed here */
  };


  const register = async (e) => {       /* this is the onSubmit action that is calling this function,so we prevent its default behaviour which is  */
    e.preventDefault();
                                                     
    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {   /* if the incoming info passed all the checks then we store all the info */
      name,
      email,
      password,
    };

    setIsLoading(true);        /* set this to true, meaning waiting for the response from backend */
    try {
      const data = await registerUser(userData);
      console.log(data); 
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));     /* this data.name is actually comning from the "res" that backend is sending */
      navigate("/dashboard");
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
        <TiUserAddOutline size={35} color="#999"/>  {/* ICON */}
      </div>
      <h2>Register</h2> 
    

      <form onSubmit={register}>
        <input type="text" placeholder="Name" required name="name" value={name} onChange={handleInputChange} />   {/* required will say the user to fill this field before submitting the form */}
        <input type="email" placeholder="Email" required name="email"  value={email} onChange={handleInputChange}/>   {/* required will say the user to fill this field before submitting the form */}
        <input type="password" placeholder="Password" required name="password" value={password} onChange={handleInputChange}/>   {/* required will say the user to fill this field before submitting the form */}
        <input type="password" placeholder="Confirm Password" required name="password2" value={password2} onChange={handleInputChange}/>   {/* required will say the user to fill this field before submitting the form */}
        <button type='submit' className='--btn --btn-primary --btn-block'>Register</button>
    </form>

    <span className={styles.register}>
      <Link to='/'>Home</Link>
      <p>&nbsp; Already have an account?  &nbsp;</p>
      <Link to='/login'>Login</Link>
    </span>
      </div>
    </Card>
    </div>
  )
}

export default Register;