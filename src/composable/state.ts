import timezoneRow from 'timezones.json'
import type { Timezone } from './types'

// 获取用户的时区
const userTimezone = new window.Intl.DateTimeFormat().resolvedOptions().timeZone

export const timezone = timezoneRow.flatMap((i) => {
  return i.utc.map((u) => {
    return {
      name: u,
      offset: i.offset,
      isdst: i.isdst,
      abbr: i.abbr,
    }
  })
})
// 定时器
export const now = useNow({ interval: 30_000 })
// export const zones = $ref<Timezone[]>([])
// 本地存储
export const zoneNames = useStorage<string[]>('world-time-zone', [])

export const zones = computed(() =>
  zoneNames.value.map(name => timezone.find(i => i.name === name)),
)

export const addToTimezone = (timezone: Timezone) => {
  zoneNames.value.push(timezone.name)
}

export const remove = (timezone: Timezone) => {
  zoneNames.value = zoneNames.value.filter(i => i !== timezone.name)
}

export const moveZone = (timezone: Timezone, delta: number) => {
  const index = zoneNames.value.indexOf(timezone.name)
  if (index === -1)
    return
  const lastIndex = index + delta
  const temp = zoneNames.value[lastIndex]
  zoneNames.value[lastIndex] = zoneNames.value[index]
  zoneNames.value[index] = temp
}

if (!zones.value.length)
  zoneNames.value.push(userTimezone)

