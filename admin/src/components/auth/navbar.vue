<template>
    <nav>
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16 pb-3">
                <!-- Left Side (Logo and Links) -->
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <button>
                            <Bars3Icon class="w-4 h-4 text-white" />
                        </button>
                    </div>
                    <div class="hidden ml-10 space-x-4 md:flex">
                        <a href="#" class="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md">Dashboard</a>
                        <a href="#" class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">Team</a>
                        <a href="#" class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">Projects</a>
                        <a href="#" class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">Calendar</a>
                    </div>
                </div>
                <!-- Right Side (Dropdown Menu) -->
                <div class="flex-shrink-0">
                    <dropdownMenu />
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { Bars3Icon } from '@heroicons/vue/24/solid';
import dropdownMenu from './dropdownMenu.vue';
</script>