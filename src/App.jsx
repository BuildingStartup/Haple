import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* routes go in here */}
      </Routes>
    </BrowserRouter>
    <Toaster 
    position="top-center"
    gutter={12}
    containerStyle={{margin: "8px"}}
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
        color: "black"
      }
    }}
    />
    </>
  )
}

export default App
