import axios from 'axios';

const getAllNews = async (category) => {
    try{
        console.log("OOOOOOOOOOOOOOOOOOOO", category)
        
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=7b860b23bad141cda1bd2fcd728c2936`;
        ///const url = 'https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=7b860b23bad141cda1bd2fcd728c2936';

        const res = await axios.get(url);
        console.log(res.data.articles);
        return res.data.articles;
        
    } catch (error) {
        console.log("error in get all product ", error);
        throw error
    }
}

export default {
    getAllNews,
}