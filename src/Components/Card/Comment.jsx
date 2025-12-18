import React, { useContext, useState } from 'react'
import PostHeader from './PostHeader'
import { TokenContext } from '../../Context/TokenContext'
import DropDownActions from '../DropDownActions';
import { Button, Input } from '@heroui/react';
import { updateCommentApi } from '../../Services/CommentServices';
import toast from 'react-hot-toast';


export default function Comment({ comment, postUserId , callBack }) {

    //using tokenContext to share user's data over all the project
    const {userData} = useContext(TokenContext)

    //make React control in input insted of DOM (Controlled Component)
    const [updatedValue, setUpdatedValue] = useState(comment.content)

    //handle show or hide edit comment's input section
    const [isUpdating, setIsUpdating] = useState(false)

    //handle loading
    const [loading, setLoading] = useState(false)

    //handle update comment function
    async function handleUpdate(e){
        e.preventDefault()
        setLoading(true)
        const res = await updateCommentApi(comment._id,updatedValue)
        if(res.message){
            await callBack()
            setIsUpdating(false)
            toast.success('Comment updated successfully')
        }
        setLoading(false)
    }
    
    return (
        <>
            <div className='p-4 bg-gray-100'>
                <div className='w-full h-16 flex items-center justify-between'>

                    <PostHeader photo={comment.commentCreator.photo} name={comment.commentCreator.name} date={comment.createdAt} />

                    {/* if this is user's comment on his post then show three dots to let him edit or delete his comment */}
                    {
                        userData._id === comment.commentCreator._id
                                        &&
                        userData._id === postUserId
                                        &&
                        <DropDownActions callBack={callBack} commentId={comment._id} setIsUpdating={setIsUpdating}/>
                    }

                </div>
                <p className='p-4'>{comment.content}</p>
                {/* show update input when user click on update button */}
                {
                    isUpdating
                        &&
                    <form className='flex items-center gap-4' onSubmit={handleUpdate}>
                        <Input variant='bordered' value={updatedValue} onChange={(e) => setUpdatedValue(e.target.value)} />
                        <Button isLoading={loading} type='submit' color='warning'>Update</Button>
                    </form>
                }
            </div>
        </>
    )
}

