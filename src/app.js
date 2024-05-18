// Require libaries
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const weather = require('./utils/weatherData')

// calling express functions
const app = express()

//Port number
const PORT = 3000

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlerbars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

// Setting up the routes
app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Avinash Vishwakarma'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title : 'About Page by HBS',
        name : 'Avinash Vishwakarma'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help page by HBS',
        name: 'Avinash Vishwakarma'
    })
})

app.get("/weather", (req,res) => {
    if(!req.query.address){
        return res.send({
            error : 'You must provide Address'
        })
    }
    weather(req.query.address, (err, { temp, humidity, place} = {}) => {
        if(err){
            return res.send({
                error : 'Unable to fetch weather data'
            })
        }
        else if (temp === 'undefined'){
            // console.log(`Its currently ${temp} degrees celcious in ${place}, and humidity is ${humidity}!!`)
            res.send({
                error : 'No Data'
            })
        }
        else{
            res.send({
                address : place,
                temp : temp,
                humidity : humidity
            })
        }
    })

    console.log(req.query.address)
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    res.send({
        products : []
    })
    console.log(req.query.search)
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title : '404 Page',
        errorMsg : 'Help article not found',
        name : 'Avinash Vishwakarma'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title : '404 Page',
        errorMsg : 'Page Not Found',
        name: 'Avinash Vishwakarma'
    })
})

// App listing on Port 
app.listen(PORT, () => {
    console.log(`Server is up and running on Port ${PORT}`)
})

