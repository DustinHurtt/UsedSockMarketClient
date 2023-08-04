import "./App.css";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AllSocks from "./pages/AllSocks";
import AddSock from "./pages/AddSock";
import EditSock from "./pages/EditSock";
import SockDetails from "./pages/SockDetails";
import Cart from "./pages/Cart";
 
function App() {

  const getToken = () => {
    return localStorage.getItem('authToken')
  }

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to='/login' />
  }

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to='/' />
  }

  return (
    <div className="App">
      
      <Navbar />
 
      <Routes>      
        <Route path="/" element={ <HomePage /> } />
        <Route path="/all-socks" element={ <AllSocks />} />
        <Route path="/sock-details/:sockId" element={<SockDetails />} />

        <Route element={<LoggedIn />}>

          <Route path="/add-sock" element={<AddSock />} />
          <Route path="/edit-sock/:sockId" element={<EditSock />} />
          <Route path="/cart" element={<Cart />} />

        </Route>

        <Route element={<NotLoggedIn />}>

          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

        </Route>

      </Routes>
      
    </div>
  );
}
export default App;



