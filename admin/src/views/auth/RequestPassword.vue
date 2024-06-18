<template>
  
    <GuestLayout title="Request Password Change">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <!-- <label for="email" class="block text-sm font-medium leading-6 text-gray-900"/>  -->
          <div class="mt-2">
            <input id="email" name="email" type="email" autocomplete="email" required="" placeholder="Email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 group relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon class="w-5 h-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Submit
          </button>
        </div>
        
      </form>
    </GuestLayout>
</template>
  
<script setup>
import { LockClosedIcon } from '@heroicons/vue/24/solid'
import GuestLayout from '../../components/GuestLayout.vue';
</script>