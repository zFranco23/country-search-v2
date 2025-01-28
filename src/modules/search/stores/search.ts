import { defineStore } from "pinia"
import { ref } from "vue"
import countriesService from "../services/countries"

export const useSearchStore = defineStore('counter', () => {
    const isLoading = ref<boolean>(false)
    const count = ref(0)
    const countries = ref([])

    const getCountries = async (path: string) => {
        isLoading.value = true
        const data = await countriesService.fetchCountries(path);
        isLoading.value = false
        countries.value = data;

    }
  
    return { count, isLoading, getCountries}
  })