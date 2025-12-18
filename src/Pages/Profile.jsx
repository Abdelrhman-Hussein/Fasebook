import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { TokenContext } from '../Context/TokenContext'
import userImagee from '../assets/user.jpg'
import { Button, Input, Spinner } from '@heroui/react'
import { getUserPostsApi, uploadUserImageApi } from '../Services/UserServices'
import { getUserDataApi } from '../Services/AuthServices'
import toast from 'react-hot-toast'
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import PostCard from '../Components/PostCard'
import LoadingScreen from '../Components/LoadingScreen'

export default function Profile() {

    //handling loading
    const [isLoading, setIsLoading] = useState(false)

    //using tokenContext to share user's data over all the project
    const { userData, setUserData } = useContext(TokenContext)

    //handling loading
    const [loading, setLoading] = useState(false)

    //store image file to send it to the backend
    const [userImage, setUserImage] = useState(null)

    //store image url that we have just created
    const [imageUrl, setImageUrl] = useState('')

    //control user Date Formate
    const FormattedDate = new Date(userData?.dateOfBirth).toLocaleString('en-GB', {
        day: 'numeric',
        month: '2-digit',
        year: 'numeric'
    })

    const FormattedUserDate = new Date(userData?.createdAt).toLocaleString('en-GB', {
        day: 'numeric',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: 'true'
    })

    //handle image function
    function handleImage(e) {
        setUserImage(e.target.files[0])
        //create image url    
        setImageUrl(URL.createObjectURL(e.target.files[0]))
        //impty the input in case user choose the same image
        e.target.value = ''
    }

    //create post function
    async function uploadImage(e) {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        userImage && formData.append('photo', userImage)
        const res = await uploadUserImageApi(formData)
        if (res.message) {
            // Fetch fresh user data to ensure we have the correct new photo URL
            const userRes = await getUserDataApi();
            if (userRes && userRes.user) {
                setUserData(userRes.user);
            }

            setUserImage(null)
            setImageUrl('')
            toast.success('Image uploaded successfully')
        }
        setLoading(false)
    }

    //store all user's posts
    const [userPosts, setUserPosts] = useState(null)

    //cause useEffect prevent to write await inside it so i make a bridge to call the API in Component did amount
    async function getUserPosts() {
        const res = await getUserPostsApi()
        setUserPosts(res.posts)
    }

    //calling the API by using a bridge to get Posts in Component did amount
    useEffect(() => {
        getUserPosts()
    }, [])

    return (
        <>
            <Helmet>
                <title>Profile Page</title>
            </Helmet>
            <section>
                <div className="container mx-auto">
                    <div>
                        <div className='flex flex-col gap-4 justify-center items-center relative'>
                            {/* Added key prop to force re-render when photo changes */}
                            <img
                                key={userData?.photo}
                                onError={(e) => e.target.src = userImagee}
                                src={userData?.photo ? `${userData.photo}?${Date.now()}` : userImagee}
                                className='rounded-full'
                                alt=""
                            />
                            {/* check if there is image to show */}
                            {
                                imageUrl
                                &&
                                <div className='relative'>
                                    <img src={imageUrl} className='w-full' alt="" />
                                    <svg onClick={() => setImageUrl(null)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 absolute top-4 end-4 cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            }
                            <form className='flex flex-col items-center' onSubmit={uploadImage}>
                                <label className='hover:text-blue-800 cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-11 text-blue-800 cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <Input onChange={handleImage} type='file' className='border hidden' />
                                </label>
                                {
                                    imageUrl
                                    &&
                                    <Button type='submit' color='primary' className='mt-2'>Upload</Button>
                                }
                            </form>
                            {
                                loading
                                &&
                                <div className='flex justify-center items-center absolute inset-0 bg-gray-300/50'>
                                    <Spinner />
                                </div>
                            }
                        </div>
                        <Card className="w-full md:w-1/2 mx-auto mt-6 bg-white shadow-2xl rounded-2xl overflow-visible">
                            <CardHeader className="flex flex-col items-center pb-0 pt-6 px-4">
                                <h4 className="font-bold text-2xl text-gray-800">{userData?.name}</h4>
                                <p className="text-gray-500">{userData?.email}</p>
                            </CardHeader>
                            <CardBody className="py-6 px-8">
                                <div className="space-y-4">
                                    {/* Date of Birth */}
                                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                                        <span className="font-medium text-gray-600">Date of Birth</span>
                                        <span className="text-gray-800 font-semibold">{FormattedDate}</span>
                                    </div>

                                    {/* Join Date */}
                                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                                        <span className="font-medium text-gray-600">Joined</span>
                                        <span className="text-gray-800 font-semibold">{FormattedUserDate}</span>
                                    </div>
                                    {/* Gender (renders only if available) */}
                                    {userData?.gender && (
                                        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                                            <span className="font-medium text-gray-600">Gender</span>
                                            <span className="text-gray-800 font-semibold capitalize">{userData?.gender}</span>
                                        </div>
                                    )}
                                </div>
                            </CardBody>
                        </Card>
                        <div className="md:w-1/2 mx-auto">
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
                                    userPosts?.map((post) => <PostCard post={post} key={post.id} commentLimit={1} />)
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

