<template>
  <v-container is-fluid>
    <v-layout>

      <v-app-bar elevation="0"></v-app-bar>

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

          <div>
            <v-tabs align-tabs="center">
              <v-tab @click="changeMonth(-1)">&lt; Before</v-tab>
              <v-card-title>{{ calendarHeader }}</v-card-title>
              <v-tab @click="changeMonth(1)">Next &gt;</v-tab>
            </v-tabs>
            <v-table>
              <thead>
                <tr>
                  <th v-for="index in week" :key="index">
                    {{ index }}
                  </th>
                </tr>
              </thead>
              <tbody>

                <tr v-for="(index, i) in days" :key="i">

                  <td v-for="childIndex in index" :key="childIndex">
                    {{ childIndex }}

                    <div v-if="childIndex != null" v-for="(item, i) in jobs">
                      
                      <v-radio-group v-if="item.start === childIndex || item.end === childIndex"
                        v-model="item.toggle" color="primary">
                        <v-radio :label="item.name" :value=item.name></v-radio>
                      </v-radio-group>

                    </div>
                  </td>

                </tr>
              </tbody>
            </v-table>
          </div>

        </v-card>
      </v-main>

    </v-layout>


  </v-container>
</template>

<script>

import { useJobStore } from '@/store/job';
import { storeToRefs } from 'pinia'

export default {
  name: 'HomeView',

  setup() {
    let jobStore = useJobStore();

    jobStore.loadJobSchedules();

    const { jobs } = storeToRefs(jobStore)
    return {
      jobs,
    }
  },


  data() {
    return {
      today: new Date(),
      week: ['일', '월', '화', '수', '목', '금', '토'],
      calendarHeader: '',
      days: [],
      tab: null,
    };
  },
  mounted() {
    this.calendarImplementation();
  },
  methods: {
    calendarImplementation: function () {

      this.days = [];
      const year = this.today.getFullYear();
      const month = this.today.getMonth();

      const startDayOfTheMonth = new Date(year, month, 1).getDay();

      const endDayOfTheMonth = new Date(year, month + 1, 0).getDate();

      const basicDays = Array.from({ length: endDayOfTheMonth }, (v, i) => i + 1);

      const emptyDays = Array(startDayOfTheMonth).fill(null);

      const combinedDays = [...emptyDays, ...basicDays];

      for (let i = 0; i < endDayOfTheMonth + startDayOfTheMonth; i += 7) {
        this.days.push(combinedDays.slice(i, i + 7));
      }
      this.calendarHeader = `${year}년 ${month + 1} 월`;
      this.addLastWeekEmptyDays();
    },

    changeMonth: function (val) {
      this.today = new Date(this.today.setMonth(this.today.getMonth() + val, 1));
      this.calendarImplementation();
    },

    addLastWeekEmptyDays: function () {
      const daysLastIndex = this.days.length - 1;
      if (this.days[daysLastIndex] !== 7) this.days[daysLastIndex].length = 7;
    },
  },
};
</script>


<style scoped>
tr td:first-child,
tr th:first-child {
  color: red;
}

tr td:last-child,
tr th:last-child {
  color: blue;
}
</style>
