<script setup lang="ts">
import AppShell from '../components/AppShell.vue'
import GlassPanel from '../components/GlassPanel.vue'
import PageHero from '../components/PageHero.vue'
</script>

<template>
  <AppShell>
    <div class="page-shell">
      <PageHero
        eyebrow="Diary Detail"
        title="망원 한강공원에서 남긴 기록"
        description="장소와 날짜, 함께 기억하고 싶은 순간을 한 번에 확인하는 상세 화면이에요."
      />

      <section class="panel-grid">
        <GlassPanel class="diary-detail-panel">
          <p class="panel-eyebrow">2026.06.11 · J</p>
          <h2>노을 보면서 남긴 산책 기록</h2>
          <p>
            강가를 따라 걷다가 하늘이 분홍색으로 바뀌는 걸 같이 봤다. 별일 아닌
            하루였는데, 이 장소 덕분에 오래 기억날 것 같다.
          </p>
          <p class="muted-text">메모: 다음에는 야경 시간에 맞춰 다시 오기.</p>
          <div class="button-row">
            <button class="secondary-button" type="button">수정</button>
            <button class="danger-button" type="button">삭제</button>
          </div>
        </GlassPanel>

        <GlassPanel>
          <p class="panel-eyebrow">Location</p>
          <h2>망원 한강공원</h2>
          <div class="mini-map" aria-hidden="true">
            <span />
          </div>
          <ul class="stack-list">
            <li>연남동 카페 · 같은 날 저장</li>
            <li>성수 작은 식당 · 이번 주 후보</li>
          </ul>
        </GlassPanel>
      </section>
    </div>
  </AppShell>
</template>
