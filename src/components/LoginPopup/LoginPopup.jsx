import { useState, useContext } from 'react';
import { assets } from '../../assets/assets';
import './LoginPopup.css';
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios';
import { toast } from 'react-toastify';
import Confetti from 'react-confetti';

const LoginPopup = ({ setShowLogin }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const { url, token, setToken } = useContext(StoreContext);

  const [curState, setCurState] = useState("Log In");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let newUrl = url;
    newUrl += curState === "Log In" ? "/api/user/login" : "/api/user/register";

    try {
      const response = await axios.post(newUrl, data);
      if (curState === "Sign up") {
        toast.success("Account created successfully! Please Log In");
        setCurState("Log In");
      } else {
        setToken(response.data.token);
localStorage.setItem("token", response.data.token);
setShowConfetti(true); // show confetti
toast.success("Login successful!");

// Close after confetti plays
setTimeout(() => {
  setShowConfetti(false);
  setShowLogin(false); // close modal *after* 3s
}, 3000);
      }
        
    } catch (error) {
      console.log("Login error:", error);
      toast.error("Something went wrong. Try again!");
    }
  };

  return (
    <div className="login-popup">
      {showConfetti && <Confetti />}
      <form onSubmit={onSubmitHandler} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{curState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {curState !== "Log In" && (
            <input
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              type="text"
              placeholder="Your Name"
              required
            />
          )}
          <input
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit">{curState}</button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to terms & privacy policy.</p>
        </div>

        {curState === "Log In" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurState("Sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurState("Log In")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
