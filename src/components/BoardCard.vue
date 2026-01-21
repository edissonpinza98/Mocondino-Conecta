<script setup>
import { RouterLink } from 'vue-router'
import { ArrowRight, Users, Droplets, Landmark, Church, ShieldCheck } from 'lucide-vue-next'

const props = defineProps({
  board: {
    type: Object,
    required: true
  }
})

const getIcon = (id) => {
  if (id === 'acueducto') return Droplets
  if (id === 'comunal') return Landmark
  if (id === 'cementerio') return Church
  if (id === 'ediles') return ShieldCheck
  return Users
}
</script>

<template>
  <div class="glass-card p-1 group hover:-translate-y-3 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 active:scale-[0.98]">
    <div class="bg-white/40 rounded-[1.8rem] p-8 h-full flex flex-col relative overflow-hidden">
      <!-- Decor -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-primary-100/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary-200/50 transition-colors"></div>
      
      <div class="relative z-10 flex-grow">
        <div class="flex items-center justify-between mb-8">
          <div class="icon-container-primary !w-20 !h-20 animate-premium-float group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 relative overflow-hidden">
            <component :is="getIcon(board.id)" class="w-10 h-10 text-white relative z-10" />
            
            <!-- Dynamic Glows -->
            <div class="absolute inset-0 bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-700 rounded-full"></div>
            <div class="absolute -top-1/2 -left-1/2 w-full h-full bg-white/10 rotate-45 transform"></div>
          </div>
          <div class="flex items-center gap-2 px-4 py-2 bg-secondary-50 border border-secondary-100 rounded-full shadow-sm">
            <ShieldCheck class="w-3.5 h-3.5 text-secondary-600 animate-pulse" />
            <span class="text-[10px] font-black text-secondary-700 uppercase tracking-widest">Oficial</span>
          </div>
        </div>

        <h3 class="text-2xl font-black mb-4 text-slate-900 leading-tight group-hover:text-primary-600 transition-colors">{{ board.name }}</h3>
        
        <p class="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
          {{ board.mission }}
        </p>
      </div>
      
      <div class="pt-6 border-t border-slate-100 flex items-center justify-between">
        <RouterLink 
          :to="{ name: 'board-detail', params: { id: board.id } }"
          class="text-sm font-black text-primary-600 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
        >
          Explorar Gestión
          <ArrowRight class="w-4 h-4" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>
