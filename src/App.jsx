import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";

// PAGES
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Explore from "./pages/Explore.jsx";
import CategorySellers from "./pages/CategorySellers.jsx";
import SellerProfile from "./pages/SellerProfile.jsx";
import BigScreen from "./ui/BigScreen.jsx";
import SmallScreen from "./ui/SmallScreen.jsx";
import ProfileEdit from "./pages/ProfileEdit.jsx";
//

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <SmallScreen>
            <Routes>
              {/* seller flow */}
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<Login />} />
            <Route path="/my-profile" element={<MyProfile />} />
            {/* protected route here */}
            <Route path="/my-profile/edit" element={<ProfileEdit/>} />

            {/* buyer flow * //use relative paths/ */}
            <Route path="/explore" element={<Explore />}/>
            <Route path="/explore/:catalog/:slug" element={<CategorySellers />} />
            <Route path="/seller/:username" element={<SellerProfile />} />

            {/* fallback route */}
            <Route path="*" element={<h1>404: Page Not Found</h1>} />
            </Routes>
          </SmallScreen>
          <BigScreen />            
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
