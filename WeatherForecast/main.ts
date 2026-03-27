import dotenv from "dotenv";
dotenv.config();

const apikey=process.env.api_key;
async function Getweather(){
     const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${apikey}`);
     if(!response.ok){
          throw new Error("データの取得に失敗しました");
     }
     const location = await response.json();
     const { lat, lon } = location[0];

const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`);
     if(!weatherResponse.ok){
          throw new Error("天気データの取得に失敗しました");
     }
     const weather = await weatherResponse.json();
}

const place=document.getElementById("info-text") as HTMLFormElement;
place.addEventListener("submit",(e)=>{
     e.preventDefault();
     if(place.value==""){
          throw new Error("エラーが発生しました");
     }
})
