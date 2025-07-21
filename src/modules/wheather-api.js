export async function getCity(cityName, local) {
  const API_KEY = '8d81bba310e447148df93623251607';
  const API_BASE_URL = 'https://api.weatherapi.com';
  const API_FORECAST_ENDPOINT = '/v1/forecast.json';

  const apiParams = new URLSearchParams({
    key: API_KEY,
    q: cityName,
    lang: local,
    days: 4,
    hour: 25,
  });
  const fetchPath = `${API_BASE_URL}${API_FORECAST_ENDPOINT}?${apiParams.toString()}`;
  try {
    const response = await fetch(fetchPath);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Weather API error [${errorData.error.code}] — ${errorData.error.message} (HTTP ${response.status})`
      );
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}

export async function getCityFake(cityName) {
  console.warn('fake response pending...');
  const data = `{"location":{"name":"${cityName}","region":"London","country":"United Kingdom","lat":51.5072,"lon":-0.1276,"tz_id":"Europe/London","localtime_epoch":1752667328,"localtime":"2025-07-16 19:02"},"current":{"last_updated_epoch":1752667200,"last_updated":"2025-07-16 19:00","temp_c":19,"temp_f":66.2,"is_day":1,"condition":{"text":"Переменная облачность","icon":"//cdn.weatherapi.com/weather/64x64/day/116.png","code":1003},"wind_mph":4.3,"wind_kph":6.8,"wind_degree":217,"wind_dir":"SW","pressure_mb":1005,"pressure_in":29.68,"precip_mm":0,"precip_in":0,"humidity":88,"cloud":37,"feelslike_c":19,"feelslike_f":66.2,"windchill_c":13.2,"windchill_f":55.7,"heatindex_c":13.4,"heatindex_f":56,"dewpoint_c":12.6,"dewpoint_f":54.7,"vis_km":10,"vis_miles":6,"uv":0.5,"gust_mph":8.9,"gust_kph":14.4},"forecast":{"forecastday":[{"date":"2025-07-16","date_epoch":1752624000,"day":{"maxtemp_c":24.4,"maxtemp_f":76,"mintemp_c":12,"mintemp_f":53.6,"avgtemp_c":17.2,"avgtemp_f":62.9,"maxwind_mph":13.4,"maxwind_kph":21.6,"totalprecip_mm":6.37,"totalprecip_in":0.25,"totalsnow_cm":0,"avgvis_km":6.2,"avgvis_miles":3,"avghumidity":82,"daily_will_it_rain":1,"daily_chance_of_rain":81,"daily_will_it_snow":0,"daily_chance_of_snow":0,"condition":{"text":"Moderate rain","icon":"//cdn.weatherapi.com/weather/64x64/day/302.png","code":1189},"uv":1.6},"astro":{"sunrise":"04:25 AM","sunset":"09:24 PM","moonrise":"11:09 PM","moonset":"11:13 AM","moon_phase":"Waning Gibbous","moon_illumination":72,"is_moon_up":1,"is_sun_up":0},"hour":[]},{"date":"2025-07-17","date_epoch":1752710400,"day":{"maxtemp_c":25.5,"maxtemp_f":77.9,"mintemp_c":12,"mintemp_f":53.6,"avgtemp_c":19.3,"avgtemp_f":66.8,"maxwind_mph":7.2,"maxwind_kph":11.5,"totalprecip_mm":0.19,"totalprecip_in":0.01,"totalsnow_cm":0,"avgvis_km":9.3,"avgvis_miles":5,"avghumidity":70,"daily_will_it_rain":1,"daily_chance_of_rain":89,"daily_will_it_snow":0,"daily_chance_of_snow":0,"condition":{"text":"Patchy rain possible","icon":"//cdn.weatherapi.com/weather/64x64/day/176.png","code":1063},"uv":1.5},"astro":{"sunrise":"04:26 AM","sunset":"09:23 PM","moonrise":"11:16 PM","moonset":"12:43 PM","moon_phase":"Last Quarter","moon_illumination":62,"is_moon_up":1,"is_sun_up":1},"hour":[]},{"date":"2025-07-18","date_epoch":1752796800,"day":{"maxtemp_c":28.7,"maxtemp_f":83.6,"mintemp_c":14.3,"mintemp_f":57.7,"avgtemp_c":21.7,"avgtemp_f":71,"maxwind_mph":9.6,"maxwind_kph":15.5,"totalprecip_mm":0.83,"totalprecip_in":0.03,"totalsnow_cm":0,"avgvis_km":10,"avgvis_miles":6,"avghumidity":63,"daily_will_it_rain":1,"daily_chance_of_rain":75,"daily_will_it_snow":0,"daily_chance_of_snow":0,"condition":{"text":"Patchy rain possible","icon":"//cdn.weatherapi.com/weather/64x64/day/176.png","code":1063},"uv":1.7},"astro":{"sunrise":"04:28 AM","sunset":"09:21 PM","moonrise":"11:24 PM","moonset":"02:17 PM","moon_phase":"Last Quarter","moon_illumination":50,"is_moon_up":1,"is_sun_up":1},"hour":[]},{"date":"2025-07-19","date_epoch":1752883200,"day":{"maxtemp_c":32.4,"maxtemp_f":90.3,"mintemp_c":12.5,"mintemp_f":54.5,"avgtemp_c":22,"avgtemp_f":71.6,"maxwind_mph":19,"maxwind_kph":30.6,"totalprecip_mm":0,"totalprecip_in":0,"totalsnow_cm":0,"avgvis_km":10,"avgvis_miles":6,"avghumidity":64,"daily_will_it_rain":0,"daily_chance_of_rain":0,"daily_will_it_snow":0,"daily_chance_of_snow":0,"condition":{"text":"Sunny","icon":"//cdn.weatherapi.com/weather/64x64/day/113.png","code":1000},"uv":1.7},"astro":{"sunrise":"04:29 AM","sunset":"09:20 PM","moonrise":"11:36 PM","moonset":"03:55 PM","moon_phase":"Waning Crescent","moon_illumination":39,"is_moon_up":1,"is_sun_up":1},"hour":[]}]}}`;
  return new Promise((resolve) => {
    setTimeout(() => {
      console.warn('fake response complete!');
      resolve({ success: true, data: JSON.parse(data) });
    }, 1000);
  });
}

const wheatherCodes = {
  sun: [1000, 1003],
  partlyRain: [1063, 1069, 1150, 1153, 1168, 1180, 1183, 1240],
  cloudSun: [
    1006, 1009, 1030, 1072, 1114, 1135, 1147, 1198, 1204, 1210, 1213, 1237,
  ],
  storm: [1087, 1273, 1276, 1279],
  snow: [1066, 1216, 1219, 1222, 1252, 1255, 1258],
  rain: [
    1171, 1186, 1189, 1192, 1195, 1201, 1207, 1225, 1243, 1246, 1249, 1261,
    1264, 1282,
  ],
};

export function getIconId(code) {
  if (wheatherCodes.sun.includes(code)) return 'sun';
  if (wheatherCodes.cloudSun.includes(code)) return 'cloud-sun';
  if (wheatherCodes.storm.includes(code)) return 'storm';
  if (wheatherCodes.snow.includes(code)) return 'snow';
  if (wheatherCodes.partlyRain.includes(code)) return 'partly-rain';
  if (wheatherCodes.rain.includes(code)) return 'cloud-rain';
  return 'default';
}
