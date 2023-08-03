let form = document.getElementById('form1')
form.addEventListener('submit', (m) => {
    m.preventDefault()
    console.log(document.getElementById('address').value)
    weatherFunction()
    form.reset()
})
const address = document.querySelector("#address");
const locationweb = document.querySelector("#locationweb");
const forecastweb = document.querySelector("#forecastweb");
const latitude = document.querySelector("#latitude");
const longitude = document.querySelector("#longitude");
const errorweb = document.querySelector("#errorweb");

let weatherFunction = async () => {
    try {
        const address = document.getElementById("address").value
        const res = await fetch('http://localhost:3000/weatherMes?address='+ address)
        const data = await res.json()
        console.log(data)
        if (data.error) {
            errorweb.innerText = data.error;
            locationweb.innerText = "";
            latitude.innerText = "";
            forecastweb.innerText = "";
        } else {
            setTimeout(() => {
                locationweb.innerText = data.location;
            }, 500);
            setTimeout(() => {
                latitude.innerText = data.latitude;
            }, 1000);
            setTimeout(() => {
                longitude.innerText = data.longtitude;
            }, 1500);
            setTimeout(() => {
                forecastweb.innerText = data.forecast;
            }, 2000);
            errorweb.innerText = "";
        }
    } catch (m) {
        console.log(m)
    }
}
