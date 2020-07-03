<template>
  <div id="home" :class="weather.main?weather.main.toLowerCase():null" class="time-show">
    <div class="wrapper blur">
      <div class="overlay-header direction-row align-center justify-center">
        <div class="d-flex align-center direction-col">
          <h1>{{ cityName }}</h1>
          <span>{{currentTime}}</span>
        </div>
        <div class="weather-icon">
          <img  :src="`http://openweathermap.org/img/wn/${weather.icon}@2x.png`"> 
        </div>
      </div>
      <div class="content justify-center align-center flex-column">
        <div class="quote-container">
            <h1 class="quote">
              <i class="fa fa-quote-right" aria-hidden="true"></i>
              {{quote.content}}  
            </h1>
            <p class="text-align-center">
              <span class="author">— {{quote.author}}</span>
            </p>
        </div>  
      </div>
      <footer class="content d-flex direction-row spc-between">
          <div class="d-flex align-center justify-center">
            <h3 class="capitalize-first">{{ weather.main }}</h3>
          </div>
          <div>
            <h3>{{ temperatureCelsius }}°C</h3>
          </div>
      </footer>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Forecast',
  data() {
    return {
      currentTime: '00:00:00 AM',
    }
  },
  components: {
  },
  methods: {
    ...mapActions(['fetchForecast','fetchQuote', 'askForCurrentPosition']),
    changeTime: function(){
      this.currentTime = moment.utc().add(this.timezone).format('LTS');
      // this.currentTime = moment().add(this.forecast?.timezone, 'seconds').tz().format('LTS');
    } 
  },
  computed:{
    ...mapGetters(['forecast', 'city_id', 'weather', 'quote', 'timezone', 'currentUserPosition']),
    cityName: function(){
      return this.forecast.name + (this.forecast? ', ' + this.forecast?.sys?.country : null)
    },
    temperatureCelsius: function(){
      return (this.forecast?.main?.temp - 273.15).toFixed(2);
    }
  },
  created(){
    if(this.askForCurrentPosition())
    this.fetchForecast();
    this.fetchQuote();
    window.setInterval(this.changeTime, 1000);
  },
}
</script>
<style scoped>
footer{
  padding: 10px 50px;
}

.time-show{
  background-size: cover;
  background-image: url('images/default.jpg');
}

.drizzle{
  background-image: url('images/drizzle.jpg');
}

.snow{
  background-image: url('images/snow.jpg');
}

.mist{
  background-image: url('images/mist.jpg');
}

.smoke{
  background-image: url('images/smoke.jpg');
}

.haze{

}

.dust{
  background-image: url('images/dust.jpg');
}

.fog{
  background-image: url('images/fog.jpg');
}

.sand{
  background-image: url('images/sand.jpg');
}

.ash{
  background-image: url('images/ash.jpg');
}

.squall{
  background-image: url('images/squall.jpg');
}

.tornado{
  background-image: url('images/tornado.jpg');
}

.clear{
  background-image: url('images/clear-sky-02.jpg');
}

.clouds{
  background-image: url('images/cloudy.jpg');
}

.rain{
  background-image: url('images/rainy-sky.jpg');
}

.thunderstorm{
  background-image: url('images/thunderstorm.jpg');
}

</style>