<template>
    <div>
      <input type="text" v-model="searchTerm" placeholder="Search...">
      <ul>
        <li v-for="option in filteredOptions" :key="option">{{ option }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchTerm: '',
        options: ['Apple', 'Banana', 'Orange', 'Grape', 'Strawberry'],
        filteredOptions: [],
      };
    },
    computed: {
      filteredOptions() {
        return this.options.filter(option =>
          option.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      },
    },
};
</script>