import axios from 'axios';

const state ={
    forecast: {},
    weather: {},
    city_id: '3394023',
    quote: 0,
    timezone: '',
    // city_id: '4499428',
}

const getters ={
    timezone: (state)  => state.timezone,
    quote:    (state)  => state.quote,
    weather:  (state)  => state.weather,
    forecast: (state)  => state.forecast,
    city_id:  (state)  => state.city_id,
}

const actions = {
    async fetchForecast({commit}){
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?id=${state.city_id}&appid=${process.env.VUE_APP_OPEN_WEATHER_API_KEY}`);
        commit('setForecast', response.data);
    },
    async fetchQuote({commit}){
        const response = await axios.get(`https://api.quotable.io/random`, {
            params: {
                tags: 'famous-quotes',
            }
        });
        commit('setQuote', response.data);
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
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}