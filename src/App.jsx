import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ReactGA from "react-ga4";
import { AuthProvider } from "./context/AuthContext.jsx";

// PAGES
import Home from "./pages/Home.jsx";
import Error404 from "./ui/Error404.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import Spinner from "./ui/Spinner.jsx";
import GlobalFeedbackButton from "./ui/GlobalFeedbackButton.jsx";

// dynamically imported pages
const Login = lazy(() => import("./pages/Login.jsx"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));
const UpdatePassword = lazy(() => import("./pages/updatePassword.jsx"));
const MyProfile = lazy(() => import("./pages/MyProfile.jsx"));
const Explore = lazy(() => import("./pages/Explore.jsx"));
const CategorySellers = lazy(() => import("./pages/CategorySellers.jsx"));
const SellerProfile = lazy(() => import("./pages/SellerProfile.jsx"));
const ProfileEdit = lazy(() => import("./pages/ProfileEdit.jsx"));
const Feedback = lazy(() => import("./pages/Feedback.jsx"));
const BigScreen = lazy(() => import("./ui/BigScreen.jsx"));
const SmallScreen = lazy(() => import("./ui/SmallScreen.jsx"));
//analytics
import { Analytics } from "@vercel/analytics/react";
import AppLayout from "./ui/AppLayout.jsx";

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
  // splash screen where suspense is.

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          {IS_PRODUCTION && <Analytics />}
          <GoogleAnalyticsTracker />
          <AuthProvider>
            <SmallScreen>
              <Routes>
                <Route element={<AppLayout />} >
                  <Route path="/" element={<Home />} />
                  {/* seller flow */}
                  <Route path="/signUp" element={<SignUp />} />
                  <Route path="/signIn" element={<Login />} />
                  <Route path="/forgotPassword" element={<ForgotPassword />} />
                  <Route path="/updatePassword" element={<UpdatePassword />} />
                  <Route
                    path="/my-profile"
                    element={
                      <ProtectedRoute>
                        <MyProfile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/my-profile/edit"
                    element={
                      <ProtectedRoute>
                        <ProfileEdit />
                      </ProtectedRoute>
                    }
                  />

                  {/* buyer flow * //use relative paths/ */}
                  <Route path="/explore" element={<Explore />} />
                  <Route
                    path="/explore/:catalog/:slug"
                    element={<CategorySellers />}
                  />
                  <Route path="/seller/:username" element={<SellerProfile />} />

                  {/* fallback route */}
                  <Route path="*" element={<Error404 />} />
                  {/* Feedback Page */}
                  <Route path="/feedback" element={<Feedback />} />
                </Route>
              </Routes>
              <GlobalFeedbackButton />
            </SmallScreen>
            <BigScreen />
          </AuthProvider>
        </Suspense>
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
            fontSize: "14px",
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
