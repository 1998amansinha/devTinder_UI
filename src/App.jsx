import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
import Body from "./components/Body";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="sign-in" element={<SignInForm />} />
          <Route path="sign-up" element={<SignUpForm />} />
          <Route path="feed" element={<Feed />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
