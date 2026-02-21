/* eslint-disable no-unused-vars */
import './style.css'

const apiKeyWeather = 'PU9U9K8Q54VQL5429LNJFVMUM';
const apiKeyGif = 'hR1QMQqSHuBfxE0kNh92xoapGGrAnJbI&s';
 const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/tokyo?key=${apiKeyWeather}`;

async function getdata(){
    try{
        const respose=await fetch(url);
        const data=await respose.json()
        console.log(data)
    }
    catch(error){
        console.log(error)
    }
}

getdata();