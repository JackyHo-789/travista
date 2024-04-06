<script setup>

import Gobtn from './components/GoButton.vue'
import LocationBlk from './components/LocationBlock.vue'

</script>

<template>
  <img class="backgroundImage" src="./assets/create_a_Otaru_river_photo_in_Hokkaido.png" alt="Background Image" />
  <header>
    <div class="wrapper">
    </div>
  </header>

  <main>
    <LocationBlk/>
    <!-- <Gobtn></Gobtn> -->
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

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

@media (min-width: 1024px) {
  /* header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  } */

  .logo {
    margin: 0 2rem 0 0;
  }
/* 
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  } */
}
</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous"></link>