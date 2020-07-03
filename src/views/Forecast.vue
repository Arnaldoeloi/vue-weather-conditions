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
      <div class="content">
        <div>
          {{ weather.main }}
        </div>
      </div>
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
.time-show{
  background-size: cover;
  background-image: url('/images/default.jpg');
}

.clear{
  background-image: url('/images/clear-sky-02.jpg');
}

.clouds{
  background-image: url('/images/cloudy.jpg');
}

.rain{
  background-image: url('/images/rainy-sky.jpg');
}

.thunderstorm{
  background-image: url('/images/thunderstorm.jpg');
}

</style>