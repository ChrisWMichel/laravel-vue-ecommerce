<template>
    <div class="p-4 bg-white rounded-lg shadow">
      <div class="flex justify-between pb-3 border-b-2">
        <div class="flex items-center">
          <span class="mr-3 whitespace-nowrap text-black/70 ">Per Page</span>
          <select @change="getProducts()" v-model="perPage" class="px-2 py-1 border border-gray-300 rounded-md text-black/70 w-[60px]">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <div>
          <input v-model="search" @change="getProducts()" type="text" class="px-2 py-1 border border-gray-300 rounded-md text-black/70" placeholder="Search Products">
        </div>
      </div>
      
      <table class="w-full table-auto text-black/70">
        <thead>
          <tr>
            <headerSorting @click="sortProducts" :field="'id'" :sortField="sortField" :sortDirection="sortDirection" class="p-2 text-left border-b-2">
              ID
            </headerSorting>
            <headerSorting @click="sortProducts" :field="'title'" :sortField="sortField" :sortDirection="sortDirection" class="p-2 text-left border-b-2">
              Name  
            </headerSorting>
            <th class="p-2 text-left bg-gray-100 border-b-2">Image</th>
            <headerSorting @click="sortProducts" :field="'price'" :sortField="sortField" :sortDirection="sortDirection" class="p-2 text-left border-b-2">
              Price
            </headerSorting>
            <headerSorting @click="sortProducts" :field="'updated_at'" :sortField="sortField" :sortDirection="sortDirection" class="p-2 text-left border-b-2">
              Updated
            </headerSorting>
            <th class="p-2 text-left border-b-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-2 border-b" colspan="6">
              <div class="flex items-center justify-center h-full">
                <spinner v-if="loading"/> 
                <p v-else-if="!isNotEmpty" class="text-center text-black/70">No products found</p>
              </div>
            </td>
          </tr>
          <tr v-for="product in products" :key="product.id" class="text-black/70">
            <td class="p-2 border-b">{{ product.id }}</td>
            
            <td class="border-b p-2 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">{{ product.title }}</td>
            <td class="w-auto p-2 border-b">
              <img :src="product.image" class="object-cover h-10 rounded-md" alt="product image">
            </td>
            <td class="p-2 border-b">{{ product.price }}</td>
            <td class="p-2 border-b">{{ product.updated_at }}</td>
            <td>
              <button class="px-2 py-1 text-sm text-white bg-indigo-600 rounded-md">Edit</button>
              <button class="px-2 py-1 text-sm text-white bg-red-600 rounded-md">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div  v-if="links.meta" class="text-black/70">
       
        <p class="text-black/70">Showing {{ links.meta.from }} to {{ links.meta.to }} of {{ links.meta.total }} entries</p>
        <div class="flex items-center justify-between mt-5 ml-[40%]">       
          <nav v-if="links.meta.total > links.meta.per_page"
              class="relative z-0 inline-flex items-center justify-center -space-x-px rounded-md shadow-lg" 
              aria-label="Pagination">
            <template v-for="(link, index) in links.meta.links" >
              <div >
                <a :key="index" 
                  @click.prevent="getForPage(link)"
                  
                  class="relative inline-flex items-center px-4 py-2 text-sm font-medium whitespace-nowrap hover:cursor-pointer"
                  :class="[
                    link.active ? 'bg-gray-300 text-white' : 'text-gray-700 hover:bg-gray-50',
                    index === 0 ? 'rounded-l-md' : '',
                    index === links.meta.links.length - 1 ? 'rounded-r-md' : ''
                  ]"
                  v-html="link.label"
                  >
                </a>
              </div>
            </template>
          </nav>
        </div>
      </div>
      
      <!-- <spinner v-if="loading" />
      <template v-else>
        <div v-if="isNotEmpty > 0" class="mt-3">
          
        </div>
        <div v-else class="mt-3">
          <p class="text-black/70">No products found</p>
        </div>
      </template> -->
    </div>

  </template>
  
  <script setup>
  import Spinner from '../../components/core/spinner.vue';
  import { ref, onMounted, computed } from 'vue';
  import headerSorting from '../../components/table/headerSorting.vue';
  import { PRODUCTS_PER_PAGE } from '../../constants.js';
  import  {useProductStore}  from '../../stores/productStore.js';

  const search = ref('');
  const products = ref([]);
  const links = ref({});
  const loading = ref(false);
  const sortField = ref('updated_at');
  const sortDirection = ref('desc');
  const perPage = ref(PRODUCTS_PER_PAGE);
  const productsStore = useProductStore();

  const getProducts = async (url = null) => {
    try {
      loading.value = true;
      await productsStore.getProducts(url, search.value, perPage.value, sortField.value,  sortDirection.value);
      products.value = productsStore.products.data.data;
      links.value = productsStore.products.data; 
      if (links.value && links.value.meta) {
        console.log('links.meta', links.value.meta);
        console.log('links.meta.from', links.value.meta.from);
      } else {
        console.log('links.value.meta is not defined');
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      loading.value = false;
    }
};

  const getForPage = async (link) => {
    if(link.active) return;
    try {
      loading.value = true;
      await productsStore.getProducts(link.url);
      products.value = productsStore.products.data.data;
      links.value = productsStore.products.data; 
      
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      loading.value = false;
    }
  };

  const sortProducts = (field) => {
    if(sortField.value !== field) {
      sortField.value = field;
      sortDirection.value = 'asc';
    } else if(sortDirection.value === 'asc') {
      sortDirection.value = 'desc';
    } else {
      sortDirection.value = 'asc';
    }

    getProducts();
  };

   const isNotEmpty = computed(() => products.value.length > 0);  

  onMounted(getProducts);

  </script>
  
  <style scoped>
  
  </style>