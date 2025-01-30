import { environment } from "../../../environment";
import type { Country, CountryBorder, MiniCountry } from "../../../types";

const BASE_URL = environment.baseUrl;

class CountriesService {

    async fetchCountries(path: string) {
        try {
            const response = await fetch(`${BASE_URL}${path}?fields=name,capital,population,region,flags,cca3`);
            const data = await response.json() as MiniCountry[];
            return data;

        }catch(err){
            console.error(err);
        }
    }


    async fetchCountry(id: string) {
        try {
            const response = await fetch(`${BASE_URL}/alpha/${id}`);
            const data = await response.json() as Country[];
            return data;

        }catch(err){
            console.error(err);
        }
    }

    async fetchCountryBorders(id: string) {
        try {
            const response = await fetch(`${BASE_URL}/alpha/${id}?fields=name,cca3`);
            const data = await response.json() as CountryBorder[];
            return data;

        }catch(err){
            console.error(err);
        }
    }
}   

const countriesService = new CountriesService()
export default countriesService