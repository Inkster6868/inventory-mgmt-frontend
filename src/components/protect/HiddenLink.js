import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";

/* We are going to use it in hoome page,, basically this is for showing the links in header on th homepage differently for the user who is loggedIn and differenlty for the one who is notLoggedIn */
export const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);     /* getting the state wheteher i am logged in or not  */

  if (isLoggedIn) {
    return <> {children}</>;
  }
  return null;
};

export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <> {children}</>;
  }
  return null;
};
