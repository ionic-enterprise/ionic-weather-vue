<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>UV Index</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">UV Index</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExploreContainer name="UV Index page" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

export default defineComponent({
  name: 'UVIndexPage',
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
});
</script>
