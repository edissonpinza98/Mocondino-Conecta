<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCommunityStore } from '../stores/community'
import { Menu, X, ChevronDown, Sparkles, MapPin, Shield, LogOut, Heart } from 'lucide-vue-next'

const store = useCommunityStore()
const isOpen = ref(false)
const isScrolled = ref(false)
const activeDropdown = ref(null)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navLinks = [
  { name: 'Inicio', path: '/' },
  { name: 'Talento', path: '/talento' },
  { name: 'Negocios', path: '/negocios' },
  { name: 'Eventos', path: '/eventos' },
]

const juntas = [
  { name: 'Acueducto', id: 'acueducto' },
  { name: 'Acción Comunal', id: 'comunal' },
  { name: 'Cementerio', id: 'cementerio' },
]

const ediles = [
  { name: 'Edil Principal', id: 'edil_uno' },
  { name: 'Edil Secundario', id: 'edil_dos' },
]

const toggleDropdown = (name) => {
  activeDropdown.value = activeDropdown.value === name ? null : name
}
</script>

<template>
  <nav 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      isScrolled ? 'py-4' : 'py-6'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div 
        :class="[
          'relative glass-card !rounded-2xl border-white/40 transition-all duration-500',
          isScrolled ? 'bg-white/80 shadow-2xl' : 'bg-white/40 shadow-sm'
        ]"
      >
        <div class="px-6 h-16 flex items-center justify-between">
          <!-- Logo -->
          <RouterLink to="/" class="flex items-center space-x-3 group">
            <div class="icon-container-primary !w-10 !h-10 group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out">
               <MapPin class="w-6 h-6 text-white" />
            </div>
            <div class="flex flex-col text-left">
              <span class="text-lg font-black leading-none tracking-tighter text-slate-900">MOCONDINO</span>
              <span class="text-[10px] font-black tracking-[0.3em] text-primary-600 uppercase">Conecta</span>
            </div>
          </RouterLink>

          <!-- Desktop Nav -->
          <div class="hidden lg:flex items-center gap-x-1 xl:gap-x-2">
            <!-- Juntas Dropdown -->
            <div class="relative group" @mouseenter="activeDropdown = 'juntas'" @mouseleave="activeDropdown = null">
              <button 
                class="px-2 xl:px-4 py-2 rounded-xl text-xs xl:text-sm font-black text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-all flex items-center gap-1"
                :class="{ 'text-primary-600 bg-primary-50': activeDropdown === 'juntas' }"
              >
                Juntas
                <ChevronDown class="w-3.5 h-3.5 transition-transform duration-300" :class="{ 'rotate-180': activeDropdown === 'juntas' }" />
              </button>
              
              <transition name="page">
                <div 
                  v-if="activeDropdown === 'juntas'"
                  class="absolute top-full left-0 mt-2 w-56 glass-card !rounded-2xl border-white/60 p-2 shadow-2xl backdrop-blur-2xl bg-white/90"
                >
                  <RouterLink 
                    v-for="junta in juntas" 
                    :key="junta.id"
                    :to="{ name: 'board-detail', params: { id: junta.id } }"
                    class="block px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-primary-600 hover:text-white transition-all mb-1 last:mb-0"
                  >
                    {{ junta.name }}
                  </RouterLink>
                </div>
              </transition>
            </div>

            <!-- Ediles Dropdown -->
            <div class="relative group" @mouseenter="activeDropdown = 'ediles'" @mouseleave="activeDropdown = null">
              <button 
                class="px-2 xl:px-4 py-2 rounded-xl text-xs xl:text-sm font-black text-slate-600 hover:text-secondary-600 hover:bg-secondary-50 transition-all flex items-center gap-1"
                :class="{ 'text-secondary-600 bg-secondary-50': activeDropdown === 'ediles' }"
              >
                Ediles
                <ChevronDown class="w-3.5 h-3.5 transition-transform duration-300" :class="{ 'rotate-180': activeDropdown === 'ediles' }" />
              </button>
              
              <transition name="page">
                <div 
                  v-if="activeDropdown === 'ediles'"
                  class="absolute top-full left-0 mt-2 w-56 glass-card !rounded-2xl border-white/60 p-2 shadow-2xl backdrop-blur-2xl bg-white/90"
                >
                  <RouterLink 
                    v-for="edil in ediles" 
                    :key="edil.id"
                    :to="{ name: 'board-detail', params: { id: edil.id } }"
                    class="block px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-secondary-600 hover:text-white transition-all mb-1 last:mb-0"
                  >
                    {{ edil.name }}
                  </RouterLink>
                </div>
              </transition>
            </div>

            <RouterLink 
              v-for="link in navLinks" 
              :key="link.path"
              :to="link.path"
              class="px-2 xl:px-4 py-2 rounded-xl text-xs xl:text-sm font-black text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-all font-sans"
              active-class="text-primary-600 bg-primary-50"
            >
              {{ link.name }}
            </RouterLink>

            <div class="h-6 w-px bg-slate-200 mx-2"></div>

            <!-- Admin Button -->
            <RouterLink 
              v-if="!store.user"
              to="/login"
              class="px-3 xl:px-4 py-2 rounded-xl text-[10px] xl:text-xs font-black text-slate-500 hover:text-white bg-slate-50 hover:bg-slate-900 border border-slate-200 transition-all flex items-center gap-2 group/admin shadow-sm hover:shadow-lg"
            >
              <div class="w-6 h-6 rounded-lg bg-slate-900 flex items-center justify-center group-hover/admin:bg-primary-500 transition-colors">
                <Shield class="w-3.5 h-3.5 text-white animate-pulse-glow" />
              </div>
              ACCESO ADMIN
            </RouterLink>
            
            <button 
              v-else
              @click="store.logout()"
              class="px-3 xl:px-4 py-2 rounded-xl text-[10px] xl:text-xs font-black text-red-600 hover:text-white bg-red-50 hover:bg-red-600 border border-red-100 transition-all flex items-center gap-2 group/out shadow-sm hover:shadow-lg"
            >
              <div class="w-6 h-6 rounded-lg bg-red-600 flex items-center justify-center">
                <LogOut class="w-3.5 h-3.5 text-white group-hover/out:-translate-x-0.5 transition-transform" />
              </div>
              SALIR
            </button>

            <RouterLink 
              to="/participar" 
              class="btn-premium-primary !text-[10px] xl:!text-xs !px-4 xl:!px-6 !py-2 xl:!py-2.5 uppercase tracking-widest shadow-lg shadow-primary-500/25 ml-1 flex items-center gap-2 group/part"
            >
              <Heart class="w-3.5 h-3.5 group-hover/part:scale-125 transition-transform animate-pulse" />
              Participar
            </RouterLink>
          </div>

          <!-- Mobile Toggle -->
          <button @click="isOpen = !isOpen" class="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
            <Menu v-if="!isOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="page">
      <div v-if="isOpen" class="lg:hidden absolute top-full left-0 right-0 mt-4 px-4">
        <div class="glass-card shadow-2xl p-6 border-white/60 overflow-hidden">
          <div class="space-y-4">
            <RouterLink 
              v-for="link in navLinks" 
              :key="link.name"
              :to="link.path"
              class="block text-2xl font-black text-slate-900 border-b border-slate-100 pb-4"
              @click="isOpen = false"
            >
              {{ link.name }}
            </RouterLink>
            
            <div class="pt-4 grid grid-cols-2 gap-4">
                <div>
                   <div class="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-4">Juntas</div>
                   <div class="grid grid-cols-1 gap-2">
                       <RouterLink 
                           v-for="junta in juntas" 
                           :key="junta.id"
                           :to="{ name: 'board-detail', params: { id: junta.id } }"
                           class="px-4 py-3 bg-slate-50 rounded-xl text-sm font-bold text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-all"
                           @click="isOpen = false"
                       >
                           {{ junta.name }}
                       </RouterLink>
                   </div>
                </div>
                <div>
                   <div class="text-[10px] font-black text-secondary-600 uppercase tracking-widest mb-4">Ediles</div>
                   <div class="grid grid-cols-1 gap-2">
                       <RouterLink 
                           v-for="edil in ediles" 
                           :key="edil.id"
                           :to="{ name: 'board-detail', params: { id: edil.id } }"
                           class="px-4 py-3 bg-slate-50 rounded-xl text-sm font-bold text-slate-700 hover:bg-secondary-50 hover:text-secondary-600 transition-all"
                           @click="isOpen = false"
                       >
                           {{ edil.name }}
                       </RouterLink>
                   </div>
                </div>
            </div>

            <RouterLink 
              to="/participar" 
              class="btn-premium-primary w-full text-center py-4 text-lg"
              @click="isOpen = false"
            >
              Participar Ahora
            </RouterLink>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>
