fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		document.getElementById("author").textContent = `Photo By: ${data.user.name}`
    })
    .catch(err => {
        // Use a default background image/author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
		document.getElementById("author").textContent = `By: Dodi Achmad`
    })

function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-gb", {timeStyle: "short"})
}

setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <div class="weather-info">
                    <img src=${iconUrl} />
                    <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                </div>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});

fetch(`https://openexchangerates.org/api/latest.json?app_id=8b5acc90a9104d8aa2fa0116087259db&base=USD&symbols=TRY,XAU`)
    .then( res => {
        if(!res.ok){
            throw Error("exchange data is not available")
        }
        else {
            return res.json()   
        }
    })
    .then(data => {
        console.log(data)
        const grAltin = (1 / data.rates.XAU) * (data.rates.TRY / 31.10)
        console.log(grAltin)
        document.getElementById("usd-try").textContent = `💲 ${(Math.round(data.rates.TRY * 100) / 100 ).toFixed(2)} ₺`
        document.getElementById("xau-try").textContent = `🌕 ${Math.round(grAltin)} ₺`
    })
    .catch(err => console.error(err))
