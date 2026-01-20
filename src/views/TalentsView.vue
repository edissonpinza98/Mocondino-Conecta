<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCommunityStore } from '../stores/community'
import TalentCard from '../components/TalentCard.vue'
import { Star, Search, Filter, Sparkles } from 'lucide-vue-next'

const store = useCommunityStore()
const filter = ref('')
const typeFilter = ref('todos')

const filteredTalents = computed(() => {
  return store.talents.filter(talent => {
    const matchesSearch = talent.name.toLowerCase().includes(filter.value.toLowerCase()) || 
                          talent.role.toLowerCase().includes(filter.value.toLowerCase())
    const matchesType = typeFilter.value === 'todos' || talent.type === typeFilter.value
    return matchesSearch && matchesType
  })
})
</script>

<template>
  <div class="min-h-screen pb-32">
    <!-- Header -->
    <header class="relative pt-32 pb-24 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <div class="absolute top-0 left-0 w-full h-full bg-slate-50"></div>
        <div class="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-100/40 rounded-full blur-[100px]"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full mb-8 border border-purple-100 shadow-sm">
           <Sparkles class="w-4 h-4 text-purple-600" />
           <span class="text-[10px] font-black text-purple-700 uppercase tracking-widest">Nuestra Gente, Nuestro Orgullo</span>
        </div>
        
        <h1 class="section-title mb-6">Talento de <span class="text-gradient">Mocondino</span></h1>
        <p class="text-xl text-slate-600 max-w-2xl mx-auto mb-16 leading-relaxed">
          Desde artistas hasta especialistas técnicos, descubre la riqueza profesional de nuestra vereda.
        </p>

        <!-- Search & Filters Bento -->
        <div class="max-w-4xl mx-auto">
          <div class="glass-card p-6 flex flex-col md:flex-row gap-6 border-white/60 shadow-xl">
            <div class="flex-grow relative">
              <Search class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                v-model="filter"
                type="text" 
                placeholder="Busca por nombre, habilidad o profesión..."
                class="w-full pl-14 pr-6 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all font-bold placeholder-slate-400 text-slate-900"
              >
            </div>
            <div class="flex gap-3">
              <button 
                v-for="type in [{id: 'todos', label: 'Todos'}, {id: 'artista', label: 'Artistas'}, {id: 'profesional', label: 'Profesionales'}]"
                :key="type.id"
                @click="typeFilter = type.id"
                :class="[
                  'px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-sm',
                  typeFilter === type.id 
                    ? (type.id === 'artista' ? 'bg-purple-600 text-white shadow-purple-200' : 'bg-primary-600 text-white shadow-primary-200')
                    : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
                ]"
              >
                {{ type.label }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <transition-group 
        name="page" 
        tag="div" 
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        v-if="filteredTalents.length > 0"
      >
        <TalentCard v-for="talent in filteredTalents" :key="talent.id" :talent="talent" />
      </transition-group>
      
      <div v-else class="text-center py-32 animate-fade-in-up">
        <div class="w-24 h-24 bg-slate-100 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
           <Search class="w-10 h-10 text-slate-300" />
        </div>
        <h3 class="text-2xl font-black text-slate-900 mb-2 tracking-tight uppercase">Sin resultados exactos</h3>
        <p class="text-slate-500 mb-10 font-medium">Revisa la ortografía o intenta con términos más generales.</p>
        <button @click="filter = ''; typeFilter = 'todos'" class="btn-premium-secondary">
           Restablecer Filtros
        </button>
      </div>
    </div>

    <!-- Registration Link -->
    <section class="max-w-4xl mx-auto px-4 mt-20 text-center">
       <div class="glass-card p-16 border-dashed border-2 border-primary-200 relative overflow-hidden group">
          <div class="absolute -top-12 -right-12 w-48 h-48 bg-primary-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          
          <div class="relative z-10">
             <div class="w-20 h-20 bg-primary-100 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-12 group-hover:rotate-0 transition-transform">
                <Star class="w-10 h-10 text-primary-600" />
             </div>
             <h2 class="text-4xl font-black mb-6 tracking-tight uppercase">¿Quieres aparecer aquí?</h2>
             <p class="text-xl text-slate-500 mb-12 max-w-xl mx-auto leading-relaxed">
                Únete de forma gratuita a nuestro directorio y permite que los vecinos encuentren tus servicios fácilmente.
             </p>
             <RouterLink to="/participar" class="btn-premium-primary text-lg px-12">
                Registrar Perfil Gratis
             </RouterLink>
          </div>
       </div>
    </section>
  </div>
</template>
