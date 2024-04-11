<template>
  <div class="card">
    <form @submit.prevent="onSubmit">
      <table>
        <tr v-for="location in locations">
          <td class = "target-location">
            <label>目的地:</label>
            <VueMultiselect
            v-model="selected"
            :options="options"
            placeholder="請選擇您的目的地">
          </VueMultiselect>
          </td>
          <td>
            <div>
              <label>開始日期:</label>
              <input class="datepicker" type="date" v-model="startDate" />
              <label class="mt-2">結束日期:</label>
              <input type="date" v-model="endDate"/>
              <div v-if="hasDateRange && correctDateRange" class="mt-2">
              </div>
            </div>
          </td>
          <td>
            <button class="btn btn-primary" :onclick="addLocation" type="add-location">添加目的地</button>
          </td>
        </tr>
      </table>
      <table>
        <tr>
          <td class = "target-preference">
            <label class="dropdown__text">請選擇您的偏好:</label>
            <!-- <select class="dropdown__items" v-model="selectedValue">
              <option v-for="option in optionsPreference" :key="option" :value="option">{{ option }}</option>
            </select> -->
            <VueMultiselect
              v-model="selectedPreference"
              :options="optionsPreference"
              placeholder="請選擇您的偏好">
            </VueMultiselect>
          </td>
          <td class = "target-child-count">
            <label class="dropdown__text">小童人數:</label>
            <VueMultiselect
              v-model="selectedChild"
              :options="optionsChild"
              placeholder="小童人數">
            </VueMultiselect>
            <!-- <select class="dropdown__items" v-model="selectedValue">
              <option v-for="option in optionsChild" :key="option" :value="option">{{ option }}</option>
            </select> -->
          </td>
          <td class = "target-elder-count">
            <label class="dropdown__text">長者人數:</label>
            <VueMultiselect
              v-model="selectedElderly"
              :options="optionsElderly"
              placeholder="長者人數">
            </VueMultiselect>
          </td>
        </tr>
      </table>
      <table>
        <tr>
          <td><button class="submit-button btn btn-success" type="submit">去旅行!</button></td>
        </tr>
      </table>
          
          <!-- <select class="dropdown__items" v-model="selectedValue">
            <option v-for="option in optionsElderly" :key="option" :value="option">{{ option }}</option>
          </select> -->


      <DateSelector></DateSelector>
      <!-- <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" required> -->
  
      <!-- <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required> -->
  
    </form>
  </div>
  </template>
  
  <script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap/dist/js/bootstrap.js'
  import VueMultiselect from 'vue-multiselect'
  import DateSelector from './TravelDateSelector.vue'
  export default {
    components: { VueMultiselect },
    data () {
      return {
        selected: null,
        selectedPreference: null,
        selectedChild: null,
        selectedElderly: null,
        options: ['東京', '大阪', '札幌','小樽', '札幌', '福岡', '富良野','神戶'],
        optionsPreference: ['經濟', '舒適', '豪華'],
        optionsChild: ['0', '1', '2', '3', '4', '>4'],
        optionsElderly: ['0', '1', '2', '3', '4', '>4'],
        locations: ['0'],
        startDate: '',
        endDate: '',
        selectedRange: null
      }
    },
    computed: {
      hasDateRange() {
        return this.endDate !== '';
      },
      correctDateRange() {
        return this.startDate < this.endDate;
      },
      selectedRange() {
        if (!this.hasDateRange) return null;
        const startDate = new Date(this.startDate);
        const endDate = new Date(this.endDate);
        return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
      },
    },
    methods: {
      onSubmit() {
        // Handle form submission
        console.log('Name:', this.name)
        console.log('Email:', this.email)
      },
      addLocation() {
        // 在這裡執行添加目的地的相關邏輯
        // 例如將選擇的目的地添加到 locations 數組中
        this.locations.push(this.selected)
      },
      resetRange() {
        this.startDate = '';
        this.endDate = '';
      }
    }
  }
//   export default {
//     data() {
//       return {
//         name: '',
//         email: ''
//       }
//     },
//     methods: {
//       onSubmit() {
//         // Handle form submission
//         console.log('Name:', this.name)
//         console.log('Email:', this.email)
//       }
//     }
//   }
  
  </script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped>
.card {
  max-width: 60%;
  display: flex;
}

form {
  display: flex;
  width: 100%;
  height: 600px;
}

.target-location {
  width: 500px;
}
.target-preference {
  width: 200px;
}
.target-child-count {
  width: 200px;
}
.target-elder-count {
  width: 200px;
}
.submit-button{
  width: 500px;
  display: flex;
}
</style>

<!-- <script setup>
    import DateSelector from './TravelDateSelector.vue'
    import ExperienceSelector from './ExperienceSelector.vue'
    import SearchBar from './SearchBar.vue'
    import ElderSel from './NumberOfElderInput.vue'
    import ChildSel from './NumberOfChildInput.vue'
    import AddLocation from './AddLocationButton.vue'

    const locationSel = ref([])
    const startDates = ref([])
    const endDates = ref([])
    const experience = ref("")
    const elderSel = ref("")
    const childSel = ref("")

    function handleSearchBarResp(msg) {
        locationSel.value.push(msg);
    }

</script>

<template>
    <table>
        <tr>
            <td>
                <SearchBar @response="(msg) => handleSearchBarResp(msg)"></SearchBar>
            </td>
            <td>
                <DateSelector></DateSelector>
            </td>
            <td>
                <AddLocation></AddLocation>
            </td>
        </tr>
    </table>
    <table>
        <tr>
            <td>
                <ExperienceSelector></ExperienceSelector>
            </td>
            <td>
                <ChildSel></ChildSel>
            </td>
            <td>
                <ElderSel></ElderSel>
            </td>
        </tr>
    </table>
</template>

 -->
