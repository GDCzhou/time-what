<script setup lang="ts">
import { zones } from '../composable/state'
</script>

<template>
  <div>
    <div
      v-for="zone, idx of zones"
      :key="zone.name"
      border="~ b base rounded"
      bg-hover
      relative
    >
      <TimezoneItem :timezone="zone" />
      <div absolute top-0 bottom-0 left="-8" flex="~ col" justify-center>
        <button
          i-carbon-close
          icon-hover
          @click="remove(zone)"
        />
        <button
          v-if="idx !== 0"
          i-carbon-caret-up
          icon-hover
          @click="moveZone(zone, -1)"
        />
        <button
          v-if="idx !== zones.length - 1"
          i-carbon-caret-down
          icon-hover
          @click="moveZone(zone, 1)"
        />
      </div>
    </div>
  </div>
</template>
