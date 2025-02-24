import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../creactContext/UserInfoContext';
import { pagination } from '../services/GetService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import logo from "../assets/logo.png"
import moment from 'moment';
import { animate } from 'framer-motion';
import { PropagateLoader } from 'react-spinners';

const Pagination = () => {
    const [pagenumber, setPagenumber] = useState(1)
    const { userName, password } = useContext(UserContext);
    const navigate = useNavigate()

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["news", pagenumber],
        queryFn: () => pagination(pagenumber),
        placeholderData : keepPreviousData,
    })

    const totalPages = data ? Math.ceil(data.totalResults / 3) : 1;
    const isLastpage = pagenumber === totalPages

    const handleDtetail = (index, news) => {
        return userName && password ? navigate(`/Detail/${index}`, { state: { news } }) : navigate("/login")
    };
    if (isPending) return <div className="flex justify-center items-center h-screen"><PropagateLoader size={15} /></div>;
    if (isError) return <p className="text-center text-red-500">{error.message}</p>;
    return (
        <div className=''>
            <div>
                <h1 className='flex justify-center items-center text-4xl text-yellow-600 pb-4'>
                    Pagination Using Api Fetching.....
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5">

                    {data.articles?.map((news, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-black bg-white border shadow-lg drop-shadow-2xl rounded-2xl p-5"
                            onClick={() => { handleDtetail(index, news) }}
                        >

                            <img
                                className="size-72 object-cover rounded-md drop-shadow-xl"
                                alt="News"
                                src={news.urlToImage || logo}
                                loading="lazy"
                            />



                            <div className={`w-full h-[2px] bg-red-600 ${animate ? "line-animation" : ""} mt-4`}></div>


                            <div className="flex flex-col items-center text-center mt-4">
                                <span className="text-2xl font-medium">{news.title}</span>
                                <span className="text-gray-400 text-sm mt-2">
                                    {moment(news.publishedAt).format("DD-MMMM-YYYY (dddd) HH:mm A")}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex justify-center items-center gap-4 mt-3'>
                <button className='flex' disabled={pagenumber === 1 } onClick={() => setPagenumber((prev) => prev - 1)}>
                    <ArrowLeftIcon /> Prev
                </button>
                <p>{pagenumber}</p>
                <button className='flex' disabled={isLastpage} onClick={() => setPagenumber((prev) => prev + 1)}>
                    Next <ArrowRightIcon />
                </button>
            </div>
        </div>
    )
}

export default Pagination
