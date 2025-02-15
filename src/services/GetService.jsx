import axios from "axios";
const apis = import.meta.env.VITE_NEWS_API_KEY;
const api = axios.create({
    baseURL: `https://newsapi.org/`,
})

export const getTopHeadline = () => {
    return api.get(`v2/top-headlines?country=us&category=business&apiKey=${apis}`)
}
export const getMentioningApple = () => {
    return api.get(`v2/everything?q=apple&from=2025-02-11&to=2025-02-11&sortBy=popularity&apiKey=${apis}`)
}
export const getTesla = () => {
    return api.get(`v2/everything?q=tesla&from=2025-01-12&sortBy=publishedAt&apiKey=${apis}`)
}
export const getTechCrunch = () => {
    return api.get(`v2/top-headlines?sources=techcrunch&apiKey=${apis}`)
}
export const getWallStreet = () => {
    return api.get(`v2/everything?domains=wsj.com&apiKey=${apis}`)
}