import { createContext, useEffect, useState } from "react";
import { getUserDataApi } from "../Services/AuthServices";

export const TokenContext = createContext()
export default function TokenContextProvider({children}){

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') != null)
    const [userData, setUserData] = useState(null)

    async function getUserData(){
        const res = await getUserDataApi()
        if(res.message){
            setUserData(res.user)
        }
    }

    //get user's data when component did mount and delete it when log out
    useEffect(() => {
        if(isLoggedIn){
            getUserData()
        }
    }, [isLoggedIn])
    

    return <TokenContext.Provider value={{ isLoggedIn, setIsLoggedIn , userData, setUserData }}>
            {children}
    </TokenContext.Provider>
}