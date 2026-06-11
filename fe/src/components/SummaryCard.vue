<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  value: string
  description: string
  items?: string[]
}>()
</script>

<template>
  <article class="summary-card">
    <p class="summary-card__eyebrow">{{ eyebrow }}</p>
    <div class="summary-card__heading">
      <h2>{{ title }}</h2>
      <strong>{{ value }}</strong>
    </div>
    <p class="summary-card__description">{{ description }}</p>
    <ul v-if="items?.length" class="summary-card__list">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </article>
</template>
