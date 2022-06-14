<script setup lang="ts"></script>

<template>
  <div text-sans bg-canvas h-screen>
    <NavBar />
    <!-- dark 黑夜模式下的切换背景颜色 -->
    <div
      border="~ base rounded"
      m2 p2
      shadow
      bg-base
    >
      <ActionBar />
      <TimeSchedular />
    </div>
  </div>
</template>

<style>
.dark {
  background: #222;
  color: white;
  color-scheme: dark;
}
</style>
