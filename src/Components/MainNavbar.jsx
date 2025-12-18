import React, { useContext, useState } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@heroui/react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { TokenContext } from '../Context/TokenContext';
import userImage from '../assets/user.jpg'


export default function MainNavbar() {

    //using tokenContext to share user's data over all the project
    const {userData} = useContext(TokenContext)

    //using tokenContext to share the token over all the project
    const { isLoggedIn, setIsLoggedIn , setUserData } = useContext(TokenContext)

    //programatic routing
    const navigate = useNavigate()

    //logOut function
    function logOut(){
        localStorage.removeItem('token');
        //set context with token value
        setIsLoggedIn(null)
        navigate('/login')
        setUserData(null)
    }

    return (
        <>
            <Navbar className='bg-[#0866FF]'>
                <NavbarBrand>
                    <p className="font-bold text-3xl text-white"><Link to={'/'}> Fasebook </Link></p>
                </NavbarBrand>
                <NavbarContent justify="end">
                    {
                        isLoggedIn 
                            ?
                        <>
                            <NavbarItem className='me-4'>
                                <NavLink to={'/profile'}>
                                        <img onError={(e) => e.target.src = userImage} src={`${userData?.photo}?${Date.now()}`} className='rounded-2xl' width={40} height={40} alt="" />
                                </NavLink>
                            </NavbarItem>                       
                            <NavbarItem className='font-bold text-white'>
                                <NavLink onClick={logOut}>Log Out</NavLink>
                            </NavbarItem>                       
                        </>
                            :
                        <>
                            <NavbarItem>
                                <NavLink to={'register'}>Sign Up</NavLink>
                            </NavbarItem>
                            <NavbarItem>
                                <NavLink to={'login'}>Sign In</NavLink>
                            </NavbarItem>
                        </>
                    }
                </NavbarContent>
            </Navbar>
        </>
    )
}
