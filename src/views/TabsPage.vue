<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" color="primary">
        <ion-tab-button tab="current-weather" href="/tabs/current-weather">
          <ion-icon :icon="cloud" />
          <ion-label>Current Weather</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="forecast" href="/tabs/forecast">
          <ion-icon :icon="calendar" />
          <ion-label>Forecast</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="uv-index" href="/tabs/uv-index">
          <ion-icon :icon="sunny" />
          <ion-label>UV Index</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { calendar, cloud, sunny } from 'ionicons/icons';

export default defineComponent({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      calendar,
      cloud,
      sunny,
    };
  },
});
</script>
