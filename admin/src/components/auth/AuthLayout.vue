<template>
    <div class="main-container ">
      <div class="app-container">
        <!-- Sidebar -->
        <div class=" mt-[-30px]" style="">
            <sidebar />
        </div>
      </div>
      <div class="content-area">
        <header  class="h-12 shadow bg-white/65 dark:bg-gray-800">
          <navbar />
        </header>
        <main>
          <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="py-4">
              <router-view></router-view>
            </div>
          </div>
        </main>
      </div>
    </div>
</template>

<script setup>
import sidebar from './sidebar.vue';
import navbar from './navbar.vue';

</script>

<style scoped>
.main-container {
   display: flex;
    height: 100vh;
}
.app-container {
  display: flex;
    height: 100vh; 

}
.content-area {
    flex-grow: 1;
    margin-top: -30px; /* Adjust if necessary */
}


header {
    width: 100%; 
    position: sticky;
    top: 0;
    z-index: 1000;
}

.flex-1 {
    padding-top: 2.25rem; 
}

main {
    padding-top: 2.25rem;
}
</style>