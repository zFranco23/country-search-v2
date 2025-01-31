<template>
    <div class="paginator">
      <button @click="goToPreviousPage" :disabled="currentPage === 0" class="paginator-button">
        &lsaquo;
      </button>
      <div class="page-numbers">
        <button 
          v-for="page in visiblePages" 
          :key="page" 
          @click="goToPage(page - 1)"
          :class="['paginator-button', { 'active': currentPage + 1 === page }]"
        >
          {{ page }}
        </button>
      </div>
      <button @click="goToNextPage" :disabled="currentPage + 1 === totalPages" class="paginator-button">
        &rsaquo;
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  
  const props = withDefaults(defineProps< {
    currentPage: number,
    totalPages: number,
    maxVisiblePages: number | undefined
  }>(), {
    maxVisiblePages: 5
  })
  
  const emit = defineEmits<{
    (e: 'page-change', page: number): void
  }>();
  
  const visiblePages = computed(() => {
    const pages = [];
    const halfVisible = Math.floor(props.maxVisiblePages / 2);
    let start = Math.max(1, props.currentPage - halfVisible);
    let end = Math.min(props.totalPages, start + props.maxVisiblePages - 1);
  
    if (end - start + 1 < props.maxVisiblePages) {
      start = Math.max(1, end - props.maxVisiblePages + 1);
    }
  
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  
    return pages;
  });
  
  const goToPage = (page: number) => {
    emit('page-change', page);
  };
  
  const goToPreviousPage = () => {
    if (props.currentPage > 1) {
      emit('page-change', props.currentPage - 1);
    }
  };
  
  const goToNextPage = () => {
    if (props.currentPage + 1 < props.totalPages) {
      emit('page-change', props.currentPage + 1);
    }
  };
  

  </script>
  
  <style scoped>
  .paginator {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
  }
  
  .paginator-button {
    background-color: var(--color-bg-elements);
    border: none;
    color: var(--color-text);
    cursor: pointer;
    font-size: 14px;
    margin: 0 2px;
    padding: 8px 12px;
    transition: background-color 0.3s ease;
  }
  
  .paginator-button:hover:not(:disabled) {
    background-color: #e0e0e0;
  }
  
  .paginator-button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  .paginator-button.active {
    background-color: #007bff;
    color: white;
  }
  
  .page-numbers {
    display: flex;
    margin: 0 10px;
  }
  
  @media (max-width: 600px) {
    .paginator {
      flex-wrap: wrap;
    }
    
    .page-numbers {
      order: -1;
      width: 100%;
      margin-bottom: 10px;
      justify-content: center;
    }
  }
  </style>