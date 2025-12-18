import axios from "axios"

//create comment function
export async function createCommentApi(commentContent,postId){
    try{
        const { data } = await axios.post('https://linked-posts.routemisr.com/comments',
        {
            content:commentContent,
            post:postId
        },
        {
            headers:{
                token:localStorage.getItem('token')
            }
        }
    )
    console.log(data)
    return data
    }
    catch(err){
        console.log(err)
    }
}


//delete comment function
export async function deleteCommentApi(commentId) {
    try {
        const { data } = await axios.delete('https://linked-posts.routemisr.com/comments/'+commentId,
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


//get a post's comments function
export async function getPostCommentsApi(postId) {
    try {
        const { data } = await axios.get('https://linked-posts.routemisr.com/posts/'+postId+'/comments',
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

//update comment function
export async function updateCommentApi(commentId,content) {
    try {
        const { data } = await axios.put('https://linked-posts.routemisr.com/comments/'+commentId,
            {
                content
            },
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