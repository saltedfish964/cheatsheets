<template>
  <div ref="calendar"></div>
</template>

<script>
/* eslint-disable */
import { Calendar } from './fullcalendar-4.4.2/core';
import dayGridPlugin from './fullcalendar-4.4.2/daygrid';
import interactionPlugin from './fullcalendar-4.4.2/interaction';
import locale from './fullcalendar-4.4.2/zh-cn';
import cloneDeep from './cloneDeep';

export default {
  props: {
    options: Object,
  },
  data() {
    return {
      calendar: null,
      currentOptions: null,
    };
  },
  mounted() {
    this.currentOptions = cloneDeep(this.options);
    this.currentOptions = Object.assign({}, this.currentOptions, {
      locale,
      plugins: [ dayGridPlugin, interactionPlugin ],
    });
    const calendarEl = this.$refs.calendar;
    this.calendar = new Calendar(calendarEl, this.currentOptions);
    this.calendar.render();
  },
}
</script>

<style>
@import url("./fullcalendar-4.4.2/core.css");
@import url("./fullcalendar-4.4.2/daygrid.css");
</style>