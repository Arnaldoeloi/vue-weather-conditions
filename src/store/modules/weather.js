import axios from 'axios';

const state ={
    forecast: {},
    weather: {},
    // city_id: '3394023',
    city_id: '4499428',
}

const getters ={
    weather: (state)  => state.weather,
    forecast: (state) => state.forecast,
    city_id: (state)  => state.city_id,
}

const actions = {
    async fetchForecast({commit}){
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${state.city_id}&appid=${process.env.VUE_APP_OPEN_WEATHER_API_KEY}`);
        commit('setForecast', response.data);
    }
}

const mutations = {
    setForecast: (state, forecast) =>{
         state.forecast = forecast
         state.weather  = forecast.weather[0]
    },
}

export default{
    state,
    getters,
    actions,
    mutations
}