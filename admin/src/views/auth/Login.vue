<template>
  <GuestLayout title="Sign in to your account">
    
    <form class="space-y-6" @submit.prevent="login" method="POST">
      <div>
        <!-- <label for="email" class="block text-sm font-medium leading-6 text-gray-900"/>  -->
        <div class="mt-2">
          <input id="email" name="email" type="email" autocomplete="email" required="" placeholder="Email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <!-- <label for="password" class="block text-sm font-medium leading-6 text-gray-900"/> -->
          <div class="text-sm">
            <router-link :to="{name: 'requestPassword'}" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</router-link>
          </div>
        </div>
        <div class="mt-2">
          <input id="password" name="password" type="password"  placeholder="Password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 group relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon class="w-5 h-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            Sign in
        </button>
      </div>
      <div class="flex items-center">
        <input id="remember_me" name="remember_me" type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
        <label for="remember_me" class="block ml-2 text-sm text-gray-900 dark:text-gray-200">
          Remember me
        </label>
      </div>
    </form>
     
  </GuestLayout>
  </template>
  
<script setup>
import { LockClosedIcon } from '@heroicons/vue/24/solid'
import GuestLayout from '../../components/GuestLayout.vue';

const login = () => {
  console.log("Login.vue script setup executed")
}

</script>