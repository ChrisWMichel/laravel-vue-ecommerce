<template>
    <div class="flex items-center justify-between mb-3">
      <h1 class="text-3xl font-semibold text-gray-400">
        Products
      </h1>
      
      <button 
      @click="showProductModal"
      class="flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md">
        Add Product
      </button>
    </div>
    <ProductModal :showModal="showModal" @update:showModal="value => showModal = value" :product="productModel" />

    <productsTable/>
    

  </template>
  
<script setup>
  import productsTable from '../Products/productsTable.vue';
  import ProductModal from './productModal.vue';
  import { ref } from 'vue';

  const showModal = ref(false);
  const product = ref({});
  const productModel = ref({
    id:'',
    title: '',
    image: '',
    description: '',
    price: '',
  
  });

  const showProductModal = () =>{
    console.log('show modal')
    showModal.value = true;
  }

</script>

<style scoped>

</style>