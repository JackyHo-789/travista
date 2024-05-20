<template>
    <el-header>
        <img class="backgroundImage"/>
    </el-header>
    <body>
        <el-card class="search-form-card" shadow="always">
        <el-form :model="form" label-width="auto">
            <el-row v-for="dest in form.dests">
                <el-col :span="7">
                    <el-form-item label="目的地">
                    <el-autocomplete
                        v-model="selectTemp"
                        :fetch-suggestions="querySearch"
                        clearable
                        class="destination-input"
                        placeholder="請輸入目的地"
                        @select="handleSelect"
                        style="width: 100%;"
                    />
                    </el-form-item>
                </el-col>

                <el-col :span="14">
                    <el-form-item label="日期">
                    <div class="demo-date-picker">
                        <div class="block">
                        <!-- <p>Component value：{{ value }}</p> -->
                        <el-date-picker
                            v-model="form.selectedDates"
                            type="daterange"
                            start-placeholder="出發日期"
                            end-placeholder="回程日期"
                            :default-time="defaultTime"
                            :disabled-date="disabledDate"
                        />
                        </div>
                    </div>
                    </el-form-item>
                </el-col>
                

                
                    <!-- <el-form-item label="日期">
                    <el-col :span="11">
                        <el-date-picker
                        v-model="form.date1"
                        type="date"
                        placeholder="選擇日期"
                        style="width: 100%"
                        />
                    </el-col>
                    <el-col :span="1" class="text-center" style="margin-left: 10px; margin-right: 5px;">
                        <span class="text-gray-500">至</span>
                    </el-col>
                    <el-col :span="11">
                        <el-date-picker
                        v-model="form.date2"
                        type="date"
                        placeholder="選擇日期"
                        style="width: 100%"
                        />
                    </el-col>
                    </el-form-item>
                </el-col> -->
                <el-col :span="1">
                    <!-- <el-button type="primary" style="margin-left: 15px;" @click="addLocationBlk">+</el-button> -->
                </el-col>
            </el-row>
            
            <el-row style="margin-top: 20px;">
                <el-col :span="5" style="margin-right: 10px;">
                    <el-form-item label="人數">
                        <el-select v-model="form.numpeople" placeholder="人數">
                            <el-option label="1" value=1 />
                            <el-option label="2" value=2 />
                            <el-option label="3" value=3 />
                            <el-option label="4" value=4 />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="小童人數" style="margin-right: 10px;">
                        <el-select v-model="form.numchild" placeholder="人數">
                            <el-option label="0" value=0 />
                            <el-option label="1" value=1 />
                            <el-option label="2" value=2 />
                            <el-option label="3" value=3 />
                            <el-option label="4" value=4 />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="長者人數" style="margin-right: 10px;">
                        <el-select v-model="form.numelder" placeholder="人數">
                            <el-option label="0" value=0 />
                            <el-option label="1" value=1 />
                            <el-option label="2" value=2 />
                            <el-option label="3" value=3 />
                            <el-option label="4" value=4 />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="體驗">
                        <el-select v-model="form.pref" placeholder="體驗">
                            <el-option label="經濟" value="cp" />
                            <el-option label="舒適" value="comf" />
                            <el-option label="豪華" value="lux" />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- <el-form-item label="Instant delivery">
            <el-switch v-model="form.delivery" />
            </el-form-item> -->
            <el-form-item label="活動偏好">
            <el-checkbox-group v-model="form.activity">
                <el-checkbox value="體驗文化" name="type">
                文化習俗
                </el-checkbox>
                <el-checkbox value="了解歷史" name="type">
                歷史
                </el-checkbox>
                <el-checkbox value="觀賞風景" name="type">
                美景
                </el-checkbox>
                <el-checkbox value="親近大自然" name="type">
                親近大自然
                </el-checkbox>
                <el-checkbox value="享用美食" name="type">
                美食
                </el-checkbox>
                <el-checkbox value="購物" name="type">
                購物
                </el-checkbox>
            </el-checkbox-group>
            </el-form-item>
            <!-- <el-form-item label="Resources">
            <el-radio-group v-model="form.resource">
                <el-radio value="Sponsor">Sponsor</el-radio>
                <el-radio value="Venue">Venue</el-radio>
            </el-radio-group>
            </el-form-item> 
            <el-form-item label="Activity form">
            <el-input v-model="form.desc" type="textarea" />
            </el-form-item>-->
            <el-form-item>
            <el-button class="submit-btn" type="primary" @click="onSubmit">出發!</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-row>
        <el-card class="sugg-card tky-card" @click="setLocation('東京')">
            <el-row>
                <img style="width: 110px; height: 110px" src="../assets/tokyo.jpg" fit="cover" />
            </el-row>
            東京
        </el-card>
        <el-card class="sugg-card osa-card" @click="setLocation('大阪')">
            <el-row>
                <img style="width: 110px; height: 110px" src="../assets/osaka.jpg" fit="cover" />
            </el-row>
            大阪
        </el-card>
        <el-card class="sugg-card kyt-card" @click="setLocation('京都')">
            <el-row>
                <img style="width: 110px; height: 110px" src="../assets/kyoto.jpg" fit="cover" />
            </el-row>
            京都
        </el-card>
        <el-card class="sugg-card sapp-card" @click="setLocation('札幌')">
            <el-row>
                <img style="width: 110px; height: 110px" src="../assets/sapporo.jpg" fit="cover" />
            </el-row>
            札幌
        </el-card>
    </el-row>
    </body>
    
  </template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQueryStore } from '@/store/QueryStore.js'
