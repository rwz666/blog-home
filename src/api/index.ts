

/**
 * 一言接口
 * 地址：https://v1.hitokoto.cn/
 */
export const getHitokoto = async () => {
  const res = await fetch("https://v1.hitokoto.cn/");
  return res.json()
}
/**
 * 一言备用1
 * 地址：https://tenapi.cn/v2/yiyan
 */
export const getOtherHitokoto = async () => {
  const url = new URL("https://tenapi.cn/v2/yiyan");
  url.searchParams.append('format', 'json');
  const res = await fetch(url);
  return await res.json();
}


/**
 * 地址：https://api.oioweb.cn/api/weather/GetWeather
 * 来源：教书先生api
 * @returns 获取天气
 */
export const getOtherWeather = async () => {
  const res = await fetch("https://api.oioweb.cn/api/weather/GetWeather");
  return await res.json();
}

/**
 * 地址：http://t.weather.itboy.net/api/weather/city/${cityCode}
 * @parameter: cityCode 城市代码
 * 来源：https://www.itboy.net/
 * 未使用
 * @returns 获取天气
 */
export const getWeather = async (cityCode: string) => {
  const res = await fetch(`http://t.weather.itboy.net/api/weather/city/${cityCode}`);
  return await res.json();
}