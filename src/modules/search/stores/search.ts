import { defineStore } from "pinia"
import { ref } from "vue"
import countriesService from "../services/countries"
import type { MiniCountry } from "../../../types"

export const useSearchStore = defineStore('counter', () => {
    const isLoading = ref<boolean>(false)
    const count = ref(0)
    const countries = ref<MiniCountry[]>([])

    const getCountries = async (path: string) => {
        isLoading.value = true
        const data = await countriesService.fetchCountries(path);
        if(data) countries.value = data;
        else countries.value = []
        isLoading.value = false

    }
  
    return { count, isLoading, countries, getCountries}
  })