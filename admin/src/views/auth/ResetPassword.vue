<template>
  
  <GuestLayout title="Reset Password">
    <form class="space-y-6" action="#" method="POST">
      <div>
        <div class="mt-2">
          <input id="password" name="password" type="password"  placeholder="New Password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
        <div class="mt-2">
          <input id="confirm_password" name="confirm_password" type="password"  placeholder="Confirm Password"  required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 group relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon class="w-5 h-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            Reset
        </button>
      </div>        
    </form>
  </GuestLayout>
 </template>
  
<script setup>
import { LockClosedIcon } from '@heroicons/vue/24/solid'
import GuestLayout from '../../components/GuestLayout.vue';
</script>