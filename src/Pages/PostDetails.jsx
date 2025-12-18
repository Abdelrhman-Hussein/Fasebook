import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSinglePostApi } from '../Services/PostServices'
import LoadingScreen from '../Components/LoadingScreen'
import PostCard from '../Components/PostCard'
import { Helmet } from 'react-helmet'

export default function PostDetails() {

    //using useParams hook to pass post's id from feedpage to post-details page
    const {id} = useParams()

    //store post that came from backend here
    const [post, setPost] = useState(null)

    //cause useEffect prevent to write await inside it so i make a bridge to call the API in Component did amount
    async function getSinglePost(){
        const res = await getSinglePostApi(id)
        if(res.message){
            setPost(res.post)
        }
    }

    //calling the API by using a bridge to get Post details in Component did amount
    useEffect(() => {
        getSinglePost()
    }, [])
    

    return (
        <>
            <Helmet>
                <title>Post-Details Page</title>
            </Helmet>
            <div className='md:w-1/2 mx-auto'>
                {/* if there is post then show it, if not then show loading screen  */}
                {
                    post
                        ?
                    <PostCard post={post} commentLimit={post.comments.length} />
                        :
                    <LoadingScreen />
                }
            </div>
        </>
    )
}
