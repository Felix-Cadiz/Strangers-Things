export const fetchPosts = async () => {
    try {
      const response = await fetch('https://strangers-things.herokuapp.com/api/2108-CSE-RM-WEB-PT/posts')
      const result = await response.json()
      return result.data.posts
    } catch (error) {
      console.log(error)
    }
}
  
export const fetchUserData = async (authToken) => {
  try {
    const user_data_headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    }
    const response = await fetch('https://strangers-things.herokuapp.com/api/2108-CSE-RM-WEB-PT/users/me', {
      headers: user_data_headers
    })
    const result = await response.json()
    return result
  } catch (error) {
    console.log(error)
  }
}

export const addPost = async (token, NewPost) => {
  try {
    console.log("util js")
    // console.log(token)
    event.preventDefault();
    const response = await fetch("https://strangers-things.herokuapp.com/api/2108-CSE-RM-WEB-PT/posts", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        post: NewPost
      })
    })
    const result = await response.json()
    console.log(result)
  } catch (error){
    console.log(error)
  }
}

export const deletePost = async (token, post_id) => {
  try {
    const response = await fetch(`https://strangers-things.herokuapp.com/api/2108-CSE-RM-WEB-PT/posts/${post_id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const result = await response.json()
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}

export const addComment = async (token, post_id, comment) => {
  try {
    const response = await fetch(`https://strangers-things.herokuapp.com/api/2108-CSE-RM-WEB-PT/posts/${post_id}/comments`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        comment: {
          content: comment
        }
      })
    })
    const result = await response.json()
    return result
  } catch (error) {
    console.log(error)
  }
}