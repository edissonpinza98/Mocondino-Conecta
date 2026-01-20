<script setup>
import { useCommunityStore } from '../stores/community'
import EventCard from '../components/EventCard.vue'
import { Calendar, Info, Sparkles, Filter, ChevronRight } from 'lucide-vue-next'

const store = useCommunityStore()
</script>

<template>
  <div class="min-h-screen pb-32">
    <!-- Cinematic Header -->
    <header class="relative pt-32 pb-24 overflow-hidden">
      <!-- Background Patterns -->
      <div class="absolute inset-0 z-0">
        <div class="absolute top-0 left-0 w-full h-full bg-slate-50"></div>
        <div class="absolute top-[-20%] left-[-10%] w-[50%] h-[80%] bg-primary-100/40 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-[-20%] right-[-10%] w-[50%] h-[80%] bg-secondary-100/30 rounded-full blur-[120px]"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full mb-8 border border-white shadow-sm">
           <Calendar class="w-4 h-4 text-primary-600" />
           <span class="text-[10px] font-black text-primary-700 uppercase tracking-[0.3em]">Agenda Mocondino</span>
        </div>
        
        <h1 class="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter uppercase leading-[0.9]">
           Eventos & <br/>
           <span class="text-gradient">Encuentros</span>
        </h1>
        <p class="text-xl text-slate-500 max-w-2xl mx-auto mb-0 leading-relaxed font-medium">
           No te pierdas nada. Desde bazares comunitarios hasta reuniones técnicas, aquí está el pulso de nuestra vereda.
        </p>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <!-- Premium Sidebar -->
        <div class="lg:col-span-3 space-y-8 sticky top-32">
          <div class="glass-card p-10 border-white/60 shadow-xl overflow-hidden relative">
            <div class="absolute top-0 right-0 p-4 opacity-5">
               <Filter class="w-16 h-16" />
            </div>
            <h3 class="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
              Calendario 2026
            </h3>
            <div class="space-y-4">
              <button 
                 v-for="(month, idx) in ['Enero', 'Febrero', 'Marzo']" 
                 :key="month" 
                 class="w-full flex items-center justify-between px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all group"
                 :class="idx === 0 ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'text-slate-500 hover:bg-slate-50'"
              >
                {{ month }}
                <ChevronRight class="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>

          <div class="glass-card p-10 bg-slate-900 border-0 shadow-2xl relative overflow-hidden">
             <div class="absolute top-0 right-0 w-24 h-24 bg-secondary-600/20 blur-3xl rounded-full"></div>
             <div class="flex items-center gap-3 text-secondary-400 mb-6 font-black text-[10px] uppercase tracking-widest">
                <Info class="w-4 h-4" />
                Dato Clave
             </div>
             <p class="text-sm text-slate-400 leading-relaxed font-medium relative z-10">
               ¿Sabías que puedes proponer tus propios eventos? Regístrate y contacta a la Junta Comunal.
             </p>
          </div>
        </div>

        <!-- Events Feed -->
        <div class="lg:col-span-9 space-y-12">
          <div class="space-y-12">
             <div class="flex items-center gap-6">
                <div class="h-px bg-slate-200 flex-grow"></div>
                <span class="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Próximos Días</span>
                <div class="h-px bg-slate-200 flex-grow"></div>
             </div>
             
             <transition-group name="page" tag="div" class="space-y-8">
                <EventCard v-for="event in store.events" :key="event.id" :event="event" />
             </transition-group>
          </div>

          <div class="text-center pt-16">
             <button class="btn-premium-secondary !px-12">
                Explorar Eventos Pasados
             </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
