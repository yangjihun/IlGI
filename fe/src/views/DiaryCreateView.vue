<script setup lang="ts">
import AppShell from '../components/AppShell.vue'
import GlassPanel from '../components/GlassPanel.vue'
import PageHero from '../components/PageHero.vue'
</script>

<template>
  <AppShell>
    <div class="page-shell">
      <PageHero
        eyebrow="Diary"
        title="오늘의 장소를 기록해요"
        description="날짜와 장소, 기억에 남은 순간을 남겨두면 나중에 지도 위에서 다시 꺼내볼 수 있어요."
      />

      <section class="panel-grid panel-grid--form">
        <GlassPanel>
          <form class="form-grid" aria-label="다이어리 작성 form">
            <label class="field-group">
              <span>날짜</span>
              <input class="mock-input" type="date" value="2026-06-11" />
            </label>

            <label class="field-group">
              <span>장소</span>
              <input class="mock-input" type="text" value="망원 한강공원" />
            </label>

            <label class="field-group field-group--full">
              <span>기억에 남는 것</span>
              <textarea class="mock-textarea">노을이 천천히 내려오고, 같이 걷던 길이 조용해서 좋았다.</textarea>
            </label>

            <label class="field-group field-group--full">
              <span>추가 메모</span>
              <textarea class="mock-textarea">다음에는 돗자리랑 따뜻한 차를 챙겨가기.</textarea>
            </label>

            <button class="primary-button field-group--full" type="button">기록 저장하기</button>
          </form>
        </GlassPanel>

        <GlassPanel class="preview-panel">
          <p class="panel-eyebrow">Preview</p>
          <h2>망원 한강공원</h2>
          <p class="muted-text">2026.06.11 · J가 남긴 기록</p>
          <p>
            노을이 천천히 내려오고, 같이 걷던 길이 조용해서 좋았다. 이 장소는
            오늘의 지도에 diary marker로 표시돼요.
          </p>
          <RouterLink class="secondary-button" to="/diaries/sample">상세 화면 보기</RouterLink>
        </GlassPanel>
      </section>
    </div>
  </AppShell>
</template>
