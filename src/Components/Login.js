import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchUserData } from "../util";
import "./Login.css"

const Login = ({setToken, setIsLoggedIn, isLoggedIn, setCurrentUser}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showCredentialsError, setShowCredentialsError] = useState(false)
  const [accountError, setAccountError] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/account")
  }, [])
  
  const submitAccountInfo = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch(`https://strangers-things.herokuapp.com/api/2108-CSE-RM-WEB-PT/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password,
          }
        })
      })
      const result = await response.json()
      const authToken = result.data.token
      setToken(authToken)
      setIsLoggedIn(true)
      const userData = await fetchUserData(authToken)
      setCurrentUser(userData.data)
      setShowCredentialsError(false)
      navigate("/account")
    } catch (error) {
      console.error
      const errorMessage = "login" ? "Incorrect username and password combination." : "Username already taken."
      setAccountError(errorMessage);
      setShowCredentialsError(true);
    }
  }

  return <>
    <div className="loginForm">
      <form onSubmit={submitAccountInfo}>
      <h1>Login</h1>
        <input type="text" id="username" placeholder="username" minLength="6" onChange={
            (event) => {setUsername(event.target.value)}} required/>
        <input type="password" id="password" placeholder="password" minLength="6" onChange={
            (event) => {setPassword(event.target.value)}} required/>
        { showCredentialsError ? <div className="error">{accountError}</div> : null }
        <button type="submit">Login</button>
      </form>

      <div className="registerLink">
        <Link to="/register">Don't have an account? <br /> Sign up!</Link>
      </div>
    </div>
  </>
}

  export default Login;