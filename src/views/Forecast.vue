<template>
  <div id="home" :class="weather.main?weather.main.toLowerCase():null" class="time-show">
    <div class="overlay-header">
      <div class="d-flex align-center direction-col">
        <h1>{{ cityName }} <img class="weather-icon" :src="`http://openweathermap.org/img/wn/${weather.icon}@2x.png`" width="40px" height="40px"> </h1>
        <span>{{currentTime}}</span>
      </div>
    </div>
    <div class="content">
      
    </div>
    <div class="blur">
      {{ weather.main }}
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
    ...mapActions(['fetchForecast']),
    changeTime: function(){
      this.currentTime = moment().format('LTS');
    } 
  },
  computed:{
    ...mapGetters(['forecast', 'city_id', 'weather']),
    cityName: function(){
      return this.forecast.name + (this.forecast? ', ' + this.forecast.sys.country : null)
    }
  },
  created(){
    this.fetchForecast();
    window.setInterval(this.changeTime, 1000);
  },
}
</script>
<style scoped>
.weather-icon{
  display: inline;
}
#home{
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.time-show{
  background-size: cover;
}

.clear{
  background-image: url('/images/clear-sky-02.jpg');
}

.rain{
  background-image: url('/images/rainy-sky.jpg');
}

.thunderstorm{
  background-image: url('/images/thunderstorm.jpg');
}

</style>