const express = require('express')
const app = express()

const port = process.env.PORT || 3000


const path = require("path")
const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(path.join(__dirname, "../public")))
app.use(express.static(publicDirectory))


app.set('view engine', 'hbs');
const viewsDirectory = path.join(__dirname, "../parView/views")
app.set("views", viewsDirectory)

const hbs = require("hbs")
const partialspath = path.join(__dirname, "../parView/partials")
hbs.registerPartials(partialspath)



app.get('/', (req, res) => {
  res.render('index', {
    title: "Home Page",
    desc: "Welcome to Home Page"
  })
})

app.get('/weatherInfo', (req, res) => {
  res.render('weatherInfo', {
    title: "Check Weather Page",
    country: "Egypt",
    latitude: 26.4941838299718,
    longitude: 29.871903452398,
    current_weather: "Clear",
    temperature: 35
  })
})
app.get('/weather', (req, res) => {
  res.render('weather', {
    title: "Weather Page",
    desc: "Welcome to Weather Page"
  })
})


////////////////////////////////////////////////////////////////////////
const geocode = require('./tools/geocode')
const forecast = require('./tools/forecastFile')
app.get('/weatherMes' , (req,res) => {
  if(!req.query.address) {  
    return res.send({
      error : 'you must enter address'
    })
  }
  geocode(req.query.address , (error, data) => {
    if (error) {
      return res.send({error})
    } else {
      forecast(data.latitude , data.longtitude , (error , forecastData) => {
        if (error) {
          return res.send({error})
        } else {
          res.send({
            location : req.query.address,
            forecast : forecastData , 
            latitude : data.latitude ,
            longtitude : data.longtitude ,
          })
        }
      }) 
    }
  })
})

app.get("*", (req, res) => {  
  res.send("404 Not Fund");   
});

// Start the server
app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});

