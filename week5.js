// Goal: Implement a weather application using data from an external API
// - Signup for an api key @ https://weatherapi.com
// - The API takes three inputs (querystring parameters)
//   - key = your API key
//   - q = a location query (e.g. Chicago)
//   - days = number of days of forecast data to return, between 1-10
// - Example: https://api.weatherapi.com/v1/forecast.json?key=YOUR-API-KEY&q=Chicago&days=3
// - The basic recipe (algorithm) is included; write the rest of the recipe in the comments!
// - Lab: Follow the provided recipe and the "mock-up" provided in the hard-coded HTML; respond 
//        to the user filling out the location on the form by fetching the weather API and 
//        displaying the city/state, e.g. if the user enters "chicago" on the form, show "Current
//        Weather for Chicago, Illinois".
// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.
//https://api.weatherapi.com/v1/forecast.json?key=76bc372aa8524d89af111842213004&q=Chicago&days=3
window.addEventListener('DOMContentLoaded', async function() {
  // Get a reference to the "get weather" button
  let getWeatherButton = document.querySelector(`.get-weather`)
  // When the "get weather" button is clicked:
  getWeatherButton.addEventListener(`click`, async function(event){
    // - Ignore the default behavior of the button
    event.preventDefault()
    // - Get a reference to the element containing the user-entered location and forecast days
    let locationInput = document.querySelector(`#location`)
    let forecastInput = document.querySelector(`#days`)
    // - Get the user-entered location and the number of days from the element's value
    let location = locationInput.value
    let forecast = forecastInput.value
    //console.log(forecast)
    // - Check to see if the user entered anything; if so (bolting on the forecast days from the lab):
    if (location.length >0 && forecast > 0){
      // - Construct a URL to call the WeatherAPI.com API
      let url = `https://api.weatherapi.com/v1/forecast.json?key=76bc372aa8524d89af111842213004&q=${location}&days=${forecast}`
      // - Fetch the url, wait for a response, store the response in memory
      let response = await fetch(url)
      // - Ask for the json-formatted data from the response, wait for the data, store it in memory
      let json = await response.json()
      // - Write the json-formatted data to the JavaScript console
      console.log(json)
      // - Store the interpreted location, current weather conditions, the forecast as three separate variables
      let locationResult = json.location
      let forecastResult = json.forecast
      let currentResult = json.current
      // - Continue the recipe yourself!
      //equate forecast # to number returned from results to fix discrpeency between field enetered and return data (because free version only allows 3 day forecast)
      forecast = forecastResult.forecastday.length
      //reference current element
      let currentElement = document.querySelector(`.current`)
      //write current location to the current div
      currentElement.innerHTML = `
        <div class="text-center space-y-2">
        <div class="font-bold text-3xl">Current Weather for ${locationResult.name}, ${locationResult.region}</div>
        <div class="font-bold">
          <img src="https://cdn.weatherapi.com/weather/64x64/day/116.png" class="inline-block">
          <span class="temperature">${currentResult.temp_f}</span>° 
          and
          <span class="conditions">${currentResult.condition.text}</span>
        </div>
      </div>
      `
      //Get and store the forecast div in memory
      let forecastElement = document.querySelector(`.forecast`)
      //Write the # of day forecast heading
      forecastElement.innerHTML = `
      <div class="text-center space-y-8">
        <div class="font-bold text-3xl">${forecast} Day Forecast</div>
      </div>
      `
      //iterate through the forecast list and populate the forecast for each day
      for (let i=0;i<forecastResult.forecastday.length;i++){
        //defeine a variable using the index for easier referencing in building HTML
        let forecastDay = forecastResult.forecastday[i]
        //build the HTML for the forecast
        forecastElement.insertAdjacentHTML(`beforeend`, `
        <div class="text-center space-y-8">
          <div>
            <img src="https://cdn.weatherapi.com/weather/64x64/day/116.png" class="mx-auto">
            <h1 class="text-2xl text-bold text-gray-500">${forecastDay.date}</h1>
            <h2 class="text-xl">High ${forecastDay.day.maxtemp_f}° – Low ${forecastDay.day.mintemp_f}°</h2>
            <p class="text-gray-500">${forecastDay.day.condition.text}</h1>
          </div>
        </div>
        `)
      }
    }
  })
})