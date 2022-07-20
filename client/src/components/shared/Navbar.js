import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Button from "../styled-components/Button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()
    const {user, logout} = useContext(AuthContext);

    const renderNavItems = () => {
        if (user) {
          return (
            <>
              <Button event={() => {navigate("/account")}}>Account</Button>
              <Button event={() => {logout()}}>Logout</Button>
            </>
          );
        } else {
          return (
            <>
              <Button event={() => {navigate("/login")}}>Login</Button>
              <Button event={() => {navigate("/register")}}>Register</Button>
            </>
          );
        }
      };

    return (
        <div>
            <nav>
              <Button event={() => {navigate("/")}}>Home</Button>
              <Button event={() => {navigate("/NewPhoto")}}>Image upload demo</Button>
              <Button event={() => {navigate("/braintree")}}>Payment demo</Button>
                    {renderNavItems()}
            </nav>
        </div>
    )
}

export default Navbar