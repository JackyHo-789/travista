<template>
    <div class="dropdown">
      <!-- <input type="text" v-model="inputValue" @input="handleInput" /> -->
      <p class="dropdown__text">小童人數:</p>
      <select class="dropdown__items" v-model="selectedValue">
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

<style scoped src='src/assets/hori_drop_down.css'/>