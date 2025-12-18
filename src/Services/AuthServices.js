import axios from "axios";

//sending userData to backend to signUp
export async function signUp(userData){
    try{
        const { data } = await axios.post('https://linked-posts.routemisr.com/users/signup', userData)
        return data
    }
    catch(err){
        return err.response.data
    }
}


//sending userData to backend to signIn
export async function signIn(userData) {
    try {
        const { data } = await axios.post('https://linked-posts.routemisr.com/users/signin', userData)
        return data
    }
    catch (err) {
        return err.response.data
    }
}


// get user's data function
export async function getUserDataApi() {
    try {
        const { data } = await axios.get('https://linked-posts.routemisr.com/users/profile-data', {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        console.log(data)
        return data
    }
    catch (err) {
        console.log(err)
    }
}