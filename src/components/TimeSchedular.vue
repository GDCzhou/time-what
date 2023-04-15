<script setup lang="ts">
import { homeZone, zones } from '../composable/state'
</script>

<template>
  <div relative mt2>
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
        />
        <button
          v-if="zone.name !== homeZone"
          i-carbon-home
          icon-hover
          title="swap"
        />
      </div>
    </div>
  </div>
</template>
