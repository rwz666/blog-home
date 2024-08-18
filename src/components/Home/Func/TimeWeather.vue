<template>
  <div class="time-weather cards">
    <div class="time">
      <div class="date">
        <span>{{ currentTime.year }}&nbsp;年&nbsp;</span>
        <span>{{ currentTime.month }}&nbsp;月&nbsp;</span>
        <span>{{ currentTime.day }}&nbsp;日&nbsp;</span>

        <span>{{ currentTime.weekday }}</span>
      </div>
      <div class="text">
        <span>{{ currentTime.hour }}: {{ currentTime.minute }}: {{ currentTime.second }}</span>
      </div>
    </div>

    <div class="weather" @click="updateLocationAndWeather">
      <span>{{ city }}</span>
      <span>{{ weather }}</span>
      <span>{{ temperature }}℃</span>
      <span>{{ winddirection }}</span>
      <span>{{ windpower }}&nbsp;级</span>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { onMounted, reactive, ref, onBeforeUnmount } from 'vue';
import { getOtherWeather } from '@/api';
import { getCurrentTime } from '@/utils/getTime'
import debounce from '@/utils/debounce';

const mainKey = import.meta.env.VITE_BAIDU_MAP_KEY;

let currentTime = ref(getCurrentTime())

let timeInterval: number | undefined

onMounted(() => {
  // 1. 获取当前日期-时间
  getCurDateAndTime();
  timeInterval = setInterval(getCurDateAndTime, 1000)
  // 2. 获取位置和天气
  getLocationAndWeather();
})
onBeforeUnmount(() => {
  clearInterval(timeInterval)
})
const getCurDateAndTime = () => {
  currentTime.value = getCurrentTime()

}



// 2. 获取天气和位置
let city = ref('未知地区');
let temperature = ref(-1);
let weather = ref('晴');
let winddirection = ref('风向')
let windpower = ref('风力')


// 2.1 定义对象存储信息
const weatherData = reactive({
  weather: {
    weather: '', // 天气
    temperature: null as any, // 温度
    winddirection: '', // 风向
    windpower: '', // 风力
    humidity: '', // 湿度
    reporttime: null, // 报告时间
  },
  location: {
    lat: 0,
    lng: 0,
    city: '',
    district: '',
    street: '',
    street_number: '',
    adcode: null, // 行政区划代码
  }
})
// 2.2 获取位置信息（navigator 和 百度地图）
const getLocation = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    // 获取经纬度
    weatherData.location.lat = position.coords.latitude;
    weatherData.location.lng = position.coords.longitude;
    let myGeo = new BMapGL.Geocoder();
    // 根据经纬度获取地址信息
    myGeo.getLocation(new BMapGL.Point(weatherData.location.lng, weatherData.location.lat), function (result: any) {
      Object.assign(weatherData.location, result.addressComponents);
      // console.log('location:', weatherData.location);
      // console.log(result.addressComponents)
    });
  }, function (error) {
    console.error('获取位置信息错误', error);
  });
  if (city.value == null || city.value == '') {
    city.value = '未知地区'
  }
}
// 2.3 获取天气
function getTemperature(max_degree: number, min_degree: number) {
  try {
    let avg = Math.round((max_degree + min_degree) / 2);
    return avg;
  } catch (error) {
    console.error(error);
    return 'NaN';
  }
}
// 获取天气信息
const getWeatherData = async () => {
  const result = await getOtherWeather();
  const data = result.result;
  const condition = data.condition
  weatherData.weather = {
    weather: condition.day_weather,
    winddirection: condition.day_wind_direction,
    windpower: condition.day_wind_power,
    temperature: getTemperature(Number(condition.max_degree), Number(condition.min_degree)),
    humidity: condition.day_humidity,
    reporttime: data.reporttime
  }
}

const updateLocationAndWeather = () => {
  // 防抖 立即执行，每五秒可以执行一次
  debounce(getLocationAndWeather, 5000, true)
}
// 2.4 封装函数 给界面上的元素赋值
let requestCount = 3; //第一次页面刷新，防止请求失败，请求三次 限制请求次数
async function getLocationAndWeather() {
  getLocation();
  await getWeatherData();
  console.log('天气和位置信息', weatherData);
  city.value = weatherData.location.city;
  temperature.value = weatherData.weather.temperature;
  weather.value = weatherData.weather.weather;
  winddirection.value = weatherData.weather.winddirection;
  windpower.value = weatherData.weather.windpower;

  if (requestCount > 0 && (city.value === '' || city.value === '未知地区')) {
    requestCount--;
    setTimeout(() => {
      getLocationAndWeather();
    }, 2000)
  }
}

</script>



<style lang="scss" scoped>
.time-weather {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 10px;

  .time {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    text-align: center;

    .date {
      font-size: 1.1rem;
    }

    .text {
      font-size: 3rem;
      margin-top: 10px;
      letter-spacing: 2px;
      font-family: "UnidreamLED";
    }
  }

  .weather {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 10px;

  }

  @media (min-height: 160px) {
    .time {
      font-size: 1rem;

      .text {
        font-size: 3rem;
      }


    }



  }
}
</style>