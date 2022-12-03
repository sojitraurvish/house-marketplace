import {Routes,Route} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter} from "react-router-dom"

import Navbar from "./components/Navbar"
import Explore from "./Pages/Explore"
import Offers from "./Pages/Offers"
import Profile from "./Pages/Profile"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import ForgotPassword from "./Pages/ForgotPassword"
import PrivateRoute from "./components/PrivateRoute";
import Category from "./Pages/Category";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateRoute/>}>
            <Route path="/" element={<Explore/>} />
        </Route>
        <Route path="/category" element={<PrivateRoute/>}>
            <Route path="/category/:categoryName" element={<Category/>} />
        </Route>

        <Route path="/offers" element={<PrivateRoute/>}>
            <Route path="/offers" element={<Offers/>} />
        </Route>

        <Route path="/profile" element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
      
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
      </Routes>
      <Navbar/>
      <ToastContainer/>
    </>
  );
}

export default App;
