<script setup>
import SearchForm from './components/SearchForm.vue';
import HeaderMenu from './components/HeaderMenu.vue'
</script>

<template>
  <el-header>
    <HeaderMenu></HeaderMenu>
  </el-header>
  <el-main>
    <el-row class="row-bg">
      <!-- <SearchForm></SearchForm> -->
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-row>
  </el-main>
</template>

<style scoped>
.el-row{
  height: 100%;
  justify-content: center;
}

.el-main {
  height: 100%;
}

body {
  height: 100%;
}

#app {
  height: 100%;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>