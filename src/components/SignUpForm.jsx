import React, { useState } from "react";
import InputField from "./InputField";
import { useNavigate } from "react-router";
import {
  getUserToken,
  registerUser,
} from "../constants/firebase/firebaseHooks";
import { useDispatch } from "react-redux";
import { addUser } from "../constants/redux/userSlice";
import Cookies from "js-cookie";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await registerUser(
        firstName,
        lastName,
        email,
        password,
        photoUrl
      );
      console.log("signup", user);

      const token = await getUserToken(user);
      if (token) {
        localStorage.setItem("userToken", token);
        Cookies.set("userToken", token);
        // Dispatch only serializable data
        const serializedUser = {
          uid: user.uid,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          photoUrl: user.photoURL,
        };
        console.log("seUp", serializedUser);

        dispatch(addUser(serializedUser));
        navigate("/");
      }
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="w-1/3 my-14  m-auto bg-base-300 p-5 rounded-lg ">
          <div className="mx-5">
            <h1 className="label-text font-bold text-3xl mb-5">Sign Up</h1>
            <InputField
              label="FirstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <InputField
              label="LastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="Photo Url"
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-active btn-primary w-80 max-w-xs mt-5">
              Sign Up
            </button>
            <p className="text-red-700 font-bold ">{error}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
