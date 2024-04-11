<template>
    <el-card>
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
                    />
                    </el-form-item>
                </el-col>
                <el-col :span="14">
                    <el-form-item label="日期">
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
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" style="margin-left: 15px;" @click="addLocationBlk">+</el-button>
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
                            <el-option label="1" value=1 />
                            <el-option label="2" value=2 />
                            <el-option label="3" value=3 />
                            <el-option label="4" value=4 />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
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
                <el-checkbox value="Online activities" name="type">
                打卡
                </el-checkbox>
                <el-checkbox value="Promotion activities" name="type">
                歷史文化
                </el-checkbox>
                <el-checkbox value="Offline activities" name="type">
                自然風景
                </el-checkbox>
                <el-checkbox value="Simple brand exposure" name="type">
                美食
                </el-checkbox>
                <el-checkbox value="Simple brand exposure" name="type">
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
            <el-button type="primary" @click="onSubmit">出發!</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </template>
<script setup>
import { reactive, ref, onMounted } from 'vue'

const selectTemp = ref('');

// do not use same name with ref
const form = reactive({
  dests: [''],
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
  console.log('submit!')
  $router.push('/result')
}

const handleSelect = (item) => {
  console.log(item)
  
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

onMounted(() => {
    destinations.value = loadAll()
})

function addLocationBlk() {
        // 在這裡執行添加目的地的相關邏輯
        // 例如將選擇的目的地添加到 locations 數組中
        form.dests.push("")
}

</script>

<style scoped>

.el-card {
    padding: 3%;
    width: fit-content;
    min-width: 50%;
    max-width: 1024px;
    justify-content: middle;
    border-radius: 30px;
}

.el-button{
    width: 100%;
    border-radius: 30px;
}
</style>