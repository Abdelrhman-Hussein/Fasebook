import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { TokenContext } from '../Context/TokenContext'

export default function MainProtectedRoute({children}) {

    //using tokenContext to share the token over all the project
    const { isLoggedIn } = useContext(TokenContext)

    //prevent user from going to the site if he didn't login
    return isLoggedIn ? children : <Navigate to={'/login'}/>
}
