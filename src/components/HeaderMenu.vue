<template>
    <el-menu
      default-active="/"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      :router="true"
      text-color="white"
    >
      <el-menu-item index="/">搜索</el-menu-item>
      <!-- <el-menu-item index="/result">結果</el-menu-item> -->
      <el-menu-item index="2" >討論區</el-menu-item>
    </el-menu>
    <div class="h-6" />
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import router from "./router";

  const activeIndex = ref('1')
  const activeIndex2 = ref('1')
  const handleSelect = (key: string, keyPath: string[]) => {
    // console.log(key, keyPath)
    // console.log(keyPath["0"])
    // router.router.push(keyPath["0"])
    router.push(keyPath["0"])
  }
</script>

<style scoped>
.el-menu {
   background-color: transparent; 
   margin-top: 1%;
   margin-left: 10%;
   margin-right: 10%;
}
</style>