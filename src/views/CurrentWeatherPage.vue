<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Current Weather</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-text-center ion-padding main-content" :fullscreen="true">
      <div class="primary-value">{{ currentWeather?.location }}</div>
      <csdemo-temperature
        class="primary-value"
        :scale="scale"
        :temperature="currentWeather?.temperature"
        @click="toggleScale"
      ></csdemo-temperature>
      <csdemo-condition :condition="currentWeather?.condition"></csdemo-condition>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { CsdemoCondition, CsdemoTemperature } from '@ionic-enterprise/cs-demo-weather-widgets-vue';
import { useWeather } from '@/use/weather';

const scale = ref('F');
const { currentWeather } = useWeather();

const toggleScale = () => {
  scale.value = scale.value === 'F' ? 'C' : 'F';
};
</script>

<style scoped>
.primary-value {
  margin-top: 1em;
}

.main-content {
  --padding-top: 3em;
}

csdemo-condition {
  display: block;
  --csdemo-condition-image-height: 212px;
  --csdemo-condition-label-font-size: 24px;
}

csdemo-temperature {
  display: block;
  cursor: pointer;
}
</style>
