<script setup lang="ts">
import { homeZone, zones } from '../composable/state'
import type { Timezone } from '~/composable/types'

let currentindex = $ref(0)
const dragOver = (e: DragEvent, index: number) => {
  const temp = zoneNames.value[currentindex]
  zoneNames.value[currentindex] = zoneNames.value[index]
  zoneNames.value[index] = temp
  currentindex = index
}
const dragStart = (e: DragEvent, index: number) => {
  currentindex = index
}
</script>

<template>
  <div relative>
    <div
      v-for="zone, idx of zones"
      :key="zone.name"
      v-drag="idx"
      border="~ b base rounded"
      bg-hover
      relative
      flex
      items-center
    >
      <TimezoneItem :timezone="zone" cursor-move />
      <TimeSelect :timezone="zone" />
      <div absolute top-0 bottom-0 left="-8" flex="~ col" justify-center z-999>
        <button
          i-carbon-close
          icon-hover
          title="remove"
          @click="remove(zone)"
        />
        <button
          v-if="zone.name !== homeZone"
          i-carbon-home
          icon-hover
          title="swap"
          @click="switchTimeZone(zone)"
        />
      </div>
    </div>
  </div>
</template>
