
<template>
    <div>
        <input class="input" v-model="searchText" placeholder="Search a country ...." />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { debounce } from '../../../utils/debounce';

const emits = defineEmits<{
    (e: 'input-change', value: string): void
}>()
const searchText = ref('')
const debouncedSearch = ref('')

watch(searchText, debounce( (newVal: string) =>  {
    debouncedSearch.value = newVal
}, 500))



watch(debouncedSearch, (search: string) => {
    emits('input-change', search)
})





</script>

<style scoped>
.input {
    width: 100%;
    padding: 1rem;
    outline: none;
    background-color: var(--color-bg-elements);
    color: var(--color-text);
    border: 1px solid transparent;
    box-shadow: 0px 24px 80px rgba(74, 74, 74, 0.07), 0px 5.36071px 17.869px rgba(74, 74, 74, 0.0417275), 0px 1.59602px 5.32008px rgba(74, 74, 74, 0.0282725);
    font-family: Nunito;
}

.input::placeholder {
    font-family: Nunito;
    color: var(--color-text);
}

@media (min-width : 768px){
    .input {
        width: unset;
    }
}

</style>