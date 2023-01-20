import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../components/Card/Card";
import { SpinnerImg } from "../../components/loader/Loader";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { SET_NAME, SET_USER } from "../../redux/features/auth/authSlice";
import { getUser } from "../../services/authService";
import "./Profile.scss";

const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);   /* initially there will be no data in the profile, so we set it to null, also there  is no request happening so we set the isLoading variable to false */
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Getting use");
    setIsLoading(true);  /* set it to true because now i will be making a req to the backend for getting the user data     */
    async function getUserData() {
      const data = await getUser();    /* getting the data from the backend using the jwt token at the baceknd to verify the user, and then we are storing the response here */
      console.log(data);

      setProfile(data);          /* once we receive the data from the backend we set the profile and make the loadingstate as false */
      setIsLoading(false);
      await dispatch(SET_USER(data));   /* now we set the state of the user in the authslice */
      await dispatch(SET_NAME(data.name));   /* also we set the name into the local storage so that we do not have to make an API call again and again to the server   */
    }
    getUserData();
  }, [dispatch]);

  return (
    <div className="profile --my2">
      {isLoading && <SpinnerImg />}      {/* if the isLoading is true then spinner img */}
      <>  
          {/* if the loading is false and the profile has not loaded that means something is wrong, if not so then we display the profile to the user */}
        {!isLoading && profile === null ? (               
          <p>Something went wrong, please reload the page...</p> 
        ) : (
          <Card cardClass={"card --flex-dir-column"}>
            <span className="profile-photo">
              <img src={profile?.photo} alt="profilepic" />
            </span>
            <span className="profile-data">
              <p>
                <b>Name : </b> {profile?.name}
              </p>
              <p>
                <b>Email : </b> {profile?.email}     {/* chaining methods  */}
              </p>
              <p>
                <b>Phone : </b> {profile?.phone}
              </p>
              <p>
                <b>Bio : </b> {profile?.bio}
              </p>
              <div>
                <Link to="/edit-profile">
                  <button className="--btn --btn-primary">Edit Profile</button>   {/* link this button to the edit profile option */}
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  );
};

export default Profile;
