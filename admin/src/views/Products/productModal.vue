<template>
    
    <TransitionRoot appear :show="show" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/75" />
        </TransitionChild>
  
        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex items-center justify-center min-h-full p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
              >
                <Spinner v-if="loading" class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-white" />
                <header class="flex items-center justify-between px-4 py-3">
                    <DialogTitle class="text-lg font-semibold leading-6 text-gray-900">
                        {{ product.id ? `Update product: "${props.product.title}"` : 'Create New Product' }}
                    </DialogTitle>
                    <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
                        <svg
                            class="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </header>
                <form @submit.prevent='onSubmit'>
                    <div class="px-4 pt-5 pb-4 bg-white">
                        <CustomInput
                            v-model="product.title"
                            label="Title"
                            placeholder="Enter product title"
                            required
                            class="mb-2"
                        />
                        <CustomInput
                            v-model="product.image"
                            type="file"
                            label="Image"
                            placeholder="Enter product image URL"
                            required
                            class="mb-2"
                        />
                        <CustomInput
                            :modelValue="product.description"
                            @update:modelValue="val => product.description = val"
                            type="textarea"
                            label="Description"
                            placeholder="Enter product description"
                            required
                            class="mb-2"
                        />
                        <CustomInput
                            v-model="product.price"
                            type="number"
                            label="Price"
                            placeholder="Enter product price"
                            required
                            prepend="$"
                            class="mb-2"
                        />
                    </div>
                    <footer class="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="submit" class="ml-3 text-gray-200 bg-indigo-500 hover:bg-indigo-800 btnStyle">
                            Save
                        </button>
                        <button @click="closeModal" type="button" class="text-gray-700 bg-white hover:bg-gray-50 btnStyle">
                            Cancel
                        </button>
                    </footer>
                </form>

              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script setup>
  import { ref, computed, onUpdated } from 'vue'
  import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  } from '@headlessui/vue'
import Spinner from '../../components/core/spinner.vue';
import  {useProductStore}  from '../../stores/productStore.js';
import CustomInput from '../../components/core/CustomInput.vue';

  const props = defineProps({
    showModal: Boolean,
    product: Object,
  })

  const loading = ref(false)
  const productsStore = useProductStore();

  const product = ref({
    id: props.product.id,
    title: props.product.title,
    image: props.product.image,
    description: props.product.description,
    price: props.product.price,
  })


  const emit = defineEmits(['update:showModal', 'close'])

  const show = computed({
    get: () => props.showModal,
    set: (value) => {
      if (value !== props.showModal) { // Prevent recursive update if value is the same
        emit('update:showModal', value)
      }
    },
  })
  
  function closeModal() {
    if (show.value) { // Only update if show is true to prevent unnecessary updates
      show.value = false
      emit('close')
    }
  }

  const onSubmit = async () => {
    loading.value = true;
    try {
        if (product.value.id) {
            // Update product
            await productsStore.updateProduct(product.value.id, product.value);
            product.value = {
                id: '',
                title: '',
                image: '',
                description: '',
                price: '',
            };
            await productsStore.getProducts();
        } else {
            // Create product
            console.log('product', product.value);
            await productsStore.addProduct(product.value);
            product.value = {
              id: '',
              title: '',
              image: '',
              description: '',
              price: '',
            };
            await productsStore.getProducts();
        }
        closeModal();
    } catch (error) {
        console.error("Failed to update/create product:", error);
    } finally {
        loading.value = false;
    }
};

  onUpdated(() => {
    product.value = {
      id: props.product.id,
      title: props.product.title,
      image: props.product.image,
      description: props.product.description,
      price: props.product.price,
    }
  })

  </script>
  <style scope>
    .btnStyle {
        @apply inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm
    }
  </style>;