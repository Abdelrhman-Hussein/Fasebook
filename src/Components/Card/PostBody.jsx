import React from 'react'

export default function PostBody({body,image}) {
    return (
        <>
            {/* avoiding erros if the post dont have image or body */}
            {body && <p>{body}</p>}
            {image && <img src={image} className='w-full h-100 object-cover' alt="" />}
        </>
    )
}
