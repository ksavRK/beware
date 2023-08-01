import { useState } from 'react'

export const PostCommentForm = (props) => {
    const [comment, setComment] = useState('')

    const handleCommentChange = (e) => {
        e.preventDefault();
        console.log('c === ', e.target.value);
        setComment(e.target.value)
    }

    return (
        <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                <label for="comment" class="sr-only">Your comment/post</label>
                <textarea id="comment" type='text' value={comment} onChange={handleCommentChange} rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment/post..." required></textarea>
            </div>
            <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                <button onClick={() => props.postCommentToCause(comment)} class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-purple-700 rounded-lg focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-900 hover:bg-purple-800">
                    Post comment
                </button>
            </div>
        </div>
    )
}