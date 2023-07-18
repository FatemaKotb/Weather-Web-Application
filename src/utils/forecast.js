const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const URLweather = `http://api.weatherstack.com/current?access_key=69af12fe0df177f40f05bdd46a3443db&query=${latitude},${longitude}&units=m`

    request({ url: URLweather, json: true }, (error, { body: rBody }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (rBody.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
                location: `${rBody.location.name}, ${rBody.location.country}`,
                temperature: rBody.current.temperature,
                feels_like: rBody.current.feelslike,
                humidity: rBody.current.humidity
            })
        }
    })
}

module.exports = forecast