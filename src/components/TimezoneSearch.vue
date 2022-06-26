<script setup lang="ts">
import Fuse from 'fuse.js'
import { useOutside } from '../util'
import type { Timezone } from '~/composable/types'

const fuse = new Fuse(timezone, {
  keys: ['name', 'offset'],
})
let input = $ref('')
let index = $ref(0)
const drawersRef = ref<HTMLElement>()
const add = (t: Timezone) => {
  addToTimezone(t)
  input = ''
  index = 0
}
const searchResult = $computed(() => {
  return fuse.search(input)
})
function keydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown')
    index = (index + 1 + searchResult.length) % searchResult.length
  else if (e.key === 'ArrowUp')
    index = (index - 1 + searchResult.length) % searchResult.length
  else if (e.key === 'Enter')
    add(searchResult[index].item)
}
useOutside(drawersRef, () => {
  input = ''
})
</script>

<template>
  <div relative border rounded>
    <input
      v-model="input" type="text"
      placeholder="Search timezone..."
      p="x4 y2" text-lg
      outline="none"
      bg-transparent w-full
      @keydown="keydown"
    >
    <div
      v-if="input.length !== 0"
      absolute z-10 p1
      left-0 right-0 top-full bg-gray-900
      border="~ base"
      bg-white
      bg-base
      max-h-50 overflow-auto
    >
      <button
        v-for="i, idx of searchResult"
        :key="i.refIndex"
        flex
        w-full
        bg-hover
        :class="idx === index ? 'bg-gray:5' : ''"
        @click="add(i.item)"
      >
        <TimezoneItem :timezone="i.item" />
      </button>
    </div>
  </div>
</template>

<style>
</style>
