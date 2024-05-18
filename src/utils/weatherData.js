const request = require('request')

const weather = (location, callback) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?appid=806b9b96079667c132c2215fb8c075c9&q=${location}&units=metric`
    request({ url:URL, json:true}, (error, response) => {
        if(error){
            callback("unable to connect to loaction services!!", undefined)
        }
        else if(response.body && response.body.cod === "404"){
            callback("unable to find location", undefined)
        }
        else if(response.body && response.body.cod === 200){
            const { temp= 0, humidity } = response.body.main;
            callback(undefined,{ temp, humidity, place: location})
        }
        else{
            callback('An unexpected error occurred', undefined)
        }
    })
}

module.exports = weather;


