"use client";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";

const Toaster = () => {
  const { theme } = useTheme();

  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme}
    />
  );
};

export default Toaster;
