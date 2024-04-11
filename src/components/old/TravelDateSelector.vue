<template>
    <div>
      <label>開始日期:</label>
      <input type="date" v-model="startDate" />
      <label class="mt-2">結束日期:</label>
      <input type="date" v-model="endDate"/>
      <div v-if="hasDateRange && correctDateRange" class="mt-2">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        startDate: '',
        endDate: '',
        selectedRange: null,
      };
    },
    computed: {
      hasDateRange() {
        return this.endDate !== '';
      },
      correctDateRange() {
        return this.startDate < this.endDate;
      },
      selectedRange() {
        if (!this.hasDateRange) return null;
        const startDate = new Date(this.startDate);
        const endDate = new Date(this.endDate);
        return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
      },
    },
    methods: {
      resetRange() {
        this.startDate = '';
        this.endDate = '';
      },
    },
  };
  </script>
  
  <style>
  /* Add any custom styling here */
  </style>