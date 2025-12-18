import React, { useContext, useState } from 'react'
import PostHeader from './Card/PostHeader'
import PostBody from './Card/PostBody'
import PostFooter from './Card/PostFooter'
import Comment from './Card/Comment'
import { Button, Input } from '@heroui/react'
import { createCommentApi, getPostCommentsApi } from '../Services/CommentServices'
import { TokenContext } from '../Context/TokenContext'
import DropDownActions from './DropDownActions'
import toast from 'react-hot-toast'


export default function PostCard({ post, commentLimit, callBack }) {

    //using tokenContext to share user's data over all the project
    const { userData } = useContext(TokenContext)

    // Handle local deletion state to hide the post immediately
    const [isDeleted, setIsDeleted] = useState(false)

    //make React control in input insted of DOM (Controlled Component)
    const [commentContent, setCommentContent] = useState('')

    //handling loading
    const [loading, setLoading] = useState(false)

    //store all Comments in state
    const [comments, setComments] = useState(post.comments)

    //create Comment function
    async function createComment(e) {
        e.preventDefault()
        setLoading(true)
        const res = await createCommentApi(commentContent, post.id)
        if (res.message) {
            setComments(res.comments)
            setCommentContent('')
            toast.success('Comment created successfully')
        }
        setLoading(false)
    }

    //we make a function to get post's comments here cause all commetns are here and then send it as a prop to DropDownAction Component
    async function getPostComments() {
        const res = await getPostCommentsApi(post.id)
        setComments(res.comments)
    }

    // If deleted, don't render anything
    if (isDeleted) return null;

    return (
        <>
            <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5">
                <div className="w-full h-16 flex items-center justify-between ">

                    <PostHeader photo={post.user.photo} name={post.user.name} date={post.createdAt} />

                    {/* if this is user's post then show three dots to let him edit or delete his post */}
                    {
                        userData._id === post.user._id
                        &&
                        <>
                            <DropDownActions postId={post.id} callBack={() => setIsDeleted(true)} />
                        </>
                    }

                </div>

                <PostBody body={post.body} image={post.image} />

                <PostFooter commentNum={comments.length} postId={post.id} />

                <form onSubmit={createComment} className='flex gap-2 my-4'>
                    <Input value={commentContent} onChange={(e) => setCommentContent(e.target.value)} variant='bordered' placeholder='comment....'></Input>
                    <Button type='submit' color='primary' isLoading={loading} disabled={commentContent.length < 2}>Add Comment</Button>
                </form>

                {/* show comment section based on if there is comments or not */}
                {
                    comments.length > 0
                    &&
                    //if post in feedpage then show 1 comment, if it is in post-details page then show all comments (dynamic UI)
                    comments.slice(0, commentLimit).map((comment, index) => <Comment callBack={getPostComments} comment={comment} postUserId={post.user._id} key={index} />)
                }
            </div>
        </>
    )
}



// import React, { useContext, useState } from 'react'
// import PostHeader from './Card/PostHeader'
// import PostBody from './Card/PostBody'
// import PostFooter from './Card/PostFooter'
// import Comment from './Card/Comment'
// import { Button, Input } from '@heroui/react'
// import { createCommentApi, getPostCommentsApi } from '../Services/CommentServices'
// import { TokenContext } from '../Context/TokenContext'
// import DropDownActions from './DropDownActions'
// import toast from 'react-hot-toast'


// export default function PostCard({post,commentLimit,callBack}) { 

//     //using tokenContext to share user's data over all the project
//     const {userData} = useContext(TokenContext)

//     //make React control in input insted of DOM (Controlled Component)
//     const [commentContent, setCommentContent] = useState('')

//     //handling loading
//     const [loading, setLoading] = useState(false)
    
//     //store all Comments in state
//     const [comments, setComments] = useState(post.comments)

//     //create Comment function
//     async function createComment(e){
//         e.preventDefault()
//         setLoading(true)
//         const res = await createCommentApi(commentContent,post.id)
//         if(res.message){
//             setComments(res.comments)
//             setCommentContent('')
//             toast.success('Comment created successfully')
//         }
//         setLoading(false)
//     }

//     //we make a function to get post's comments here cause all commetns are here and then send it as a prop to DropDownAction Component
//     async function getPostComments(){
//         const res = await getPostCommentsApi(post.id)
//         setComments(res.comments)
//     }


//     //delete post function
//     async function deleteComment(commentId) {
//         setLoading(true)
//         const res = await deleteCommentApi(commentId)
//         if (res.message) {
//             await callBack()
//             toast.success('Comment deleted successfully')
//         }
//         setLoading(false)
//     }

//     return (
//         <>
//             <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5">
//                 <div className="w-full h-16 flex items-center justify-between ">

//                     <PostHeader photo={post.user.photo} name={post.user.name} date={post.createdAt}/>

//                     {/* if this is user's post then show three dots to let him edit or delete his post */}
//                     {
//                         userData._id === post.user._id
//                                     &&
//                         <>
//                             <DropDownActions/>    
//                         </>
//                     }

//                 </div>

//                 <PostBody body={post.body} image={post.image}/>

//                 <PostFooter commentNum={comments.length} postId={post.id}/>

//                     <form onSubmit={createComment} className='flex gap-2 my-4'>
//                         <Input value={commentContent} onChange={(e)=>setCommentContent(e.target.value)} variant='bordered' placeholder='comment....'></Input>
//                     <Button type='submit' color='primary' isLoading={loading} disabled={commentContent.length < 2}>Add Comment</Button>
//                     </form>
                
//                 {/* show comment section based on if there is comments or not */}
//                 {
//                     comments.length > 0
//                             &&
//                     //if post in feedpage then show 1 comment, if it is in post-details page then show all comments (dynamic UI)
//                     comments.slice(0, commentLimit).map((comment, index) => <Comment callBack={getPostComments} comment={comment} postUserId={post.user._id} key={index} />)
//                 }
//             </div>
//         </>
//     )
// }
