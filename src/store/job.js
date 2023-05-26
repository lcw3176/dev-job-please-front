import { defineStore } from "pinia"

export const useJobStore = defineStore("jobStore", {

  state: () => ({
    jobs: [],
  }),


  getters: {

  },

  actions: {
    async loadJobSchedules(){
      // axios 드갈 부분
      // 일단 더미 데이터로
      this.jobs.length = 0;
      let now = new Date();

      let data = {
        start: this.addDays(now, 1),
        end: this.addDays(now, 7),
        name: "맵샷컴퍼니",
        link: "",
      }

      this.jobs.push(data);

      data = {
        start: this.addDays(now, 2),
        end:  this.addDays(now, 5),
        name: "방가방가IT",
        link: "",
      }

      this.jobs.push(data);
    },

    addDays(date, days) {
      const clone = new Date(date);
      clone.setDate(date.getDate() + days)
      
      return clone.getDate();
    }
  },
});