import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./pages/Login.jsx";
// PAGES
import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import SellersProfile from "./pages/SellersProfile.jsx";
import Explore from "./pages/Explore.jsx";
import Sellers from "./pages/Sellers.jsx";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/profile" element={<SellersProfile />} />
            <Route path="/signIn" element={<Login />} />
            <Route
              path="/explore"
              element={<Explore setSelectedCategory={setSelectedCategory} />}
            />
            <Route
              path="/sellers"
              element={<Sellers selectedCategory={selectedCategory} />}
            />
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
