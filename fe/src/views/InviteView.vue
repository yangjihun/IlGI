<script setup lang="ts">
import AppShell from '../components/AppShell.vue'
import GlassPanel from '../components/GlassPanel.vue'
import PageHero from '../components/PageHero.vue'
</script>

<template>
  <AppShell>
    <div class="page-shell">
      <PageHero
        eyebrow="Invite"
        title="둘만의 장소 방을 시작해요"
        description="새 공유 방을 만들거나 받은 초대 코드로 들어가서 장소 목록과 다이어리를 함께 볼 수 있어요."
      />

      <section class="panel-grid panel-grid--form">
        <GlassPanel>
          <p class="panel-eyebrow">Create Room</p>
          <div class="form-grid form-grid--single">
            <label class="field-group">
              <span>방 이름</span>
              <input class="mock-input" value="우리의 주말 지도" />
            </label>
            <button class="primary-button" type="button">공유 방 만들기</button>
          </div>
        </GlassPanel>

        <GlassPanel>
          <p class="panel-eyebrow">Join Room</p>
          <div class="form-grid form-grid--single">
            <label class="field-group">
              <span>초대 코드</span>
              <input class="mock-input" value="IlGI-204" />
            </label>
            <button class="secondary-button" type="button">코드로 입장하기</button>
          </div>
          <p class="muted-text">코드 검증은 backend 연결 후 실제 로직으로 처리합니다.</p>
        </GlassPanel>

        <GlassPanel class="preview-panel">
          <p class="panel-eyebrow">Room Preview</p>
          <h2>같이 가고, 같이 남기는 공간</h2>
          <p>
            장소 후보를 함께 정하고, 실제로 다녀온 뒤에는 같은 방에서 서로의 기록을
            확인할 수 있어요.
          </p>
        </GlassPanel>
      </section>
    </div>
  </AppShell>
</template>
