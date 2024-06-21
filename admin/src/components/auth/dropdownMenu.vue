<template>
    <div class="text-right top-0.5 mt-1 max-w-max" style="width: max-content;">
      <Menu as="div" class="relative inline-block w-full text-left">
        <div>
          <MenuButton
            class="inline-flex justify-start space-x-2 px-4 w-30 mt-[-4px] text-sm font-medium rounded-md bg-transparent "
          >
          <div class="text-sm">{{ firstname }}</div>
         
            <img class="rounded-full w-7 h-7" src="https://randomuser.me/api/portraits/men/29.jpg"/>
            <ChevronDownIcon
              class="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          
          </MenuButton>
        </div>
  
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="absolute w-56 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg right-20 ring-1 ring-black/5 focus:outline-none"
          >
            <div >
              <MenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-gray-700 text-white' : 'text-gray-400',
                    'group flex w-56 items-center rounded-md px-2 py-2 text-sm',
                  ]"
                >
                  <UserIcon
                    :active="active"
                    class="w-5 h-5 mr-2 text-violet-400"
                    aria-hidden="true"
                  />
                 Profile
                </button>
              </MenuItem>
              
              <MenuItem v-slot="{ active }">
                <button @click.prevent="logout"
                  :class="[
                    active ? 'bg-gray-700 text-white' : 'text-gray-400',
                    'group flex w-56 items-center rounded-md px-2 py-2 text-sm',
                  ]"
                >
                  <ArrowLeftStartOnRectangleIcon
                    :active="active"
                    class="w-5 h-5 mr-2 text-violet-400"
                    aria-hidden="true"
                  />
                  Logout
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </template>
  
  <script setup>
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
  import { ChevronDownIcon, UserIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/vue/24/solid'
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../../stores/authStore';

  const authStore = useAuthStore();
  const router = useRouter();
  const firstname = authStore.user.data.firstname || 'Hello';

  function logout() {
    authStore.logout()
    router.push({ name: 'login' })
  }
  console.log('authStore', authStore)
  </script>

  <style scoped>

  </style>
  