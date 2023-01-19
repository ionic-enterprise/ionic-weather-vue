<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>UV Index</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="main-content ion-text-center ion-padding" :fullscreen="true">
      <csdemo-uv-index class="primary-value" :uvIndex="currentWeather?.uvIndex"></csdemo-uv-index>
      <div class="description">{{ advice }}</div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { CsdemoUvIndex } from '@ionic-enterprise/cs-demo-weather-widgets-vue';
import { useWeather } from '@/use/weather';

const { currentWeather, getUVAdvice } = useWeather();
const advice = computed(() => {
  if (currentWeather.value) {
    return getUVAdvice(currentWeather.value.uvIndex);
  } else {
    return '';
  }
});
</script>

<style scoped>
.description {
  margin-top: 1em;
}

.main-content {
  --padding-top: 5em;
}
</style>
