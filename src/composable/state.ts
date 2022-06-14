import timezoneRow from 'timezones.json'
import type { Timezone } from './types'

export const timezone = timezoneRow.flatMap((i) => {
  return i.utc.map((u) => {
    return {
      name: u,
      offset: i.offset,
      isdst: i.isdst,
    }
  })
})

export const zones = $ref<Timezone[]>([])
export const addToTimezone = (timezone: Timezone) => {
  zones.push(timezone)
}
