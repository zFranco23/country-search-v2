import { environment } from "../../../environment";
import type { MiniCountry } from "../../../types";

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
}   

const countriesService = new CountriesService()
export default countriesService