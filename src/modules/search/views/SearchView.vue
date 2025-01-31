<template>
  <div class="home__container">
    <div class="home__actions">
      <Searchbar @input-change="handleInputChange" />
      <RegionFilter />
    </div>
    <div v-if="isLoading" class="container_spinner">
      <Loader />
    </div>
    <div v-else-if="countriesList.length" class="home__countries">
      <div class="countries__list">
        <div
          v-for="c in countriesList"
          :key="c.name.common"
          class="country__container-card"
        >
          <CountryCard :country="c" />
        </div>
      </div>

      <Paginator
          v-if="pagination"
          :current-page="pagination.page"
          :total-pages="pagination.totalPages"
          :max-visible-pages="5"
          @page-change="(page) => searchStore.handlePageChange(page)"
        />
    </div>
    <div v-else>
      <h1 class="countries__disclaimer">No results related to that term</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import Searchbar from "../components/Searchbar.vue";
import { useSearchStore } from "../stores/search";
import Loader from "../../../components/Loader.vue";
import RegionFilter from "../components/RegionFilter.vue";
import CountryCard from "../../common/components/country-card/CountryCard.vue";
import Paginator from "../../common/components/paginator/Paginator.vue";
import { computed, onMounted } from "vue";

const searchStore = useSearchStore();

const { isLoading, countries, pagination } = storeToRefs(searchStore);

const handleInputChange = (term: string) => {
  let path = "";
  if (term.length === 0) {
    path = "/all";
  } else {
    path = `/name/${term}`;
  }

  searchStore.getCountries(path);
};

onMounted(() => {
  searchStore.getCountries("/all");
});

const countriesList= computed(() => {
  if (countries.value.length && pagination.value) {
    const start = pagination.value.page * pagination.value.size;
    const end = start + pagination.value.size;
    return countries.value.slice(start, end);    
  } else return []
})


</script>

<style>
.home__container {
  padding: 1rem 0;
}

.home__actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: space-between;
}

.home__countries {
  padding: 8px 0;
  margin-top: 2rem;
}

.country__container-card {
  height: 100%;
  min-height: 420px;
  width: calc(100% - 16px);
}

.countries__disclaimer {
  color: var(--color-text);
}

.countries__list {
  display: grid;
  gap: 16px;
}

.container_spinner {
  width: 100%;
  display: flex;
  justify-content: center;
}

@media (min-width: 600px) {
  .countries__list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .home__actions {
    align-items: center;
    flex-direction: row;
  }
  .countries__list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 992px) {
  .countries__list {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
