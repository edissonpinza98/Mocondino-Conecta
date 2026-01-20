<script setup>
import { Phone, Clock, MapPin, ExternalLink, Store } from 'lucide-vue-next'

const props = defineProps({
  business: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="glass-card p-1 group hover:-translate-y-3 transition-all duration-500 hover:shadow-2xl hover:shadow-secondary-500/10 active:scale-[0.98]">
    <div class="bg-white/40 rounded-[1.8rem] p-8 h-full flex flex-col relative overflow-hidden">
      <!-- Decor -->
      <div class="absolute top-0 right-0 w-24 h-24 bg-secondary-100/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div class="flex justify-between items-start mb-8 relative z-10">
        <div class="w-16 h-16 rounded-2xl bg-secondary-600 flex items-center justify-center text-white shadow-lg shadow-secondary-500/30 group-hover:scale-110 transition-transform">
          <Store class="w-8 h-8" />
        </div>
        <div class="px-3 py-1 bg-secondary-50 rounded-full flex items-center gap-2">
           <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           <span class="text-[10px] font-black text-secondary-600 uppercase tracking-widest">Abierto</span>
        </div>
      </div>

      <h3 class="text-2xl font-black mb-3 text-slate-900 leading-tight group-hover:text-secondary-600 transition-colors">{{ business.name }}</h3>
      <p class="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
        {{ business.description }}
      </p>
      
      <div class="space-y-4 mb-8">
        <div class="flex items-center gap-3 text-sm text-slate-600">
          <div class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
            <Clock class="w-4 h-4 text-secondary-500" />
          </div>
          <span class="font-medium">{{ business.schedule }}</span>
        </div>
        <div class="flex items-center gap-3 text-sm text-slate-600">
          <div class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
            <MapPin class="w-4 h-4 text-secondary-500" />
          </div>
          <span class="font-medium">{{ business.location }}</span>
        </div>
      </div>

      <div class="flex gap-3">
        <a 
          :href="`tel:${business.contact}`"
          class="flex-1 btn-premium bg-slate-100 text-slate-700 !py-3 rounded-xl hover:bg-slate-200 transition-colors"
        >
          <Phone class="w-4 h-4" />
        </a>
        <a 
          :href="business.maps"
          target="_blank"
          class="flex-[3] btn-premium-primary !bg-secondary-600 hover:!bg-secondary-700 !py-3 rounded-xl shadow-secondary-500/20"
        >
          <span class="text-xs font-black uppercase tracking-widest">Ver Mapa</span>
          <ExternalLink class="w-4 h-4" />
        </a>
      </div>
    </div>
  </div>
</template>
