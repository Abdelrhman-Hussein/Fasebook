import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { TokenContext } from '../Context/TokenContext'

export default function AuthProtectedRoute({children}) {

    //using tokenContext to share the token over all the project
    const { isLoggedIn } = useContext(TokenContext)

    //prevent user from going to login and register page if he has logged in
    return !isLoggedIn ? children : <Navigate to={'/'}/>
}
