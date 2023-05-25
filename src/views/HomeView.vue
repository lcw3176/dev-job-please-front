<template>
  <v-container is-fluid>
    <v-layout>

      <v-app-bar elevation="0"></v-app-bar>

      <v-navigation-drawer>
        <v-list>
          <v-list-item></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-navigation-drawer location="right">
        <v-list>
          <v-list-item></v-list-item>
        </v-list>
      </v-navigation-drawer>
      
      <v-main>
        <v-card color="blue-grey-darken-1">
          <v-card-title class="text-center justify-center py-6">
            <span class="font-weight-bold text-h2 text-basil">
              개
            </span>
            <span>(발 직군)</span>
            <span class="font-weight-bold text-h2 text-basil">
              JOB
            </span>
            <span>(을)</span>
            <span class="font-weight-bold text-h2 text-basil">
              부
            </span>
            <span>(탁해)</span>
          </v-card-title>
          <Calendar />
        </v-card>
      </v-main>

    </v-layout>


  </v-container>
</template>

<script>

import Calendar from '@/components/Calendar.vue'

export default {
  name: 'HomeView',
  components: {
    Calendar
  }
};
</script>
