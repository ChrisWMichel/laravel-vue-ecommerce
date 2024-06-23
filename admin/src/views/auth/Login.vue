<template>
  <GuestLayout title="Sign in to your account">
    
    <form class="space-y-6" @submit.prevent="login" method="POST">
      <div v-if="errorMsg" class="flex items-center justify-center px-5 py-3 text-sm text-red-500">
        {{ errorMsg }}
        <span @click="errorMsg = ''" class="flex items-center justify-center w-4 h-4 pb-1 ml-5 font-bold transition-colors rounded-full cursor-pointer bg-red-50 hover:bg-gray-400">
          x
        </span>
      </div>
      <div>
        <div class="mt-2">
          <input id="email" v-model="user.email" name="email" type="email" autocomplete="email" required="" placeholder="Email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <div class="text-sm">
            <router-link :to="{name: 'requestPassword'}" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</router-link>
          </div>
        </div>
        <div class="mt-2">
          <input id="password" v-model="user.password" name="password" type="password"  placeholder="Password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>

      <div>
        <button :disabled="loading" type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 group relative"
        :class="{'cursor-not-allowed': loading, 'hover:bg-gray-300': loading}"
        >
          <svg v-if="loading" class="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"    viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon class="w-5 h-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            Sign in
        </button>
      </div>
      <div class="flex items-center">
        <input id="remember_me" v-model="user.remember" name="remember_me" type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/authStore';

const authStore = useAuthStore();
const router = useRouter();
const loading = ref(false);
const errorMsg = ref('');

const user = ref({
  email: '',
  password: '',
  remember: false
});

function login() {
  loading.value = true;
  authStore.login(user.value)
    .then(() => {
      loading.value = false;
      router.push({ name: 'app.dashboard' });
    })
    .catch(({response}) => {
      loading.value = false;
      errorMsg.value = response.data.message;
    });
}

</script>