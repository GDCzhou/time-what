<script lang="ts" setup>
import { format } from 'date-fns'
import type { Timezone } from '~/composable/types'

const { timezone } = defineProps<{ timezone: Timezone }>()
const hours = Array.from({ length: 24 }, (_, i) => i + 1 + timezone.offset)
const lastDay = $computed(() =>
  hours.filter(t => t < 0).map(i => (i + 24) % 24),
)
const today = $computed(() => hours.filter(t => t >= 0 && t < 24))
const tomarrow = $computed(() =>
  hours.filter(t => t >= 24).map(i => (i + 24) % 24),
)
const days = $computed(() => [lastDay, today, tomarrow])
function colors(num: number) {
  if ((num > 0 && num <= 5) || (num > 21 && num <= 23))
    return 'bg-1-5'
  if ((num > 5 && num <= 7) || (num >= 18 && num <= 21))
    return 'bg-6-7'
  if (num > 7 && num <= 17)
    return 'bg-8-17'
}
</script>

<template>
  <div flex gap1>
    <template
      v-for="(day, i) of days"
      :key="i"
    >
      <div
        v-if="day.length"
        flex border="rounded"
        of-hidden
      >
        <div
          v-for="t of day" :key="t"
          w7
          h8
          flex
          justify-center
          items-center
          :class="[
            colors(t), t === 0 ? 'bg-0' : '',
          ]"
        >
          <div v-if="t">
            {{ t }}
          </div>
          <div v-else text-xs text-center text-cyan6 leading="1.2em">
            {{ format(now.value, 'MMM') }}
            {{ format(now.value, 'dd') }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style>
  .bg-0 {
    background-color: #8ba3c9;
  }
  .bg-1-5,.bg-22-23 {
    background-color: #95b3d7;
  }
  .bg-6-7,.bg-18-21 {
    background-color: #6dc1da;
  }
  .bg-8-17 {
    background-color: #d68989;
  }
</style>
