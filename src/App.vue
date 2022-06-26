<script setup lang="ts"></script>

<template>
  <div text-sans h-screen>
    <NavBar />
    <!-- dark 黑夜模式下的切换背景颜色 -->
    <div
      border="~ base rounded"
      m10 p2
      shadow
      bg-base
      min-w-980px
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
/* input {
  outline: none;
} */
</style>
