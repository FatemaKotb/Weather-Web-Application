const request = require('postman-request')

const geocode = (address, callback) => {
    const URLposition = `http://api.positionstack.com/v1/forward?access_key=85b76b08d3dd7daa2eb3a3bdcf24407e&query=${encodeURIComponent(address)}&limit=1&output=json`

    request({ url: URLposition, json: true }, (error, { body: rBody }) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (!rBody.data) {
            callback('Unable to find location!', undefined)
        } else if (rBody.data.length === 0) {
            callback('Unable to find location!', undefined)
        } else {
            const rData = rBody.data[0]
            callback(undefined, {
                city: rData.name,
                latitude: rData.latitude,
                longitude: rData.longitude
            })
        }
    })
}

module.exports = geocode