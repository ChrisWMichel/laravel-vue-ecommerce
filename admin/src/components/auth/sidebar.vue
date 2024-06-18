<template>
    <div class="flex flex-col h-full w-48 bg-white\75 rounded-l-xl dark:bg-gray-700">
        <router-link  :to="{name: 'app.dashboard'}" class="w-full text-black no-underline transition-colors rounded dark:text-white/50 hover:bg-white/65" >
            <div class="flex w-full gap-2 py-3 ml-5 justify-left">
                <span class="w-6 h-6 "><HomeIcon/></span>
                <span>Dashboard</span>
            </div>
        </router-link>
        <router-link  :to="{name: 'app.dashboard'}" class="w-full text-black no-underline transition-colors rounded dark:text-white/50 hover:bg-white/65 hover:text-white/20" >
            <div class="flex w-full gap-2 py-3 ml-5 justify-left">
                <span class="w-6 h-6"><ListBulletIcon/></span>
                <span>Products</span>
            </div>
        </router-link>
        <router-link  :to="{name: 'app.dashboard'}" class="w-full text-black no-underline transition-colors rounded dark:text-white/50 hover:bg-white/65" >
            <div class="flex w-full gap-2 py-3 ml-5 justify-left">
                <span class="w-6 h-6 "><UserIcon/></span>
                <span>Users</span>
            </div>
        </router-link>
        <router-link  :to="{name: 'app.dashboard'}" class="w-full text-black no-underline transition-colors rounded dark:text-white/50 hover:bg-white/65" >
            <div class="flex w-full gap-2 py-3 ml-5 justify-left">
                <span class="w-6 h-6 "><ChartBarIcon/></span>
                <span>Reports</span>
            </div>
        </router-link>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { HomeIcon, UserIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/solid';

// 
const menuItems = reactive([
    { id: 1, title: 'Profile', link: 'profile' },
    // { id: 2, title: 'About', link: '/about' },
    // { id: 3, title: 'Contact', link: '/contact' },
]);

</script>

<style scoped>
ul {
    list-style-type: none;
    padding: 0;
}

li {
    padding: 10px;
}
a:hover {
    color: #666;
}
</style>