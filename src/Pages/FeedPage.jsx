import { Button } from '@heroui/react'
import React, { useContext, useEffect, useState } from 'react'
import PostCard from '../Components/PostCard'
import { getAllPostsApi } from '../Services/PostServices'
import LoadingScreen from '../Components/LoadingScreen'
import CreatePost from '../Components/CreatePost'
import { Helmet } from 'react-helmet'
import { useQuery } from '@tanstack/react-query'

export default function FeedPage() {
    

    let {data:posts,isLoading,refetch:getAllPosts} = useQuery({
        queryKey:['posts'],
        queryFn:getAllPostsApi,
        refetchInterval:5000,
        select:(data)=>data?.data.posts
    })
    

    return (
        <>
            <Helmet>
                <title>Feed Page</title>
            </Helmet>
            <div className="md:w-1/2 mx-auto">

                <CreatePost callBack={getAllPosts}/>

                {/* if there is posts then show it, if not then show loading screen  */}
                {
                    isLoading 
                        ? 
                    <div className='flex flex-col gap-5 my-3'>
                        <LoadingScreen />
                        <LoadingScreen />
                        <LoadingScreen />
                        <LoadingScreen />
                    </div>
                        : 
                    /* making a loop to show postcard based on posts number */
                    posts?.map((post) => <PostCard post={post} key={post.id} commentLimit={1} callBack={getAllPosts} />)
                }
            </div>
        </>
    )
}
