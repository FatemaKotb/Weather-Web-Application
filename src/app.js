const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars: engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        myName: 'Fatema Kotb',
        pageTitle: 'Weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        myName: 'Fatema Kotb',
        pageTitle: 'About Me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        myName: 'Fatema Kotb',
        pageTitle: 'Help',
        message: 'More articles about how you can use this weather app will be added soon!'
    })
})

/**No one should access this link manually, however, when clicking on the search button
 * in the "Home" page, a request for this URL is made*/
app.get('/weather', (req, res) => {
    const city = req.query.search

    if (!city) {
        return res.send({ error: 'You must provide a search term!' })
    }

    geocode(city, (geocodeError, { latitude, longitude } = {}) => {
        if (geocodeError) {
            return res.send({ error: geocodeError })
        }

        forecast(latitude, longitude, (forecastError, { location, temperature, feels_like, humidity } = {}) => {
            if (forecastError) {
                return res.send({ error: forecastError })
            }

            res.send({
                location,
                forecast: `The temperature is ${temperature}°C but it feels like ${feels_like}°C due to a humidity of ${humidity}%.`
            })
        })
    })
})

//404 Pages
app.get('/about/*', (req, res) => {
    res.render('error404', {
        myName: 'Fatema Kotb',
        pageTitle: 'Error 404!',
        errorMes: 'Such page does not exist in the "About me" section!'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error404', {
        myName: 'Fatema Kotb',
        pageTitle: 'Error 404!',
        errorMes: 'Such page does not exist in the "Help" section!'
    })
})

app.get('/weather/*', (req, res) => {
    res.render('error404', {
        myName: 'Fatema Kotb',
        pageTitle: 'Error 404!',
        errorMes: 'Such page does not exist in the "Weather" section!'
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        myName: 'Fatema Kotb',
        pageTitle: 'Error 404',
        errorMes: 'Page not found!'
    })
})

app.listen(3000, () => { console.log('Server is up and running on port 3000') })