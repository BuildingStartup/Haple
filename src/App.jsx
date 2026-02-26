import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// PAGES
import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import SellersProfile from "./pages/SellersProfile.jsx";
import Explore from "./pages/Explore.jsx";
import CategorySellers from "./pages/CategorySellers.jsx";
import Profile from "./pages/Profile.jsx";
//
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/sellersProfile" element={<SellersProfile />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/:categoryName" element={<CategorySellers />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/sellersProfile" element={<SellersProfile />} />
            <Route path="/signIn" element={<Login />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 20px",
            backgroundColor: "white",
            color: "black",
          },
        }}
      />
    </>
  );
}

export default App;
