function main() {
    const form = document.getElementById("search-form") as HTMLFormElement;
    const Input = document.getElementById("city-input") as HTMLInputElement;
    const cityname = document.getElementById("city-name") as HTMLInputElement;
    const temperature = document.getElementById("temperature") as HTMLInputElement;
    const humidity = document.getElementById("humidity") as HTMLInputElement;
    const wind = document.getElementById("wind-speed") as HTMLInputElement;
    const weathericon = document.getElementById("weather-icon") as HTMLInputElement;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (Input.value == "") {
            console.log("エラーが発生しました");
            return;
        }
        let placename: string = Input.value;
        const weather = await Getweather(placename);
        console.log(weather);
        cityname.textContent = weather.name;
        const celcius = weather.main.temp-273.15;
        temperature.textContent = celcius.toFixed(1);
        humidity.textContent = weather.main.humidity;
        wind.textContent = weather.wind.speed;
        const icon = weather.weather[0].icon;
        weathericon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    });
}

const apikey = import.meta.env.VITE_API_KEY;

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

    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`);
    if (!weatherResponse.ok) {
        throw new Error("天気データの取得に失敗しました");
    }
    const weather = await weatherResponse.json();
    return weather;
}

main();