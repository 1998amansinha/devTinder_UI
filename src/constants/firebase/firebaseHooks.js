import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import Cookies from "js-cookie";

export const registerUser = async (
  firstName,
  lastName,
  email,
  password,
  photoUrl
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    if (user) {
      // Save user details to FireStore
      try {
        await setDoc(doc(db, "users", user.uid), {
          firstName,
          lastName,
          photoUrl,
          uid: user.uid,
        });
      } catch (error) {
        throw new Error("Error saving user to Firestore: " + error.message);
      }
    }
    return user;
  } catch (error) {
    throw new Error("Error registering user: " + error.message);
  }
};

export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw new Error("Error signing in user: " + error.message);
  }
};

export const getUserToken = async (user) => {
  try {
    const token = await user.getIdToken();
    Cookies.set("userToken", token, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
    return token;
  } catch (error) {
    throw new Error("Error getting token: " + error.message);
  }
};
