<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useCommunityStore } from './stores/community'
import { MapPin } from 'lucide-vue-next'
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
      <div v-if="store.loading" class="fixed inset-0 z-[100] bg-white/90 backdrop-blur-2xl flex items-center justify-center">
        <div class="flex flex-col items-center">
          <div class="relative w-24 h-24 mb-8">
            <div class="absolute inset-0 border-4 border-slate-100 rounded-[2.5rem]"></div>
            <div class="absolute inset-0 border-4 border-t-primary-600 rounded-[2.5rem] animate-spin"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <MapPin class="w-8 h-8 text-primary-600 animate-bounce" />
            </div>
          </div>
          <div class="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] animate-pulse">Sincronizando Mocondino...</div>
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
