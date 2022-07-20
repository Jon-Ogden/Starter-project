import "./App.css"
import Home from './components/shared/Home';
import NoMatch from './components/shared/NoMatch';
import Navbar from './components/shared/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UserAccount from './components/shared/UserAccount';
import FetchUser from './components/auth/FetchUser';
import NewPhoto from "./demos/NewPhoto";
import Braintree from "./demos/braintree/Braintree";
import PaymentSuccess from "./demos/braintree/PaymentSuccess";

const App = () => (
  <>
    <Navbar />
    <>
    <FetchUser>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/braintree" element={<Braintree />} />
        <Route path="/payment_success" element={<PaymentSuccess />} />
        <Route  element={<ProtectedRoute/>}>
            <Route path="/account" element={<UserAccount />} />
            <Route path="/NewPhoto" element={<NewPhoto />} />
        </Route>
        <Route path="/*" element={<NoMatch />} />
      </Routes>
    </FetchUser>
    </>
  </>
)

export default App;