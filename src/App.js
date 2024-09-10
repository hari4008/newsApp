import './App.css';
// import PrivateRoute from './PrivateRoute/privateRoutes';
import { Route, Routes } from "react-router-dom";
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar';
import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';
import { useTheme } from './context/ThemeProvider';
import SpecificNews from './Components/SpecificNews';
import CryptoCurrency from './Components/CryptoCurrency';
import CryptoList from './Components/CryptoList';
import Testy from './Components/Testy';

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
          <Route path="/cryptocurrency/:name" element={<CryptoCurrency />} />
          <Route path="/cryptolist" element={<CryptoList />} />
          <Route path="/testy" element={<Testy />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
