<template>
    <div class="flex items-center justify-center h-screen">
        <div class="text-center">
            <h1 class="text-4xl font-bold text-gray-800 dark:text-white">404</h1>
            <p class="text-gray-500 dark:text-gray-300">Page not found. Go back to <router-link :to="{name: 'app.dashboard'}" class="text-blue-500">Home</router-link></p>
        </div>
    </div>
</template>