<script setup>
    import DateSelector from './TravelDateSelector.vue'
    import ExperienceSelector from './ExperienceSelector.vue'
    import SearchBar from './SearchBar.vue'
    import ElderSel from './NumberOfElderInput.vue'
    import ChildSel from './NumberOfChildInput.vue'
    import AddLocation from './AddLocationButton.vue'
</script>

<template>
    <SearchBar></SearchBar>
    <ExperienceSelector></ExperienceSelector>
    <ChildSel></ChildSel>
    <ElderSel></ElderSel>
    <DateSelector></DateSelector>
    <AddLocation></AddLocation>
</template>


