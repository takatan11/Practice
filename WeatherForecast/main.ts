const form = document.getElementById("search-form") as HTMLFormElement;
    const Input = document.getElementById("city-input") as HTMLInputElement;
    const cityname = document.getElementById("city-name") as HTMLInputElement;
    const temperature = document.getElementById("temperature") as HTMLInputElement;
    const humidity = document.getElementById("humidity") as HTMLInputElement;
    const wind = document.getElementById("wind-speed") as HTMLInputElement;
    const weathericon = document.getElementById("weather-icon") as HTMLImageElement;
    const apikey = import.meta.env.VITE_API_KEY;
    const error = document.getElementById("error-text") as HTMLDivElement;

function main() {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        if (Input.value == "") {
            error.textContent = "都市名を入力してください";
            return;
        }

        try {
            // 成功するかもしれない（エラーが起きるかもしれない）処理を try の中に入れる
            let placename: string = Input.value;
            const weather = await Getweather(placename); // ここでエラーが起きると、即座にcatchに飛ぶ
            
            console.log(weather);
            cityname.textContent = weather.name;
            const celcius = weather.main.temp - 273.15;
            temperature.textContent = celcius.toFixed(1);
            humidity.textContent = weather.main.humidity;
            wind.textContent = weather.wind.speed;
            const icon = weather.weather[0].icon;
            weathericon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            
            // 無事に取得できたらエラー表示を消す
            error.textContent = "";
            
        } catch (err: any) {
            // throw new Error(...) で投げられたエラーをここで受け取り、画面に出す
            console.error(err);
            error.textContent = err.message;
        }
    });
}

async function Getweather(placename: string) {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${placename}&limit=5&appid=${apikey}`);
    if (!response.ok) {
        throw new Error("データの取得に失敗しました");
    }
    const location = await response.json();
    if (!location || location.length === 0) {
        throw new Error("都市が見つかりません");
    }
    const { lat, lon } = location[0];

    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&lang=ja`);
    if (!weatherResponse.ok) {
        throw new Error("天気データの取得に失敗しました");
    }
    const weather = await weatherResponse.json();
    return weather;
}

main();