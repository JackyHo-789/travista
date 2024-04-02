<template>
    <div>
      <!-- <input type="text" v-model="inputValue" @input="handleInput" /> -->
      <p>長者人數:</p>
      <select v-model="selectedValue">
        <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>
  </template>


<script>
export default {
  data() {
    return {
      inputValue: '',
      selectedValue: '',
      options: ['0', '1', '2', '3']
    };
  },
  methods: {
    handleInput() {
      this.inputValue = $event.target.value;
    },
    handleSelect() {
      this.selectedValue = $event.target.value;
    }
  }
};
</script>

