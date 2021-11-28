import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Routes, Route, NavLink, BrowserRouter as Router } from "react-router-dom"
import "./Index.css";

import {
    Account,
    Home,
    Inbox,
    Login,
    Logout,
    MyPosts,
    NewPost,
    Posts,
    Register,
    SendMessage,
} from "./Components/index.js"

const App = () => {
  const [token, setToken] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  useEffect(async () => {
    const savedToken = localStorage.getItem("token")
    if (savedToken) {
      setToken(savedToken)
      setIsLoggedIn(true)
      const userData = await fetchUserData (savedToken)
      setCurrentUser(userData.data.guest)
    }
  }, [])

  return <>
    <nav>
      <h1 className="logo"> Stranger's Things </h1>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Account</NavLink>
      <NavLink to="/posts">Posts</NavLink>
      {
        isLoggedIn ? <NavLink to="/logout" onClick={() => {
          setToken("")
          setIsLoggedIn(false)
          setCurrentUser(false)
        }}>Logout</NavLink> : ""
      }
    </nav>
    <hr/>
    <Routes>
      <Route path='/account' element={<Account isLoggedIn={isLoggedIn} currentUser={currentUser} />}/>
      <Route path='/' exact element={ <Home /> }/>
      <Route path='/inbox' element={<Inbox token={token} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser}/>}/>
      <Route path='/login' element={ <Login setToken={setToken} token={token} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser}/> }/>
      <Route path='/myposts' element={<MyPosts token={token} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser} currentUser={currentUser}/>}/>
      <Route path='/newpost' element={ <NewPost token={token} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser}/> }/>
      <Route path='/posts' element={<Posts token={token} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser} currentUser={currentUser}/>}/>
      <Route path='/register' element={ <Register setToken={setToken} token={token} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser}/> }/>
      <Route path='/sendmessage/:post._id' element={<SendMessage token={token} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser}/>}/>
      <Route path='/logout' element={ <Logout ssetIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser}/>}/>
    </Routes>
  </>
}

ReactDOM.render(
    <Router>
      <App />
    </Router>,
    document.getElementById('app')
)