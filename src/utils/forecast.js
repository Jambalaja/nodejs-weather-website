const request = require('request')

const forecast = (long, lat, callback) => {

    const url = 'https://api.darksky.net/forecast/384cabdfc4c6e0659769bd5d0e2ab972/' + long + ',' + lat + '?units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined) 
        } else {
            callback(undefined, body.daily.data[0].summary + ' There is currently ' + body.currently.temperature + ' Celcius out. There is a ' + body.currently.precipProbability + ' chance of rain.')
        }
    })
}

module.exports = forecast