import { ElMessage } from 'element-plus'

const store = useQueryStore()
const router = useRouter()
const route = useRoute()

const selectTemp = ref('');
// const selectedDates = ref([])
// do not use same name with ref

const open4 = () => {
  ElMessage.error('Oops, this is a error message.')
}

const form = reactive({
  dests: [''],
  selectedDates: [],
  date1: '',
  date2: '',
  numpeople: 1,
  numelder: 0,
  numchild: 0,
  pref: 'comf',
  activity: []
})

const state1 = ref('')

const onSubmit = () => {
    if (form.dests[0] == '') {
        ElMessage.error('請至少選擇一個目的地')
    } else if (form.selectedDates.length < 2) {
        ElMessage.error('請選擇日期')
    } else {
        form.date1 = form.selectedDates[0]
        form.date2 = form.selectedDates[1]
        store.query = form
        console.log('submit!')
        router.push({
            path: '/result'
        })
    }
}

function setLocation(location) {
    selectTemp.value = location
}

const handleSelect = (item) => {
    form.dests[0] = item.value
}

const destinations = ref([])

const loadAll = () => {
  return [
    { value: '東京', link: 'tokyo' },
    { value: '大阪', link: 'osaka' },
    { value: '京都', link: 'kyoto' },
    { value: '札幌', link: 'sapporo' },
    { value: '富良野', link: 'furano' },
    { value: '小樽', link: 'otaru' }
  ]
}

const querySearch = (queryString, cb) => {
  const results = queryString
    ? destinations.value.filter(createFilter(queryString))
    : destinations.value
  // call callback function to return suggestions
  cb(results)
}

const createFilter = (queryString) => {
  return (result) => {
    return (
      result.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

const disabledDate = (time) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
  return time.getTime() < today.getTime()
}

const defaultTime = ref<[Date, Date]>([
    new Date(),
    new Date(),
])

onMounted(() => {
    destinations.value = loadAll()
})


</script>

<style scoped>

.search-form-card {
    margin-top: 12%;
    padding-top: 5%;
    padding-bottom: 5%;
    padding-left: 3%;
    padding-right: 3%;
    width: fit-content;
    min-width: 50%;
    max-width: 1024px;
    justify-content: middle;
    border-radius: 30px;
}

.sugg-card {
    margin-top: 5%;
    margin-left: 3%;
    width: fit-content;
    height: fit-content;
    padding: auto;
}

.el-main {
    height: 100vh;
}

.el-button{
    width: 100%;
    border-radius: 30px;
}

.submit-btn {
    margin-top: 20px
}

.backgroundImage {
  width: 100%;
  height: 50%;
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
  filter: blur(5px);
  border-radius: 0px 0px 100% 100%;
}

:deep(.el-input__wrapper) {
    width: 100%;
}

</style>