
import axios from 'axios';

const getAllCryptoData = async ({range,name}) => {
    try {
        const url = `https://api.coincap.io/v2/assets/${name}/history?interval=${range}`;
        const res = await axios.get(url);
        console.log("CRYPTO",res.data);
        return res.data;
        
    } catch (error) {
        console.log("error in Specific CRYPTO ", error);
        throw error
    }
}

const getCryptoList = async () => {
    try {
        const url = 'https://api.coincap.io/v2/assets';
        const res = await axios.get(url);
        console.log("CRYPTOLIST",res);
        return res;
        
    } catch (error) {
        console.log("error in get all CRYPTOLIST ", error);
        throw error
    }
}


const getCryptoCandle = async (name) => {
    try {
        console.log("NAME SERVICES",name)
        const url = `https://public.coindcx.com/market_data/candles/?pair=B-BTC_USDT&interval=1m`;
        const res = await axios.get(url);
        console.log("getCryptoCandle",res);
        return res;
        
    } catch (error) {
        console.log("error in getCryptoCandle ", error);
        throw error
    }
}



export default {
    getAllCryptoData,
    getCryptoList,
    getCryptoCandle
}