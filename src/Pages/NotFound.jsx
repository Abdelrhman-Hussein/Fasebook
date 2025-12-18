import React from 'react'
import img3 from '../assets/404 Error Page not Found with people connecting a plug-bro.svg'
import { Button } from '@heroui/react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function NotFound() {
    return (
        <>
            <Helmet>
                <title>Not-Found Page</title>
            </Helmet>
            <section className='pt-12'>
                <div className="container mx-auto">
                    <div className='flex justify-center items-center'>
                        <img src={img3} className='w-xl' alt="" />
                    </div>
                    <div className='text-center'>
                        <Button variant='solid' color='primary' size='lg'><Link to={'/'}>Go to FeedPage</Link></Button>
                    </div>
                </div>
            </section>
        </>
    )
}
