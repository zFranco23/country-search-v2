<template>
    <div class="region-filter__container">
        <p class="region-filter__title">Region</p>
        <div class="region-filter">
            <div class="filter" @click="toggleFilter">
              {{ hasSelectedOneRegion ? hasSelectedOneRegion.name : 'Filter by region' }}
            </div>
            <div class="filter_options" v-if="isOpen">
              <div :class="['filter_option', hasSelectedOneRegion && hasSelectedOneRegion.name === c.name ? 'bold' : '']"
                v-for="(c, idx) in DEFAULT_REGIONS" :key="`c-${idx}`" @click="handleSelect(c)">
                {{ c.name }}
              </div>
            </div>
        </div>
    </div>
  </template>
  
  <script setup lang="ts">

  const {getCountries} = useSearchStore()

  interface Region {
    name: string;
    region: string;

  }

    import { computed, ref } from 'vue';
    import { useSearchStore } from '../stores/search';

  const DEFAULT_REGIONS: Array<Region> = [
    { name: 'Africa', region: 'africa' },
    { name: 'America', region: 'america' },
    { name: 'Asia', region: 'asia' },
    { name: 'Europe', region: 'europe' },
    { name: 'Oceania', region: 'oceania' },
  ]

  const isOpen = ref<boolean>(false)
  const selectedRegion = ref<string>('')    


  const toggleFilter = () => {
    isOpen.value = !isOpen.value
  }

  const hasSelectedOneRegion = computed(() => {
    return DEFAULT_REGIONS.find(el => el.region === selectedRegion.value);
  })

  const handleSelect = (opt: Region) => {
    selectedRegion.value = opt.region;
    isOpen.value = false;
    
    const value = selectedRegion.value;
    getCountries(`/region/${value}`)
  }
  

  </script>
  
  <style scoped>

  .region-filter__container {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .region-filter__title {
    font-weight: 600;
    color: var(--color-text);
  }

  .region-filter {
    position: relative;
    height: fit-content;
    cursor: pointer;
    font-weight: 500;
    width: 12rem;
  }
  .bold {
    font-weight: 800;
  }
  .filter {
    padding: 8px;
    background-color: var(--color-bg-elements);
    color: var(--color-text);
    border: 1px solid transparent;
    box-shadow: 0px 24px 80px rgba(74, 74, 74, 0.07), 0px 5.36071px 17.869px rgba(74, 74, 74, 0.0417275), 0px 1.59602px 5.32008px rgba(74, 74, 74, 0.0282725);
  }
  
  .filter_options {
    z-index: 9999;
    margin-top: 8px;
    width: 100%;
    height: fit-content;
    position: absolute;
    bottom: 0;
    top: 100%;
    background-color: var(--color-bg-elements);
    color: var(--color-text);
    border: 1px solid transparent;
    box-shadow: 0px 24px 80px rgba(74, 74, 74, 0.07), 0px 5.36071px 17.869px rgba(74, 74, 74, 0.0417275), 0px 1.59602px 5.32008px rgba(74, 74, 74, 0.0282725);
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
  }
  
  .filter_option:hover {
    font-weight: 600;
  }
  </style>