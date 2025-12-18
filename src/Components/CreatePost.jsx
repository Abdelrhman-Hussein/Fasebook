import { Button, Input, Spinner } from '@heroui/react'
import React, { useState } from 'react'
import staticImage from '../assets/user.jpg'
import { createPostApi } from '../Services/PostServices'
import toast from 'react-hot-toast'

export default function CreatePost({callBack}) {

    //make React control in test-area insted of DOM (Controlled Component)
    const [postBody, setPostBody] = useState('')

    //handling loading
    const [loading, setLoading] = useState(false)

    //store image file to send it to the backend
    const [postImage, setPostImage] = useState(null)

    //store image url that we have just created
    const [imageUrl, setImageUrl] = useState('')

    //handle image function
    function handleImage(e){
        setPostImage(e.target.files[0])
        //create image url    
        setImageUrl(URL.createObjectURL(e.target.files[0]))
        //impty the input in case user choose the same image
        e.target.value= ''
    }

    //create post function
    async function createPost(e){
        e.preventDefault()
        //to prevent from create empty post
        if (!postBody.trim() && !postImage) {
            return;
        }
        setLoading(true)
        const formData = new FormData()
        postBody && formData.append('body', postBody)
        postImage && formData.append('image', postImage)
        const res = await createPostApi(formData)
        if(res.message){
            await callBack()
            setPostBody('')
            setPostImage(null)
            setImageUrl('')
            toast.success('Post created successfully')
        }
        setLoading(false)
    }

    return (
        <>
            <div className='bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5 relative'>
                <form onSubmit={createPost}>
                    <textarea value={postBody} onChange={(e) => setPostBody(e.target.value)} placeholder="create a Post , What's on your mind....?" className='border w-full p-4 rounded-md resize-none bg-gray-200' rows={4}></textarea>
                    {/* check if there is image to show */}
                    {
                        imageUrl
                            &&
                        <div className='relative'>
                            <img src={imageUrl} className='w-full' alt="" />
                            <svg onClick={() => setImageUrl(null)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}   stroke="currentColor" className="size-9 absolute top-4 end-4 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                    }
                    <div className='flex justify-between items-center my-3'>
                        <label className='hover:text-blue-800 cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            <Input onChange={handleImage} type='file' className='border hidden' />
                        </label>
                        <Button type='submit' color='primary'>Post</Button>
                    </div>
                </form>
                {
                    loading
                        &&
                    <div className='flex justify-center items-center absolute inset-0 bg-gray-300/50'>
                        <Spinner/>
                    </div>
                }
            </div>
        </>
    )
}
