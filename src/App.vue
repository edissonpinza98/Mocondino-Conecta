<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useCommunityStore } from './stores/community'
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'

const store = useCommunityStore()

onMounted(() => {
  store.fetchAllData()
})
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans selection:bg-primary-500/20">
    <TheNavbar />
    
    <!-- Loading Overlay -->
    <transition name="page">
      <div v-if="store.loading" class="fixed inset-0 z-[100] bg-white/80 backdrop-blur-md flex items-center justify-center">
        <div class="flex flex-col items-center gap-6">
          <div class="w-16 h-16 border-4 border-slate-100 border-t-primary-600 rounded-full animate-spin"></div>
          <div class="text-xs font-black text-slate-400 uppercase tracking-widest animate-pulse">Cargando Mocondino...</div>
        </div>
      </div>
    </transition>

    <main class="flex-grow pt-20">
      <RouterView v-slot="{ Component }">
        <transition
          name="page"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <TheFooter />
  </div>
</template>

<style>
/* Transitions are defined in style.css */
</style>
