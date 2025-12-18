import React from 'react'
import userImage from '../../assets/user.jpg'

export default function PostHeader({photo,name,date}) {

    //control Post Date Formate
    const FormattedDate = new Date(date).toLocaleString('en-GB', {
        day: 'numeric',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    })

    return (
        <>
            <div className="flex">
                <img onError={(e)=>e.target.src=userImage} className=" rounded-full w-10 h-10 mr-3" src={photo} alt={name} />
                <div>
                    <h3 className="text-md font-semibold ">{name}</h3>
                    <p className="text-xs text-gray-500">{FormattedDate}</p>
                </div>
            </div>
        </>
    )
}
