import axios from "axios";

//get all Posts from backend function
export  function getAllPostsApi(){
        return axios.get('https://linked-posts.routemisr.com/posts', {
            headers: {
                token: localStorage.getItem('token')
            },
            params:{
                sort: '-createdAt'
            }
        })
}


//get single Post from backend function
export async function getSinglePostApi(postId) {
    try {
        const { data } = await axios.get('https://linked-posts.routemisr.com/posts/'+postId, {
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


//create Post function
export async function createPostApi(formData) {
    try {
        const { data } = await axios.post('https://linked-posts.routemisr.com/posts', formData , {
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

//delete post function
export async function deletePostApi(postId) {
    try {
        const { data } = await axios.delete('https://linked-posts.routemisr.com/posts/' + postId,
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