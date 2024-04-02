<template>
    <div>
      <VueMultiselect
        v-model="selected"
        :options="options"
        placeholder="請選擇您的目的地">
      </VueMultiselect>
    </div>
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
    }
  }
  </script>
  
  <style src="vue-multiselect/dist/vue-multiselect.css"></style>

  <!-- <template>
    <div>
      <input type="text" v-model="searchQuery" placeholder="請選擇您的目的地" @input="search" />
    </div>
</template>

<script>
export default {
data() {
    return {
    searchQuery: ''
    };
},
methods: {
    search() {
    // 处理搜索逻辑
    }
}
};
</script> -->

<!-- <template>
    <div>
      <input v-model="searchText" type="text" placeholder="Search..." @input="filterItems">
      <ul>
        <li v-for="item in filteredItems" :key="item.id" @click="selectItem(item)">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchText: '',
        items: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
          { id: 3, name: 'Item 3' },
          { id: 4, name: 'Item 4' },
          { id: 5, name: 'Item 5' }
        ],
        filteredItems: []
      };
    },
    methods: {
      filterItems() {
        this.filteredItems = this.items.filter(item =>
          item.name.toLowerCase().includes(this.searchText.toLowerCase())
        );
      },
      selectItem(item) {
        // Do something with the selected item
        console.log('Selected item:', item);
      }
    }
  };
  </script> -->