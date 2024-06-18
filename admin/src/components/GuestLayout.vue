<template>
    <div class="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <!-- <img class="w-auto h-10 mx-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> -->
        <h2 class="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900 dark:text-gray-200">{{ title }}</h2>
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" style="width: 400px;">
        
            <slot></slot>
       
      </div>
    </div>
</template>

<script setup>

defineProps({
  title: String
})

const emit = defineEmits(['submit'])
</script>