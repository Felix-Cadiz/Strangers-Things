import React, { useState } from "react";
import { useNavigate } from "react-router";
import { fetchUserData } from "../util";
import "./Register.css";

const Register = ({setToken, setIsLoggedIn, setCurrentUser}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCredentialsError, setShowCredentialsError] = useState(false)
  const [accountError, setAccountError] = useState("")

    const navigate = useNavigate();

    const createAccount = async (event) => {
      try{ 
        event.preventDefault();
        const response = await fetch('https://strangers-things.herokuapp.com/api/2108-CSE-RM-WEB-PT/users/register', {
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
      navigate("/account")
    } catch (error) {
        console.error;
        const errorMessage = "login" && "Username already taken."
        setAccountError(errorMessage);
        setShowCredentialsError(true);
    }
  }

    return <>
      <h1>REGISTER</h1>
      <form onSubmit={createAccount}>
        <input type="text" value={username} id="username" placeholder="username" minLength="6" onChange={
          (event) => {setUsername(event.target.value)}} required/>
        <input type="password" value={password} id="password" placeholder="password" minLength="6" onChange={
          (event) => {setPassword(event.target.value)}} required/>
        <input type="password" value={confirmPassword} id="confirm_password" name= "confirm_password" placeholder="confirm password" onChange={
          (event) => {setConfirmPassword(event.target.value)}} required/>
        {password !== confirmPassword && <div>Passwords do not match</div>}
        { showCredentialsError ? <div className="error">{accountError}</div> : null }
        <button type="submit">Create Account</button>
      </form>
    </>
  }

  export default Register;