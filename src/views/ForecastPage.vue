<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Forecast</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="main-content" :fullscreen="true">
      <ion-list>
        <ion-item v-for="(f, index) in currentWeather?.forecasts" :key="index" @click="toggleScale">
          <ion-label>
            <csdemo-daily-forecast :scale="scale" :forecasts="f" :iconPaths="icons"></csdemo-daily-forecast>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonPage, IonHeader, IonItem, IonLabel, IonList, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { CsdemoDailyForecast } from '@ionic-enterprise/cs-demo-weather-widgets-vue';
import useWeather from '@/use/weather';

export default defineComponent({
  name: 'ForecastPage',
  components: { CsdemoDailyForecast, IonHeader, IonItem, IonLabel, IonList, IonToolbar, IonTitle, IonContent, IonPage },
  setup() {
    const scale = ref('F');
    const { currentWeather, icons } = useWeather();

    const toggleScale = () => {
      scale.value = scale.value === 'F' ? 'C' : 'F';
    };

    return { currentWeather, icons, toggleScale, scale };
  },
});
</script>

<style scoped>
csdemo-daily-forecast {
  --csdemo-daily-forecast-date-font-size: larger;
  --csdemo-daily-forecast-description-font-size: large;
  --csdemo-daily-forecast-description-font-weight: bold;
  --csdemo-daily-forecast-description-padding-left: 24px;
  --csdemo-daily-forecast-image-height: 96px;
}
</style>
