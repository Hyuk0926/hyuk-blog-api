<template>
  <div class="resume-content container" style="margin-top:0;">
    <header class="resume-header" style="margin-bottom:18px;" v-if="resume">
      <img :src="resume.photoUrl" alt="프로필 사진" class="profile-photo" v-if="resume.photoUrl">
      <div>
        <h1>{{ currentLang === 'ja' ? resume.nameJa : resume.nameKo }}</h1>
        <p class="intro">{{ resume.introductionKo }}</p>
        <p class="contact">
          <span>{{ resume.email }}</span>
          <span v-if="resume.email && resume.phone && showPhone === 'true'"> | </span>
          <span v-if="showPhone === 'true'">{{ resume.phone }}</span>
          <!-- 전화번호 마스킹 처리 (보안 강화) -->
          <span v-if="showPhone === 'masked' && resume.phone"> | </span>
          <span v-if="showPhone === 'masked' && resume.phone">
            {{ resume.phone.substring(0, 3) }}-****-{{ resume.phone.substring(resume.phone.length - 4) }}
          </span>
          <!-- 연락처 안내 메시지 -->
          <span v-if="showPhone === 'contact-info' && resume.phone"> | </span>
          <span v-if="showPhone === 'contact-info'">문의 시 이메일로 연락</span>
          <!-- 설정에 따라 주소 표시 제어 -->
          <span v-if="showAddress === 'true' && ((currentLang === 'ja' && resume.addressJa) || (currentLang !== 'ja' && resume.addressKo))"> | </span>
          <span v-if="showAddress === 'true'">{{ currentLang === 'ja' ? resume.addressJa : resume.addressKo }}</span>
          <!-- 주소 마스킹 처리 (보안 강화) -->
          <span v-if="showAddress === 'masked' && ((currentLang === 'ja' && resume.addressJa) || (currentLang !== 'ja' && resume.addressKo))"> | </span>
          <span v-if="showAddress === 'masked'">
            {{ (currentLang === 'ja' ? resume.addressJa : resume.addressKo).substring(0, 3) }}***
          </span>
        </p>
      </div>
    </header>

    <main v-if="resume">
      <section v-if="resume.educations && resume.educations.length > 0">
        <h2>{{ $t('resume.education') }}</h2>
        <table class="custom-table">
          <thead>
            <tr>
              <th>{{ $t('resume.table.school') }}</th>
              <th>{{ $t('resume.table.major') }}</th>
              <th>{{ $t('resume.table.period') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="edu in resume.educations" :key="edu.id">
              <td>{{ currentLang === 'ja' ? edu.schoolJa : edu.schoolKo }}</td>
              <td>{{ currentLang === 'ja' ? edu.degreeJa : edu.degreeKo }}</td>
              <td>{{ edu.period }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section v-if="resume.skills && resume.skills.length > 0">
        <h2>{{ $t('resume.skills') }}</h2>
        <div class="skills">
          <span class="skill-tag" v-for="skill in resume.skills" :key="skill">{{ skill }}</span>
        </div>
      </section>

      <section v-if="currentLang === 'ja' ? resume.studentLifeJa : resume.studentLifeKo">
        <h2>{{ $t('resume.studentLife') }}</h2>
        <p class="self-intro">{{ currentLang === 'ja' ? resume.studentLifeJa : resume.studentLifeKo }}</p>
      </section>

      <section v-if="currentLang === 'ja' ? resume.strengthsWeaknessesJa : resume.strengthsWeaknessesKo">
        <h2>{{ $t('resume.strengthsWeaknesses') }}</h2>
        <p class="self-intro">{{ currentLang === 'ja' ? resume.strengthsWeaknessesJa : resume.strengthsWeaknessesKo }}</p>
      </section>

      <section v-if="currentLang === 'ja' ? resume.effortExperienceJa : resume.effortExperienceKo">
        <h2>{{ $t('resume.effortExperience') }}</h2>
        <p class="self-intro">{{ currentLang === 'ja' ? resume.effortExperienceJa : resume.effortExperienceKo }}</p>
      </section>

      <section v-if="currentLang === 'ja' ? resume.japanItMotivationJa : resume.japanItMotivationKo">
        <h2>{{ $t('resume.japanItMotivation') }}</h2>
        <p class="self-intro">{{ currentLang === 'ja' ? resume.japanItMotivationJa : resume.japanItMotivationKo }}</p>
      </section>

      <section v-if="currentLang === 'ja' ? resume.futurePlanJa : resume.futurePlanKo">
        <h2>{{ $t('resume.futurePlan') }}</h2>
        <p class="self-intro">{{ currentLang === 'ja' ? resume.futurePlanJa : resume.futurePlanKo }}</p>
      </section>
    </main>

    <div v-if="loading" class="loading">
      {{ $t('common.loading') }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import api from '../utils/api'

const route = useRoute()
const resume = ref(null)
const loading = ref(true)

// 환경 설정 (실제로는 API에서 가져와야 함)
const showPhone = ref('false')
const showAddress = ref('false')

const currentLang = computed(() => route.query.lang || 'ko')

const loadResume = async (lang) => {
  try {
    loading.value = true
    console.log('이력서 API 호출 시작 - 언어:', lang)
    const response = await api.get('/api/about', {
      params: { lang }
    })
    console.log('이력서 API 응답:', response.data)
    resume.value = response.data.resume
    console.log('이력서 데이터 설정 완료')
  } catch (error) {
    console.error('이력서 로드 실패:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadResume(currentLang.value)
})

watch(currentLang, (newLang) => {
  loadResume(newLang)
})
</script>

<style scoped>
.resume-content {
  padding: 2rem 0;
  min-height: calc(100vh - 200px);
}

.resume-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.profile-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.resume-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
}

.intro {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1rem;
}

.contact {
  color: #555;
  font-size: 0.95rem;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

.custom-table th,
.custom-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.custom-table th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 2rem;
}

.skill-tag {
  background: #007bff;
  color: white;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.9rem;
}

.self-intro {
  line-height: 1.8;
  color: #333;
  margin-bottom: 2rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

/* 다크모드 */
.dark-mode .resume-header h1 {
  color: #fff;
}

.dark-mode .intro {
  color: #ccc;
}

.dark-mode .contact {
  color: #ccc;
}

.dark-mode .custom-table th {
  background-color: #2d3748;
  color: #fff;
}

.dark-mode .custom-table td {
  border-bottom-color: #4a5568;
  color: #fff;
}

.dark-mode .self-intro {
  color: #fff;
}

.dark-mode .loading {
  color: #ccc;
}

@media (max-width: 768px) {
  .resume-header {
    flex-direction: column;
    text-align: center;
  }
  
  .profile-photo {
    width: 100px;
    height: 100px;
  }
}
</style> 