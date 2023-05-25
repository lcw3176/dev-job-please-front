<template>
    <!-- https://juhyejin.tistory.com/52 -->
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

                        <v-card class="mx-auto" max-width="300" v-if="childIndex != null">
                            <v-list item-title="name" item-value="id"></v-list>
                        </v-card>
                    </td>

                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script>

export default {
    name: 'Calendar',
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