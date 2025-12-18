import axios from "axios"

//upload user image function
export async function uploadUserImageApi(formData) {
    try {
        const { data } = await axios.put('https://linked-posts.routemisr.com/users/upload-photo' , formData,
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            }
        )
        console.log(data)
        return data
    }
    catch (err) {
        console.log(err)
    }
}

//get user's posts that he had post it function
export async function getUserPostsApi() {
    try {
        const { data } = await axios.get('https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts',
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            }
        )
        console.log(data)
        return data
    }
    catch (err) {
        console.log(err)
    }
}