<script setup lang="ts">
import Fuse from 'fuse.js'
import type { Timezone } from '~/composable/types'

const fuse = new Fuse(timezone, {
  keys: ['name', 'offset'],
})
let input = $ref('')
const searchResult = computed(() => {
  return fuse.search(input)
})
function keydown(e: KeyboardEvent) {}
const add = (t: Timezone) => {
  addToTimezone(t)
  input = ''
}
</script>

<template>
  <div relative border>
    <input
      v-model="input" type="text"
      placeholder="Search timezone..."
      p="x3 y2" text-lg border="~ base rounded"
      bg-transparent w-full
      @keydown="keydown"
    >
    <div
      v-if="input.length !== 0"
      absolute left-0 right-0 top-full bg-gray-900
    >
      <button
        v-for="i of searchResult"
        :key="i.refIndex"
        flex
        gap2
        @click="add(i.item)"
      >
        <div font-sans w-10 text-right>
          {{ i.item.offset }}
        </div>
        <div>
          {{ i.item.name }}
        </div>
      </button>
    </div>
  </div>
</template>

<style>
</style>
