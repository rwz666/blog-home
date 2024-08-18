import { dayjs } from "element-plus"



// 时间
export const getCurrentTime = () => {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
  let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  let second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
  let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
  let currentTime = {
    year,
    month,
    day,
    hour,
    minute,
    second,
    weekday: weekday[date.getDay()]
  }
  return currentTime
}
// 定义时间单位
enum OpUnitType {
  hour = 'hour',
  day = 'day',
  week = 'week',
  month = 'month',
  year = 'year',
}
// 定义标题
const titleMap: { [key: string]: string } = {
  day: '今天',
  week: '本周',
  month: '本月',
  year: '本年',
}
export const getTimeCapsule = () => {

  let now = dayjs()

  const getDiffer = (unit: OpUnitType) => {
    const startTime = now.startOf(unit)
    const endTime = now.endOf(unit)
    // console.log('startTime', startTime, endTime)
    let type = unit === OpUnitType.day ? OpUnitType.hour : OpUnitType.day
    let allTime = endTime.diff(startTime, type)//总共的时间
    // 由于hour和week是从0开始，因此需要加1
    if (unit === OpUnitType.day || unit === OpUnitType.week) {
      allTime += 1
    }
    // console.log('allTime', allTime)
    let alreadyTime = now.diff(startTime, type) //已经过去的时间
    let remainTime = allTime - alreadyTime //剩余的时间
    let percentage = ((alreadyTime / allTime) * 100).toFixed(2) //百分比
    return {
      title: titleMap[unit.toString()],
      allTime,
      alreadyTime,
      remainTime,
      percentage
    }
  }
  // 封装对象
  let timeCapsule = {
    day: getDiffer(OpUnitType.day),
    week: getDiffer(OpUnitType.week),
    month: getDiffer(OpUnitType.month),
    year: getDiffer(OpUnitType.year),
  }
  return timeCapsule
}