<script setup lang="ts">
import AppShell from '../components/AppShell.vue'
import GlassPanel from '../components/GlassPanel.vue'
import PageHero from '../components/PageHero.vue'

const timeline = ['망원 한강공원 기록 추가', '성수 작은 식당 후보 등록', '북촌 골목 산책을 같이 저장']
</script>

<template>
  <AppShell>
    <div class="page-shell">
      <PageHero
        eyebrow="Shared Room"
        title="우리의 장소 방"
        description="초대 코드로 함께 들어온 공간에서 기록과 가보고 싶은 곳을 같이 관리해요."
      />

      <section class="panel-grid">
        <GlassPanel>
          <p class="panel-eyebrow">Invite Code</p>
          <h2>IlGI-204</h2>
          <p class="muted-text">참여자 2명 · 공동 편집 가능</p>
          <div class="participant-row" aria-label="참여자">
            <span>J</span>
            <span>H</span>
          </div>
          <button class="primary-button" type="button">초대 코드 복사</button>
        </GlassPanel>

        <GlassPanel>
          <p class="panel-eyebrow">Timeline</p>
          <ul class="timeline">
            <li v-for="item in timeline" :key="item">{{ item }}</li>
          </ul>
        </GlassPanel>

        <GlassPanel>
          <p class="panel-eyebrow">Shared Places</p>
          <ul class="stack-list">
            <li>성수 작은 식당 · 이번 주 후보</li>
            <li>잠실 야경길 · 날씨 좋은 날</li>
            <li>북촌 골목 산책 · 같이 저장</li>
          </ul>
          <RouterLink class="secondary-button" to="/places">장소 목록 보기</RouterLink>
        </GlassPanel>
      </section>
    </div>
  </AppShell>
</template>
