import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import { PostCommentForm } from '../components/PostCommentForm';
import { CommentList } from '../components/CommentList';
import { DashboardConext } from '../context/DashboardConext';
import { notifyUser } from '../utils/notify';
import { AuthContext } from '../context/AuthContext';

// const comments = [
//     {
//       id: 1,
//       userId: 'User 1',
//       content: 'Description of Comment 1',
//       timeStamp: 'Category A',
//     },
//     {
//         id: 2,
//         userId: 'User 2',
//         content: 'Description of Comment 2',
//         timeStamp: 'Category A',
//     },
//     {
//         id: 3,
//         userId: 'User 3',
//         content: 'Description of Comment 3',
//         timeStamp: 'Category A',
//     },
//     {
//         id: 4,
//         userId: 'User 4',
//         content: 'Description of Comment 4',
//         timeStamp: 'Category A',
//     },
//     {
//         id: 5,
//         userId: 'User 5',
//         content: 'Description of Comment 5',
//         timeStamp: 'Category A',
//     },
//     {
//         id: 6,
//         userId: 'User 6',
//         content: 'Description of Comment 6',
//         timeStamp: 'Category A',
//     }
//   ]

export const CausePage = (props) => {

    const [cause, setCause] = useState(null)
    const { postComment, causes } = useContext(DashboardConext)
    const { user } = useContext(AuthContext)
    const location = useLocation()
   
    useEffect(() => {
        console.log("loc == ", location.state);
        if(location.state) {
            setCause(location.state)
        }
    }, [location])

    useEffect(() => {
        if(causes[0]) {
            console.log("asdfsafasdfas = ", causes[0]);
            console.log("asdfsafasdfas 444 = ", cause);
            let newCause = causes.find((cc) => cc?._id === location?.state?._id)
            console.log('assdddf = ', newCause);
            setCause(newCause)
        }
    }, [causes])

    const postCommentToCause = async (comment) => {
        console.log('posting data = ', comment, cause);
        try {
            await postComment(comment, cause._id)
        }catch(err) {
            notifyUser('Something went wrong. Please try again later.', 'danger')
        }
    }

    return (
        // {
            cause ? 
            <>
                <Navbar showSearch={false}/>
                <div className="container grid grid-row-2 mx-auto py-8 p-2">
                <h1 className="text-2xl font-bold mb-4">{cause.name}</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-600 font-bold mb-2">{cause.description}</p>
                    </div>
                    <div className='text-end'>
                        <p className="text-gray-600 font-bold mb-2">Business: {cause.business}</p>
                    </div>
                </div>
                <PostCommentForm postCommentToCause={(comment) => postCommentToCause(comment)}/>

                {/* comment section */}
                {cause.comments.length > 0 &&
                    <div>
                        {
                            cause.comments.map((comment) => {
                                return <CommentList data={{...comment, email: user?.email || 'Guest'}} key={comment.id}/>
                            })
                        }
                    </div>
                }
                </div>
            </>
        : 
        <>
        </>
        // }
    )
}
