<script lang='ts' setup>
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button
    i-carbon-sun
    dark:i-carbon-moon
    text-2xl
    @click="toggleDark()"
  />
</template>

<style lang='scss' scoped>
</style>
