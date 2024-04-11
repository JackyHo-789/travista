<script setup>
import SearchForm from './components/SearchFrom.vue';
</script>

<template>
  <img class="backgroundImage" src="./assets/create_a_Otaru_river_photo_in_Hokkaido.png" alt="Background Image" />
  <el-header>
  </el-header>
  <el-main>
    <SearchForm></SearchForm>
  </el-main>
</template>

<style scoped>
.backgroundImage {
  width: 100%;
  height: 100%;
  object-fit:fill;
  object-position: center;
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("./assets/create_a_Otaru_river_photo_in_Hokkaido.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(8px);
}

</style>