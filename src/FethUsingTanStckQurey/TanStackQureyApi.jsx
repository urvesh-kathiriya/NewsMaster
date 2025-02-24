import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { getPostsApiData } from '../services/GetService'
import logo from "../assets/logo.png"
import { PropagateLoader } from 'react-spinners'
import { UserContext } from '../creactContext/UserInfoContext'
import { useNavigate } from 'react-router-dom'

function TanStackQureyApi() {
  const { userName, password } = useContext(UserContext);
  const navigate = useNavigate()

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPostsApiData,
    // gcTime:1000 //gc collecter
    //staleTime:5000, // it contains 5 second in the fresh in and no re-fetch api for 5 second
    //refetchInterval:1000, //re-fetch the data in the every 1 seconds  #polling
    //refetchIntervalInBackground:true, // re-fetch in every second if you in the page or not 
  })

  const handleDtetail = (index, posts) => {
    return userName && password ? navigate(`/postDetail/${index}`, { state: { posts } }) : navigate("/login")
  };

  if (isPending) return <div className="flex justify-center items-center h-screen"><PropagateLoader size={15} /></div>;
  if (isError) return <p className="text-center text-red-500">{error.message}</p>;
  return (
    <div>
      <h1 className='flex justify-center items-center text-4xl text-yellow-600 pb-4'>
        TanStackQurey Api Fetching.....
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-5">

        {data?.map((posts, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-black bg-white border shadow-lg drop-shadow-2xl rounded-2xl p-5"
            onClick={()=>{handleDtetail(index,posts)}}
          >

            <img
              className="size-72 object-cover rounded-md drop-shadow-xl"
              alt="posts"
              src={posts.image || logo}
              loading="lazy"
            />

            <div className="flex flex-col items-center text-center mt-4">
              <span className="text-2xl font-medium">{posts.name}</span>
              <span className="text-2xl font-medium">{posts.company}</span>
              <span className="text-2xl font-medium">{posts.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TanStackQureyApi
