<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description: string
}>()
</script>

<template>
  <section class="page-hero">
    <p>{{ eyebrow }}</p>
    <h1>{{ title }}</h1>
    <span>{{ description }}</span>
  </section>
</template>
