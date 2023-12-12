import React from 'react'

interface Props{
  username: string
}

const Home = ({username} : Props) => {
  return username ?(
    <h1>
        Welcome {username}!
    </h1>
  ) : (
    <h1>
        Welcome to the home page!
    </h1>
  )
}

export default Home
