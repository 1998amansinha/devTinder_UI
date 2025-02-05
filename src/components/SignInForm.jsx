import React, { useState } from "react";
import { useNavigate } from "react-router";
import { db } from "../constants/firebase/firebase";
import InputField from "./InputField";
import { getUserToken, signInUser } from "../constants/firebase/firebaseHooks";
import { useDispatch } from "react-redux";
import { addUser } from "../constants/redux/userSlice";
import { doc, getDoc } from "firebase/firestore";
import Cookies from "js-cookie";

const SignInForm = () => {
  const [email, setEmail] = useState("1998amansinha@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [error, setError] = useState("");
  const naviate = useNavigate();
  const dispatch = useDispatch();

  const handleSignInButton = async (e) => {
    e.preventDefault();
    try {
      const user = await signInUser(email, password);
      const token = await getUserToken(user);
      if (token) {
        localStorage.setItem("userToken", token);
        Cookies.set("userToken", token);
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const { firstName, lastName, photoUrl } = userDoc.data();
          const serializedUser = {
            uid: user.uid,
            firstName,
            lastName,
            photoUrl,
            email: user.email,
          };
          dispatch(addUser(serializedUser));
          console.log("se", serializedUser);
        }

        naviate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-1/3 my-14  m-auto bg-base-300 p-5 rounded-lg">
      <div className="mx-5">
        <h1 className="label-text font-bold text-3xl mb-5">Sign In</h1>
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn btn-active btn-primary w-80 mt-5"
          onClick={handleSignInButton}
        >
          Sign In
        </button>
        <p>{error}</p>
      </div>
    </div>
  );
};

export default SignInForm;
