import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../constants/redux/userSlice";
import { Link } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../constants/firebase/firebase";
import Cookies from "js-cookie";

const Navbar = () => {
  const user = useSelector((store) => store.user); // Access the user state
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      localStorage.removeItem("userToken"); // Clear token
      Cookies.remove("userToken");
      dispatch(removeUser()); // Clear user state
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          devTinder
        </Link>
      </div>
      <div className="flex-none gap-2 mr-10">
        {user && (
          <>
            <p className="font-semibold mr-2">
              {user.firstName + " " + user.lastName}
            </p>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Avatar"
                    src={
                      user.photoUrl
                        ? user.photoUrl
                        : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/edit-profile">Edit Profile</Link>
                </li>
                <li onClick={handleSignOut}>
                  <Link to="/sign-in">Logout</Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
