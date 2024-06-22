import './App.css';
// import PrivateRoute from './PrivateRoute/privateRoutes';
import { Route, Routes } from "react-router-dom";
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar';
import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';
import { useTheme } from './context/ThemeProvider';
import SpecificNews from './Components/SpecificNews';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllNews } from './RTK/Slices/newsSlice';

function App() {
  // const dispatch = useDispatch();
  const { theme } = useTheme();

  // useEffect(() => {
  //   dispatch(getAllNews());
  // }, [dispatch]);
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: theme === 'light' ? 'white' : 'black'
      }}
    >
      <header style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/specificnews/:index" element={<SpecificNews />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
