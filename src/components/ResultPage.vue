<template>
    <img class="backgroundImage"/>
    <el-container>
        <el-aside>
            <el-card class="result-container">
            </el-card>
        </el-aside>
        <el-main>
            <el-card class="chatbot-container">
                <el-input>
                </el-input>
            </el-card>
        </el-main>
    </el-container>
</template>
<script setup>

</script>
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
  background-image: url("../assets/mounteverest.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(8px);
  /* border-radius: 0px 0px 100% 100%; */
}
.el-container {
    margin-top: 20px;
}

.chatbot-container {
    height: 70vh;
    width: 90%;
}

.result-container {
    height: 70vh;
}

.el-aside {
    margin-top: 18px;
    width: 15%;
    margin-left: 10%;
}

</style>