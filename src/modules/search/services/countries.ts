import { environment } from "../../../environment";

const BASE_URL = environment.baseUrl;

class CountriesService {

    async fetchCountries(path: string) {
        try {
            const response = await fetch(`${BASE_URL}${path}`);
            const data = await response.json();
            return data;

        }catch(err){
            console.error(err);
        }
    }
}   

const countriesService = new CountriesService()
export default countriesService