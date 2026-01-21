<script setup>
import { Calendar, MapPin, Clock, ArrowRight, Share2, Bell } from 'lucide-vue-next'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const getDay = (dateStr) => new Date(dateStr).getDate() + 1
const getMonth = (dateStr) => new Date(dateStr).toLocaleString('es-ES', { month: 'short' })
</script>

<template>
  <div class="glass-card p-1 group hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 active:scale-[0.99]">
    <div class="bg-white/40 rounded-[1.8rem] overflow-hidden flex flex-col md:flex-row h-full">
      <!-- Date Column -->
      <div class="md:w-44 bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-10 text-center relative overflow-hidden shrink-0">
        <div class="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute bottom-0 left-0 w-24 h-24 bg-secondary-600/10 blur-2xl rounded-full -translate-x-1/2 translate-y-1/2"></div>
        
        <div class="relative z-10">
           <span class="block text-6xl font-black text-white leading-none mb-2 tracking-tight">{{ getDay(event.date) }}</span>
           <span class="block text-sm font-black text-primary-400 uppercase tracking-[0.35em]">{{ getMonth(event.date) }}</span>
        </div>
        
        <div class="mt-10 relative z-10 md:hidden">
           <div class="px-5 py-2 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/20">
              {{ event.type || 'Cultural' }}
           </div>
        </div>
      </div>

      <!-- Content Column -->
      <div class="p-8 flex-grow flex flex-col justify-between">
        <div>
           <div class="flex items-center justify-between mb-4">
              <span class="hidden md:inline-block px-3 py-1 bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-primary-100">
                 {{ event.type || 'Evento Cultural' }}
              </span>
              <div class="flex gap-2">
                 <button class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    <Bell class="w-4 h-4" />
                 </button>
                 <button class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    <Share2 class="w-4 h-4" />
                 </button>
              </div>
           </div>
           
           <h3 class="text-2xl font-black mb-4 text-slate-900 group-hover:text-primary-600 transition-colors tracking-tight leading-tight">
              {{ event.title }}
           </h3>
           
           <p class="text-slate-500 text-sm mb-8 line-clamp-2 font-medium leading-relaxed">
              {{ event.description }}
           </p>
        </div>

        <div class="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-100">
           <div class="flex items-center text-xs font-black text-slate-600 uppercase tracking-widest gap-3">
              <div class="w-9 h-9 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center">
                <Clock class="w-5 h-5 text-primary-600" />
              </div>
              {{ event.time }}
           </div>
           <div class="flex items-center text-xs font-black text-slate-600 uppercase tracking-widest gap-3">
              <div class="w-9 h-9 rounded-xl bg-secondary-50 border border-secondary-100 flex items-center justify-center">
                <MapPin class="w-5 h-5 text-secondary-600" />
              </div>
              {{ event.location }}
           </div>
        </div>
      </div>

      <!-- Action Column -->
      <div class="p-8 border-t md:border-t-0 md:border-l border-slate-100 flex items-center justify-center bg-slate-50/50 md:w-48 shrink-0">
        <button class="btn-premium-primary text-xs !px-8 !py-4 uppercase tracking-widest shadow-none hover:shadow-lg w-full md:w-auto">
           Asistir
        </button>
      </div>
    </div>
  </div>
</template>
