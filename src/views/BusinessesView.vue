<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCommunityStore } from '../stores/community'
import BusinessCard from '../components/BusinessCard.vue'
import { Briefcase, Search, Map, Store, ChevronRight } from 'lucide-vue-next'

const store = useCommunityStore()
const searchQuery = ref('')

const filteredBusinesses = computed(() => {
  return store.businesses.filter(b => 
    b.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    b.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<template>
  <div class="min-h-screen pb-32">
    <!-- Immersive Header -->
    <header class="relative pt-40 pb-32 overflow-hidden bg-slate-900 border-b border-white/5 shadow-2xl">
      <!-- Dynamic Background -->
      <div class="absolute inset-0 z-0">
        <img 
           src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1374&auto=format&fit=crop" 
           class="w-full h-full object-cover opacity-20 scale-110 blur-sm"
           alt="Mercado"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        <div class="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,rgba(52,199,125,0.15)_0%,transparent_50%)]"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-3xl">
          <div class="flex items-center gap-3 mb-8 text-secondary-400 font-black uppercase tracking-[0.4em] text-xs">
             <Store class="w-5 h-5" />
             Economía Circular
          </div>
          <h1 class="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9]">
             Comercio <br/>
             <span class="text-gradient from-secondary-400 to-secondary-600">Veredal</span>
          </h1>
          <p class="text-xl text-slate-400 mb-12 leading-relaxed font-medium">
             Desde la huerta hasta tu mesa. Apoya a los emprendedores locales y fortalece nuestra independencia económica.
          </p>
          
          <div class="relative group max-w-2xl">
            <div class="absolute -inset-1 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-3xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div class="relative">
              <Search class="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="¿Buscas pan, servicios o viveros?..."
                class="w-full pl-16 pr-8 py-6 bg-slate-800/80 backdrop-blur-2xl border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:bg-white focus:text-slate-900 transition-all outline-none text-xl font-bold"
              >
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
      <div class="flex items-center justify-between mb-16">
         <h2 class="text-3xl font-black text-slate-900 uppercase tracking-tighter">Negocios Registrados</h2>
         <div class="text-sm font-bold text-slate-400 bg-slate-100 px-4 py-2 rounded-full">
            {{ filteredBusinesses.length }} Establecimientos
         </div>
      </div>

      <transition-group 
        name="page" 
        tag="div" 
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        v-if="filteredBusinesses.length > 0"
      >
        <BusinessCard v-for="business in filteredBusinesses" :key="business.id" :business="business" />
      </transition-group>

      <div v-else class="text-center py-32 animate-fade-in-up">
        <div class="relative inline-block mb-10">
           <div class="absolute inset-0 bg-secondary-100 rounded-full scale-150 blur-3xl opacity-50"></div>
           <div class="relative w-32 h-32 bg-white rounded-[3rem] flex items-center justify-center shadow-2xl border border-slate-100">
              <Briefcase class="w-12 h-12 text-slate-300" />
           </div>
        </div>
        <h3 class="text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase">No hay coincidencias</h3>
        <p class="text-xl text-slate-500 mb-12 font-medium">Intenta con palabras clave más simples como "comida" o "ferretería".</p>
        <button @click="searchQuery = ''" class="btn-premium-secondary">
           Borrar Búsqueda
        </button>
      </div>

      <!-- Super Enhanced CTA -->
      <section class="mt-40 relative group">
         <div class="absolute -inset-1 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-coral rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
         <div class="relative glass-card p-12 md:p-20 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 border-white/60">
            <div class="absolute top-0 right-0 p-10 opacity-5">
               <Map class="w-64 h-64" />
            </div>
            
            <div class="text-center md:text-left relative z-10 max-w-2xl">
               <div class="inline-flex items-center gap-2 px-4 py-2 bg-secondary-50 text-secondary-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-secondary-100">
                  <Star class="w-4 h-4" />
                  Vitrina Digital Gratuita
               </div>
               <h2 class="text-5xl font-black text-slate-900 mb-6 tracking-tighter uppercase leading-[1.1]">¿Eres propietario de un negocio?</h2>
               <p class="text-xl text-slate-500 leading-relaxed font-medium mb-0">
                  No pierdas la oportunidad de ser visible para todos los vecinos. El registro toma menos de 2 minutos.
               </p>
            </div>
            
            <RouterLink to="/participar" class="btn-premium-primary !px-12 !py-6 text-xl shadow-2xl shadow-primary-900 relative z-10 group/btn shrink-0">
               Registrar mi Negocio
               <ChevronRight class="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
            </RouterLink>
         </div>
      </section>
    </div>
  </div>
</template>
