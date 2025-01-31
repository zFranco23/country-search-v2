import { defineStore } from "pinia"
import { ref } from "vue"
import countriesService from "../../common/services/countries"
import type { MiniCountry, Pagination } from "../../../types"

const MAX_ITEMS_PER_PAGE = 20

export const useSearchStore = defineStore('counter', () => {
    const isLoading = ref<boolean>(false)
    const count = ref(0)

    const pagination = ref<Pagination | undefined>(undefined)
    const countries = ref<MiniCountry[]>([])

    const getCountries = async (path: string) => {
        isLoading.value = true
        const data = await countriesService.fetchCountries(path);
        if(data){
            countries.value = data;
            pagination.value = {
                totalPages: Math.ceil(data.length / MAX_ITEMS_PER_PAGE) ,
                page: 0,
                size: MAX_ITEMS_PER_PAGE
            }
        }
        else {
            countries.value = []
            pagination.value = undefined
        }
        isLoading.value = false

    }

    const handlePageChange = (page: number) => {
        pagination.value!.page = page
    }
  
    return { count, isLoading, countries, getCountries, pagination, handlePageChange}
  })