<script setup>
import { MessageCircle, Share2, Star, Verified } from 'lucide-vue-next'

const props = defineProps({
  talent: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="glass-card p-1 group hover:-translate-y-3 transition-all duration-500">
    <div class="bg-white/40 rounded-[1.8rem] overflow-hidden">
      <div class="relative h-72 overflow-hidden group">
        <img 
          :src="talent.image" 
          :alt="talent.name"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="absolute top-4 right-4">
          <div 
            class="backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/20"
            :class="talent.type === 'artista' ? 'bg-purple-600/80 text-white' : 'bg-primary-600/80 text-white'"
          >
            {{ talent.type }}
          </div>
        </div>
      </div>
      <div class="p-8">
        <div class="flex items-center gap-2 mb-3">
          <Verified class="w-4 h-4 text-primary-500" />
          <span class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{{ talent.role }}</span>
        </div>
        <h3 class="text-2xl font-black mb-3 text-slate-900 leading-tight">{{ talent.name }}</h3>
        <p class="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
          {{ talent.description }}
        </p>
        
        <div class="flex items-center justify-between pt-6 border-t border-slate-100">
          <a 
            :href="`https://wa.me/${talent.whatsapp}`"
            target="_blank"
            class="btn-premium bg-secondary-50 text-secondary-700 !px-4 !py-2.5 rounded-xl hover:bg-secondary-600 hover:text-white group/btn"
          >
            <MessageCircle class="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
            <span class="text-xs font-black uppercase tracking-widest">Contactar</span>
          </a>
          <button class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary-50 hover:text-primary-600 transition-all">
            <Share2 class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
