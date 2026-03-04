import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ReactGA from "react-ga4";
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
import Error404 from "./ui/Error404.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
//analytics
import { Analytics } from '@vercel/analytics/react';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const IS_PRODUCTION = import.meta.env.PROD;

function GoogleAnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (!IS_PRODUCTION || !GA_MEASUREMENT_ID) return;

    ReactGA.send({
      hitType: "pageview",
      page: `${location.pathname}${location.search}${location.hash}`,
    });
  }, [location]);

  return null;
}

function App() {
  useEffect(() => {
    if (!IS_PRODUCTION || !GA_MEASUREMENT_ID) return;
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }, []);

  return (
    <>
      <BrowserRouter>
        {IS_PRODUCTION && <Analytics />}
        <GoogleAnalyticsTracker />
        <AuthProvider>
          <SmallScreen>
            <Routes>
            <Route path="/" element={<Home />} />
              {/* seller flow */}
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<Login />} />            
            <Route path="/my-profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
            <Route path="/my-profile/edit" element={<ProtectedRoute><ProfileEdit/></ProtectedRoute>} />

            {/* buyer flow * //use relative paths/ */}
            <Route path="/explore" element={<Explore />}/>
            <Route path="/explore/:catalog/:slug" element={<CategorySellers />} />
            <Route path="/seller/:username" element={<SellerProfile />} />



            {/* fallback route */}
            <Route path="*" element={<Error404 />} />
            </Routes>
          </SmallScreen>
          <BigScreen />   
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
