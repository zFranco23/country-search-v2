<template>
  <div class="country__container">
    <div v-if="isFetchingCountry" class="container__loading">
      <Loader />
    </div>
    <div v-else-if="!country">
      <h1 class="country__name">This country not exists</h1>
    </div>
    <div v-else>
      <div class="button__back">
        <RouterLink class="btn" to="/">Go back</RouterLink>
      </div>
      <div class="country__content">
        <div class="country__left-content">
          <img
            :src="country.flags && country.flags.png ? country.flags.png : ''"
            class="country__flag"
          />
        </div>
        <div class="country__right-content">
          <h1 class="country__name">{{ country.name.common }}</h1>

          <div class="country__details">
            <div class="country__details-wrap">
              <p v-if="country.name" class="country__details">
                Native Name: <span>{{ country.name.official }}</span>
              </p>
              <p v-if="country.population" class="country__details">
                Population:
                <span>{{ country.population.toLocaleString() }}</span>
              </p>
              <p v-if="country.region" class="country__details">
                Region: <span>{{ country.region }}</span>
              </p>

              <p v-if="country.capital" class="country__details">
                Capital:
                <span>{{
                  country.capital.length ? country.capital[0] : ""
                }}</span>
              </p>
            </div>

            <div class="country__details-wrap">
              <p v-if="country.continents" class="country__details">
                Continent: <span>{{ country.continents[0] }}</span>
              </p>
              <p v-if="country.tld" class="country__details">
                Top Level Domain: <span>{{ country.tld[0] }}</span>
              </p>
              <p v-if="currencies" class="country__details">
                Currencies: <span>{{ currencies }}</span>
              </p>
              <p v-if="languages" class="country__details">
                Languages: <span>{{ languages }}</span>
              </p>
            </div>

          </div>


            <div v-if="country.maps" class="country__map" >
                <button type="button" class="btn" to="/" @click="handleGoToGoogleMaps">
                    See on Google Maps
                </button> 
            </div>
          
          
          <div v-if="country.borders" class="borders__wrap">
            <p class="country__details">Border countries:</p>
            <Loader v-if="isFetchingBorders" />
            <div v-else-if="borderCountries" class="borders__list">
              <RouterLink
                v-for="(c, i) in borderCountries"
                :key="`border-${i}`"
                class="border__item"
                :to="`/country/${c.cca3}`"
              >
                <p>{{ c.name.common }}</p>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import type { Country, CountryBorder } from "../../../types";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import countriesService from "../../common/services/countries";
import Loader from "../../../components/Loader.vue";

const route = useRoute();
const country = ref<Country>();

const isFetchingCountry = ref<boolean>(false);
const isFetchingBorders = ref<boolean>(false);

const borderCountries = ref<CountryBorder[]>([]);

const getCountry = async (countryCode?: string) => {
  if (countryCode) {
    isFetchingCountry.value = true;
    const countryDetail = await countriesService.fetchCountry(countryCode);
    isFetchingCountry.value = false;
    if (countryDetail?.length) {
      country.value = countryDetail[0];
    }
  }
};

const getCountryBorders = async (borders: string[]) => {
  isFetchingBorders.value = true;
  const arrFetch = borders.map((el) => {
    return countriesService.fetchCountryBorders(el);
  });
  const [...rest] = await Promise.all(arrFetch);

  isFetchingBorders.value = false;
  borderCountries.value = rest as unknown as CountryBorder[];
};

const handleGoToGoogleMaps = () => {
    window.open(country.value?.maps.googleMaps, "_blank");

}

onMounted(() => {
  getCountry(route.params.countryCode as string);
});

onBeforeRouteUpdate(async (to, _, next) => {
  if (to.params.countryCode) {
    getCountry(to.params.countryCode as string);
  }
  next();
});

watch(country, () => {
  if (country.value?.borders) {
    getCountryBorders(country.value.borders);
  }
});

const currencies = computed(() => {
  const c = country.value;
  if (c && c.currencies) {
    const keys = Object.keys(c.currencies);
    return keys.map((k) => c.currencies[k].name).join(", ");
  }
});

const languages = computed(() => {
  const c = country.value;
  if (c && c.languages) {
    const keys = Object.keys(c.languages);
    return keys.map((k) => c.languages[k]).join(", ");
  }
});
</script>

<style scoped>
.container__loading {
  display: flex;
  justify-content: center;
  width: 100%;
}

.country__container {
  padding: 1rem 0;
}

.country__content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.country__left-content {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
}

.country__flag {
  width: 100%;
  max-width: 100%;
}

.country__right-content {
  width: 100%;
}

.country__name {
  font-weight: 600;
  color: var(--color-text);
}

.button__back {
  margin: 3rem 0;
}

.borders__wrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.borders__list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.border__item {
  cursor: pointer;
  display: flex;
  justify-content: center;
  border: 1px solid gray;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  color: var(--color-text);
}

.btn {
  cursor: pointer;
  background: none;
  border: none;
  color: var(--color-text);
  background-color: var(--color-bg-elements);
  font-family: Nunito;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  box-shadow: 0px 24px 80px rgba(74, 74, 74, 0.07),
    0px 5.36071px 17.869px rgba(74, 74, 74, 0.0417275),
    0px 1.59602px 5.32008px rgba(74, 74, 74, 0.0282725);
}

.country__details-wrap {
  margin: 1.5rem 0;
}

.country__map {
    margin-bottom: 1rem;
}

.country__details {
  width: 100%;
  font-weight: 600;
  color: var(--color-text);
}

.country__details span {
  font-weight: 300;
  color: var(--color-text);
}

@media (min-width: 768px) {
  .country__content {
    flex-direction: row;
  }

  .country__flag {
    width: 80%;
    max-width: 100%;
  }

  .country__details {
    display: flex;
    gap: 16px;
    width: 100%;
  }

  .country__details-wrap {
    width: 50%;
  }

  .country__left-content {
    width: calc(50% - 16px);
  }

  .country__right-content {
    width: calc(50% - 16px);
  }
}
</style>
