import timezoneRow from 'timezones.json'
import type { Timezone } from './types'

export interface State {
  homezone: string
  zones: string[]
  date: Date
}
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

export const storage = useStorage<State>('home-zone', {
  homezone: userTimezone,
  zones: [userTimezone],
  date: new Date(),
})

// 定时器
export const now = useNow({ interval: 10_000 })
// export const zones = $ref<Timezone[]>([])
// 本地存储
export const zoneNames = toRef(storage.value, 'zones')
// export const homeZone = computed(() => timezone.find(t => t.name === storage.value.homezone))
export const homeZone = toRef(storage.value, 'homezone')

export const homeoffset = computed(() => timezone.find(t => t.name === storage.value.homezone)?.offset || 0)

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

export const switchTimeZone = (timezone: Timezone) => {
  homeZone.value = timezone.name
}
