<template>
    <div class="flex items-center justify-between mb-3">
      <h1 class="text-3xl font-semibold text-gray-400">
        Products
      </h1>
      
      <button 
      class="flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md">
        Add Product
      </button>
    </div>
    <productsTable/>
    

  </template>
  
  <script setup>

  import productsTable from '../Products/productsTable.vue';


  </script>
  
  <style scoped>
  
  </style>