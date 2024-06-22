import axios from 'axios';

const getAllNews = async (data) => {
    try {
        const url = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7b860b23bad141cda1bd2fcd728c2936';
        const res = await axios.get(url);
        console.log(res.data.articles);
        return res.data.articles;
        
    } catch (error) {
        console.log("error in get all product ", error);
        throw error
    }
}

export default {
    getAllNews
}