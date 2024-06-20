<template>
    <div class="main-container ">
      <div class="app-container">
        <!-- Sidebar -->
        <transition name="slide">
          <div v-if="showSidebar">
              <sidebar />
          </div>
        </transition>
      </div>
      <div class="content-area">
        <header  class="h-12 shadow bg-white/65 dark:bg-gray-800">
          <navbar @toggleSidebar="toggleSidebar" />
        </header>
        <main class="pl-10">
          <router-view></router-view>
        </main>
      </div>
    </div>
</template>

<script setup>
import sidebar from './sidebar.vue';
import navbar from './navbar.vue';
import { ref, onMounted, onUnmounted } from 'vue';

const showSidebar = ref(true);

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};

onMounted(() => {
  if(window.outerWidth <= 768) {
    showSidebar.value = false;
  }

  window.addEventListener('resize', () => {
    if(window.outerWidth <= 768) {
      showSidebar.value = false;
    } else {
      showSidebar.value = true;
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    if(window.outerWidth <= 768) {
      showSidebar.value = false;
    } else {
      showSidebar.value = true;
    }
  });
});

</script>

<style scoped>

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
}
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