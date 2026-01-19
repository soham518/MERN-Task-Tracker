import '../App.css';
import { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  // let variable1 = "variable 1"
  //this is an unused variable to check working of ci in github actions
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = async () => {
    if (!email || !password || (!isLogin && !name))
      return alert("All fields required");

    const url = isLogin
      ? "http://localhost:1000/api/auth/login"
      : "http://localhost:1000/api/auth/register";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        isLogin ? { email, password } : { name, email, password }
      ),
    });

    const data = await res.json();

    if (!data.success) return alert(data.message);

    if (isLogin) {
      localStorage.setItem("token", data.token);
      alert("Logged in successfully!");
      window.location.href = "/tasks"; // redirect to tasks page
    } else {
      alert("Account created! Please login now.");
      setIsLogin(true);
    }
  };

return (
  <div className="center-wrapper">
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>

      {!isLogin && (
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {isLogin ? "Login" : "Register"}
      </button>

      <p onClick={toggleMode} className="switch">
        {isLogin ? "New here? Create account" : "Already registered? Login"}
      </p>
    </div>
  </div>
);
};

export default Auth;