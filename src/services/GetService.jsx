import axios from "axios";
const apis = import.meta.env.VITE_NEWS_API_KEY;
const api = axios.create({
    baseURL: `https://newsapi.org/v2/`,
})
const postApi = axios.create({
    baseURL:`https://api.pujakaitem.com/api/`,
})

export const getTopHeadline = () => {
    return api.get(`top-headlines?country=us&category=business&apiKey=${apis}`)
}
export const getMentioningApple = () => {
    return api.get(`everything?q=apple&from=2025-02-11&to=2025-02-11&sortBy=popularity&apiKey=${apis}`)
}
export const getTesla = () => {
    return api.get(`everything?q=tesla&from=2025-01-12&sortBy=publishedAt&apiKey=${apis}`)
}
export const getTechCrunch = () => {
    return api.get(`top-headlines?sources=techcrunch&apiKey=${apis}`)
}
export const getWallStreet = () => {
    return api.get(`everything?domains=wsj.com&apiKey=${apis}`)
}


// For Tantack Qurey 
export const getPostsApiData = async()=>{
    const post = await postApi.get("products")
    return post.status === 200 ? post.data : []
}


export const pagination = async(pagenumber)=>{
    const news = await api.get(`top-headlines?country=us&category=business&page=${pagenumber}&pageSize=3&apiKey=${apis}`)
    return news.status === 200 ? news.data : []

}
