import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../constants/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { addUser, removeUser } from "../constants/redux/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Fixed typo

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const { firstName, lastName, photoUrl } = userDoc.data();
            dispatch(
              addUser({
                uid: user.uid,
                email: user.email,
                firstName,
                lastName,
                photoUrl,
              })
            );
          }

          // Redirect if already on sign-in or sign-up
          // if (
          //   location.pathname === "/sign-in" ||
          //   location.pathname === "/sign-up"
          // ) {
          //   navigate("/");
          // }
        } else {
          localStorage.removeItem("userToken");
          dispatch(removeUser());

          // Redirect only if not already on sign-in/sign-up page
          if (
            location.pathname !== "/sign-in" &&
            location.pathname !== "/sign-up"
          ) {
            navigate("/sign-in");
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    });

    return () => unSubscribe(); // Ensure proper cleanup
  }, [dispatch, navigate, location.pathname]); // Added location.pathname to dependencies

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
