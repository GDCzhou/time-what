<script lang='ts' setup>
 const props = defineProps<{
    name:string
  }>()
  const uppercase = computed(()=>{
    return props.name.toUpperCase()
  })
</script>
<template>
  <div text="red-500 3xl" >hello: {{uppercase}}</div>
  <div i-carbon-bee text="5xl yellow" ></div>
</template>

<style lang='scss' scoped>
</style>