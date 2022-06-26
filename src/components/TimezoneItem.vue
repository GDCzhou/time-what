<script lang="ts" setup>
import { homeoffset } from '../composable/state'
import type { Timezone } from '../composable/types'

const { timezone } = defineProps<{
  timezone: Timezone
}>()
const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: timezone.name,
  // hour12: false,
  hour: 'numeric',
  minute: 'numeric',
  // second: 'numeric',
  // timeZoneName: 'short',
})
const state = $computed(() => timezone.name.split('/')[0].replace(/_/g, ' '))
const city = $computed(() => timezone.name.split('/')[1]?.replace(/_/g, ' ') || '')
const offset = $computed(() => {
  const offset = timezone.offset - homeoffset.value
  return offset > 0 ? `+${offset}` : offset
},
)
const time = computed(() => formatter.format(now.value))
</script>

<template>
  <div flex gap2 py1 items-center flex-auto>
    <div v-if="!offset" i-carbon-home font-mono font-600 w-10 ma text-cente text-xl />
    <div v-else font-mono font-600 w-10 ma text-center>
      {{ offset }}
    </div>
    <div flex="~ col" flex-auto>
      <div font-sans text-xl text-left font-500>
        {{ city }}<sup border="~ base rounded" p="x1" ml1 inline-black>{{ timezone.abbr }}</sup>
      </div>
      <div op50 text-sm text-left>
        {{ state }}
      </div>
    </div>
    <div text-right pr2 font-600 tabular-nums>
      {{ time }}
    </div>
  </div>
</template>

<style></style>
