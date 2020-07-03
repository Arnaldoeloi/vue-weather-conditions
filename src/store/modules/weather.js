import axios from 'axios';

const state ={
    forecast: {},
    weather: {},
    // city_id: '3394023',
    quote: 0,
    timezone: '',
    currentUserPosition: null,
    city_id: '1486209',
}

const getters ={
    timezone: (state)               => state.timezone,
    quote:    (state)               => state.quote,
    weather:  (state)               => state.weather,
    forecast: (state)               => state.forecast,
    currentUserPosition:  (state)   => state.currentUserPosition,
    city_id:  (state)               => state.city_id,
}

const actions = {
    async fetchForecast({commit}){
        if(state.currentUserPosition){
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${state.currentUserPosition.lat}&lon=${state.currentUserPosition.lon}&appid=${process.env.VUE_APP_OPEN_WEATHER_API_KEY}`);
                commit('setForecast', response.data);
        }else{
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?id=${state.city_id}&appid=${process.env.VUE_APP_OPEN_WEATHER_API_KEY}`);
                commit('setForecast', response.data);
        }
    },
    async fetchQuote({commit}){
        const response = await axios.get(`https://api.quotable.io/random`, {
            params: {
                tags: 'famous-quotes',
            }
        });
        commit('setQuote', response.data);
    },
    askForCurrentPosition: ({commit, dispatch}) =>{
        navigator.geolocation.getCurrentPosition((position) => {
            commit('setCurrentUserPosition', position);
            dispatch('fetchForecast');
            return {
                'lat': position.coords.latitude, 
                'lon': position.coords.longitude
            };
        }, function(err){
            return err;
        })
    }
}

const mutations = {
    setForecast: (state, forecast) =>{
         state.forecast = forecast
         state.weather  = forecast.weather[0]
         state.timezone = forecast?.timezone * 1000
    },
    setQuote: (state, quote) => {
        state.quote = quote;
    },
    setCurrentUserPosition: (state, position) => {
        state.currentUserPosition = {
            lat: position.coords.latitude, 
            lon: position.coords.longitude
        }
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}