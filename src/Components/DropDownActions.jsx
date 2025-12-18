import React, { useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Spinner } from "@heroui/react";
import { deleteCommentApi } from '../Services/CommentServices';
import { deletePostApi } from '../Services/PostServices';
import toast from 'react-hot-toast';

export default function DropDownActions({ commentId, postId, callBack, setIsUpdating }) {

    //handling loading
    const [loading, setLoading] = useState(false)

    //Generic delete function for both comments and posts
    async function handleDelete() {
        setLoading(true)
        if (commentId) {
            const res = await deleteCommentApi(commentId)
            if (res.message) {
                await callBack()
                toast.success('Comment deleted successfully')
            }
        } else if (postId) {
            const res = await deletePostApi(postId)
            if (res.message) {
                await callBack()
                toast.success('Post deleted successfully')
            }
        }
        setLoading(false)
    }

    return (
        <>
            {
                loading
                    ?
                    <Spinner />
                    :
                    <Dropdown>
                        <DropdownTrigger>
                            <svg className="w-16 outline-0 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            {/* Only show Edit if setIsUpdating function is provided*/}
                            {setIsUpdating && <DropdownItem key="edit" onClick={() => setIsUpdating(true)}>Edit</DropdownItem>}

                            <DropdownItem key="delete" className="text-danger" color="danger" onClick={handleDelete}>
                                Delete
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
            }
        </>
    )
}




// import React, { useState } from 'react'
// import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Spinner } from "@heroui/react";
// import { deleteCommentApi } from '../Services/CommentServices';
// import toast from 'react-hot-toast';

// export default function DropDownActions({ commentId, callBack, setIsUpdating }) {

//     //handling loading
//     const [loading, setLoading] = useState(false)

//     //delete comment function
//     async function deleteComment(commentId){
//         setLoading(true)
//         const res = await deleteCommentApi(commentId)
//         if(res.message){
//             await callBack()
//             toast.success('Comment deleted successfully')
//         }
//         setLoading(false)
//     }

//     return (
//         <>
//             {
//                 loading
//                     ?
//                 <Spinner/>
//                     :
//                 <Dropdown>
//                     <DropdownTrigger>
//                         <svg className="w-16 outline-0 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg>
//                     </DropdownTrigger>
//                     <DropdownMenu aria-label="Static Actions">
//                         <DropdownItem key="edit" onClick={()=>setIsUpdating(true)}>Edit</DropdownItem>
//                         <DropdownItem key="delete" className="text-danger" color="danger" onClick={() => deleteComment(commentId)}>
//                             Delete
//                         </DropdownItem>
//                     </DropdownMenu>
//                 </Dropdown>
//             }
//         </>
//     )
// }
