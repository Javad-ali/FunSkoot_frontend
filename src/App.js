import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from 'scenes/homePage/HomePage';
import LoginPage from 'scenes/loginPage/LoginPage';
import ProfilePage from 'scenes/profilePage/ProfilePage';
import { useMemo } from "react";
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chat from 'scenes/chat/Chat';
import Notification from 'components/Notification';
import OTPPage from 'scenes/otpPage/OTPPage';
import Login from 'scenes/admin/login/Login';
import ResponsiveDrawer from 'scenes/admin/home/Home';
import { Toaster } from 'react-hot-toast';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const blocked = Boolean(useSelector(state => state?.user?.block))

  return <div className="app">
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path='/' element={!isAuth || blocked ? <LoginPage /> : <Navigate to="/home" />} />
          <Route path='/home' element={isAuth && !blocked ? <HomePage /> : <Navigate to="/" />} />
          <Route path='/profile/:userId' element={isAuth && !blocked ? <ProfilePage /> : <Navigate to="/" />} />
          <Route path='/chat' element={isAuth && !blocked ? <Chat /> : <Navigate to="/" />} />
          <Route path='/otp' element={<OTPPage />} />
          <Route path='/admin' element={<Login />} />
          <Route path='/admin/home' element={<ResponsiveDrawer />} />
        </Routes>

      </ThemeProvider>
    </BrowserRouter>
    <Toaster></Toaster>
    <ToastContainer
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    {/* Same as */}
    <ToastContainer />

  </div>
}

export default App;
