import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import Loader from "../../components/loader/Loader";
import { selectUser } from "../../redux/features/auth/authSlice";
import "./Profile.scss";
import { toast } from "react-toastify";
import { updateUser } from "../../services/authService";
import ChangePassword from "../../components/changePassword/ChangePassword";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser); /* this will have all the info about the current user  */
  const { email } = user;


  /*  so whenever we refrsh the page thr redux data is lost, so we built a function, that if email doesnt exits that possibly will be occuring when user refreshers the page and the state is lost ,  */
  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);  /* so we navigate to the '/profile' page */

  const initialState = {      /* we get the initial state of the user to the data that alrady exists with us */
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  };

  const [profile, setProfile] = useState(initialState);   /* and set the initial state here */
  const [profileImage, setProfileImage] = useState("");    /* initially there is no file image so we set it to "". */

  const handleInputChange = (e) => {      /* same function to handle the input change just assign the name with value, whenever user edits a value this function gets triggered and we set the value */
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const saveProfile = async (e) => {
    e.preventDefault();       /* pevent the default action of submiting */
    setIsLoading(true);
    try {                                       /* firstly if saving the data we need to handle the image upload if image is there in the req */
      // Handle Image upload
      let imageURL;                      /* so we built  function for it , first we check if it exists and if it is of the specified types given  */
      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();          /*  */
        image.append("file", profileImage);
        image.append("cloud_name", "dbzbsk3h5");     /* we need to enter these 3 info for uploading image to cloudinary. refer to video if cant remmeeber */
        image.append("upload_preset", "qqg7dbrr");

        // First save image to cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dbzbsk3h5/image/upload",
          { method: "post", body: image }   /* the method is post and insdie body we send the image  */
        );
        const imgData = await response.json();
        imageURL = imgData.url.toString();          /* we convert th URL to string that we get as a response */
      }

        // Save Profile
        const formData = {   
          name: profile.name,
          phone: profile.phone,
          bio: profile.bio,
          photo: profileImage ? imageURL : profile.photo,
        };

        const data = await updateUser(formData);
        console.log(data);
        toast.success("User updated");
        navigate("/profile");
        setIsLoading(false);
      
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="profile --my2">
      {isLoading && <Loader />}

      <Card cardClass={"card --flex-dir-column"}>
        <span className="profile-photo">
          <img src={user?.photo} alt="profilepic" />         {/* we want this to remain same as the one that we have currently, and do not change as the user just selects the image, so we wil choose user.imaeg that came the first/prev time */}
        </span>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile?.name}           
                onChange={handleInputChange}
              />        {/* if name exists then show that, or else onChange we call the handleInpurChange  */}
            </p>
            <p>
              <label>Email:</label>
              <input type="text" name="email" value={profile?.email} disabled />   {/* because i don't want user to change their email */}
              <br />
              <code>Email cannot be changed.</code>
            </p>
            <p>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={profile?.phone}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Bio:</label> 
              <textarea
                name="bio"
                value={profile?.bio}
                onChange={handleInputChange}
                cols="30"
                rows="10"
              ></textarea>
            </p>
            <p>
              <label>Photo:</label>
              <input type="file" name="image" onChange={handleImageChange} />
            </p>
            <div>
              <button className="--btn --btn-primary">Edit Profile</button>
            </div>
          </span>
        </form>
      </Card>
      <br />
      <ChangePassword />
    </div>
  );
};

export default EditProfile;
