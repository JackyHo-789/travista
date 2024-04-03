<template>
    <form @submit.prevent="onSubmit">
      <VueMultiselect
        v-model="selected"
        :options="options"
        placeholder="請選擇您的目的地">
      </VueMultiselect>
    
      <label class="dropdown__text">請選擇您的偏好:</label>
      <select class="dropdown__items" v-model="selectedValue">
        <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
      </select>

      <label class="dropdown__text">小童人數:</label>
      <select class="dropdown__items" v-model="selectedValue">
        <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
      </select>

      <label class="dropdown__text">長者人數:</label>
      <select class="dropdown__items" v-model="selectedValue">
        <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
      </select>
      <!-- <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" required> -->
  
      <!-- <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required> -->
  
      <button type="submit">Submit</button>
    </form>
  </template>
  
  <script>
  import VueMultiselect from 'vue-multiselect'
  export default {
    components: { VueMultiselect },
    data () {
      return {
        selected: null,
        options: ['東京', '大阪', '札幌','小樽', '札幌', '福岡', '富良野','神戶']
      }
    },
    methods: {
      onSubmit() {
        // Handle form submission
        console.log('Name:', this.name)
        console.log('Email:', this.email)
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
