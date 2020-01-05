const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectory))

// how to set routes for domain
// app.com  (domain)
// app.com/help (route)
// app.com/about (route)

// --> with app.get()

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Alex'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Alex'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        description: 'Help description...',
        title: 'Help',
        name: 'Alex'
    })
})

//this is called endpoint
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecatData) => {
            if (error) {
                return res.send({ error })
            }
    
            res.send({
                forecast: forecatData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Alex',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: 'Alex',
        errorMessage: 'Page not found'
    })
})


// port 3000 is a common development port
app.listen(port, () => {
    console.log('Server is up on port' + port + '.')
})
