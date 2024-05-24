import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/config.index";

const AuthContext = createContext<any>(undefined);

const AuthContextWrapper = (props: any) => {
  const [user, setUser] = useState(null);
  //user will be an object {user_id, username, email}
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  }; // not in use yet, to remove token from local storage

  //sends a login request, if sucessful, store the token, update state and vaigate to the articles page
  const handleLogin = async (username: any, password: any) => {
    try {
      const response = await axios.post(`${BASE_URL}users/login`, {
        username,
        password,
      });
      if (response.status === 200) {
        //if logged in successfully, store the token on local storage
        localStorage.setItem("authToken", response.data.token);
        setIsLoggedIn(true);
        setUser(response.data.currentUser);
        navigate("/article");
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.response?.data?.errorMessage);
    }
  };

  //check if a token is stored in local storage & verifies it
  // updates state based on token validity
  // navigate to homepage if token is valid
  const authenticateUser = async () => {
    //grab the token that was previously stored and named "authToken" in login component
    const tokenInStorage = localStorage.getItem("authToken");
    setIsLoading(false);
    //when login successed, there's a token, else
    if (tokenInStorage) {
      try {
        //check if the token format is valid "Bearer with the backend middleware
        const response = await axios.get(`${BASE_URL}users/verify`, {
          headers: {
            authorization: `Bearer ${tokenInStorage}`,
          },
        });
        //if it's all good, the response.data is token status + the currentUser
        setIsLoggedIn(true);
        setUser(response.data.currentUser);
      } catch (error) {
        console.error(error);
        setIsLoggedIn(false);
        setUser(null);
        navigate("/");
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
      navigate("/");
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []); // once when the authenticateuser component mounts
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLoggedIn,
        handleLogout,
        handleLogin,
        errorMessage,
      }}
    >
      {props.children} // wraps children component to provide authentication
      state and functions
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextWrapper };
