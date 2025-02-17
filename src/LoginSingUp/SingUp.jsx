import React from 'react'
import { useNavigate } from 'react-router-dom'

const SingUp = () => {
    const Navigate = useNavigate()
    return (
        <div>
            <div onClick={() => { Navigate("/login") }}>Back To Login</div>
            <div className='flex justify-center items-center text-red-700 text-6xl'>
                <h1>singup page is on the way!!! </h1>
            </div>
        </div>
    )
}

export default SingUp
