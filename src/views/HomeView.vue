<script setup>
import { RouterLink } from 'vue-router'
import { useCommunityStore } from '../stores/community'
import BoardCard from '../components/BoardCard.vue'
import TalentCard from '../components/TalentCard.vue'
import BusinessCard from '../components/BusinessCard.vue'
import EventCard from '../components/EventCard.vue'
import { ArrowRight, Users, Star, Briefcase, Calendar, Sparkles, ShieldCheck, Heart } from 'lucide-vue-next'

const store = useCommunityStore()

const quickAccess = [
  { name: 'Gestión', icon: Users, path: '#juntas', color: 'bg-primary-500', label: 'Juntas' },
  { name: 'Talento', icon: Star, path: '/talento', color: 'bg-indigo-500', label: 'Directorio' },
  { name: 'Economía', icon: Briefcase, path: '/negocios', color: 'bg-secondary-500', label: 'Negocios' },
  { name: 'Agenda', icon: Calendar, path: '/eventos', color: 'bg-orange-500', label: 'Calendario' },
]
</script>

<template>
  <div class="space-y-32 pb-32">
    <!-- Hero Section -->
    <section class="relative min-h-[90vh] flex items-center overflow-hidden pt-12">
      <!-- Background Elements -->
      <div class="absolute inset-0 z-0 overflow-hidden">
        <div class="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary-200/30 rounded-full blur-[120px] animate-pulse"></div>
        <div class="absolute bottom-[5%] right-[-5%] w-[50%] h-[50%] bg-secondary-200/30 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div class="absolute top-[20%] right-[10%] w-[15%] h-[15%] bg-accent-gold/10 rounded-full blur-[80px]"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div class="animate-fade-in-up">
            <div class="inline-flex items-center space-x-2 px-4 py-2 mb-8 bg-white/50 backdrop-blur-md border border-white/40 rounded-full shadow-sm">
              <Sparkles class="w-4 h-4 text-primary-600" />
              <span class="text-xs font-black tracking-widest text-primary-900 uppercase">Innovación Comunitaria</span>
            </div>
            
            <h1 class="text-7xl md:text-8xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tighter">
              El latido de <br/>
              <span class="text-gradient">Mocondino</span> <br/>
              en tus manos.
            </h1>
            
            <p class="text-xl text-slate-600 mb-12 leading-relaxed max-w-xl">
              Transformamos la convivencia a través de la transparencia y la conexión digital. Descubre, participa y fortalece nuestra comunidad.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-6">
              <RouterLink to="/participar" class="btn-premium-primary text-lg">
                Ser Voluntario <ArrowRight class="w-5 h-5" />
              </RouterLink>
              <a href="#juntas" class="btn-premium-secondary text-lg">
                Explorar Juntas
              </a>
            </div>

            <div class="mt-16 flex items-center space-x-8 text-slate-400">
               <div class="flex flex-col">
                  <span class="text-2xl font-black text-slate-900">{{ Object.keys(store.boards).length }}</span>
                  <span class="text-xs font-bold uppercase tracking-wider">Entidades</span>
               </div>
               <div class="h-10 w-px bg-slate-200"></div>
               <div class="flex flex-col">
                  <span class="text-2xl font-black text-slate-900">50+</span>
                  <span class="text-xs font-bold uppercase tracking-wider">Emprendedores</span>
               </div>
               <div class="h-10 w-px bg-slate-200"></div>
               <div class="flex flex-col">
                  <span class="text-2xl font-black text-slate-900">100%</span>
                  <span class="text-xs font-bold uppercase tracking-wider">Transparencia</span>
               </div>
            </div>
          </div>

          <div class="relative hidden lg:block animate-float">
            <!-- Decorative Elements -->
            <div class="absolute -top-10 -left-10 w-32 h-32 bg-secondary-100 rounded-3xl -rotate-12 z-0 opacity-50"></div>
            <div class="absolute -bottom-10 -right-10 w-48 h-48 bg-primary-100 rounded-full z-0 opacity-50"></div>
            
            <div class="glass-card p-4 relative z-10 overflow-hidden aspect-[4/5] border-white/60 shadow-2xl group">
               <div class="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent"></div>
               <img 
                 src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1470&auto=format&fit=crop" 
                 alt="Comunidad" 
                 class="w-full h-full object-cover rounded-[1.5rem]"
               >
               <div class="absolute bottom-8 left-8 right-8">
                  <div class="glass-card p-6 border-white/40 shadow-2xl transform group-hover:-translate-y-2 transition-transform duration-500">
                     <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center text-white">
                           <ShieldCheck class="w-6 h-6" />
                        </div>
                        <div>
                           <div class="text-sm font-black text-slate-900">Gestión Verificada</div>
                           <div class="text-xs text-slate-500">Actas al día: Enero 2026</div>
                        </div>
                     </div>
                     <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div class="w-3/4 h-full bg-primary-600 rounded-full"></div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Access (Modern Bento-ish) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <template v-for="item in quickAccess" :key="item.name">
          <RouterLink 
            :to="item.path.startsWith('#') ? { path: '/', hash: item.path } : item.path"
            class="glass-card p-8 group hover:-translate-y-2 transition-all duration-500 hover:bg-white"
          >
            <div :class="[item.color, 'w-16 h-16 rounded-2xl text-white mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500']">
              <component :is="item.icon" class="w-8 h-8" />
            </div>
            <div class="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{{ item.label }}</div>
            <div class="text-2xl font-black text-slate-900">{{ item.name }}</div>
          </RouterLink>
        </template>
      </div>
    </section>

    <!-- Boards Section -->
    <section id="juntas" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div class="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div class="max-w-2xl">
             <div class="flex items-center gap-3 text-primary-600 font-black mb-4 uppercase tracking-[0.3em] text-xs">
                <div class="w-12 h-px bg-primary-600"></div>
                Gestión Comunitaria
             </div>
             <h2 class="section-title">Nuestras <span class="text-gradient">Juntas</span> Locales</h2>
             <p class="text-xl text-slate-500 leading-relaxed">Transparencia absoluta en la administración de las juntas de acción comunal y acueducto.</p>
          </div>
       </div>
       <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <BoardCard v-for="(board, id) in Object.fromEntries(Object.entries(store.boards).filter(([_, b]) => b.type !== 'edil'))" :key="id" :board="board" />
       </div>
    </section>

    <!-- Ediles Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div class="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div class="max-w-2xl">
             <div class="flex items-center gap-3 text-secondary-600 font-black mb-4 uppercase tracking-[0.3em] text-xs">
                <div class="w-12 h-px bg-secondary-600"></div>
                Representación JAL
             </div>
             <h2 class="section-title">Nuestros <span class="text-gradient">Ediles</span></h2>
             <p class="text-xl text-slate-500 leading-relaxed">Nuestros representantes ante el municipio. Consulta su gestión y propuestas para el corregimiento.</p>
          </div>
       </div>
       <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <BoardCard v-for="(board, id) in Object.fromEntries(Object.entries(store.boards).filter(([_, b]) => b.type === 'edil'))" :key="id" :board="board" />
       </div>
    </section>

    <!-- Feature Bento Section -->
    <section class="bg-slate-900 py-32 overflow-hidden relative">
       <!-- Decoration -->
       <div class="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-[100px]"></div>
       <div class="absolute bottom-0 left-0 w-96 h-96 bg-secondary-600/10 rounded-full blur-[100px]"></div>

       <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div class="order-2 lg:order-1">
                <div class="grid grid-cols-2 gap-6">
                   <div class="space-y-6">
                      <div class="glass-card bg-white/5 border-white/10 p-8 hover:bg-white/10 transition-colors">
                         <Heart class="w-10 h-10 text-rose-500 mb-4" />
                         <h4 class="text-white font-black text-xl mb-2">Comunidad</h4>
                         <p class="text-slate-400 text-sm">Fortaleciendo el tejido social de nuestra vereda.</p>
                      </div>
                      <div class="glass-card bg-white/5 border-white/10 p-8 translate-x-4 hover:bg-white/10 transition-colors">
                         <ShieldCheck class="w-10 h-10 text-primary-400 mb-4" />
                         <h4 class="text-white font-black text-xl mb-2">Seguridad</h4>
                         <p class="text-slate-400 text-sm">Comunicación efectiva para una zona segura.</p>
                      </div>
                   </div>
                   <div class="space-y-6 pt-12">
                      <div class="glass-card bg-white/5 border-white/10 p-8 hover:bg-white/10 transition-colors">
                         <Star class="w-10 h-10 text-amber-400 mb-4" />
                         <h4 class="text-white font-black text-xl mb-2">Progreso</h4>
                         <p class="text-slate-400 text-sm">Impulsando el desarrollo sustentable local.</p>
                      </div>
                      <div class="glass-card bg-white/5 border-white/10 p-8 -translate-x-4 hover:bg-white/10 transition-colors">
                         <Briefcase class="w-10 h-10 text-secondary-400 mb-4" />
                         <h4 class="text-white font-black text-xl mb-2">Oportunidad</h4>
                         <p class="text-slate-400 text-sm">Visibilizando el talento y comercio local.</p>
                      </div>
                   </div>
                </div>
             </div>
             <div class="order-1 lg:order-2">
                <h2 class="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase leading-[1.1]">
                   Unidos somos <br/>
                   <span class="text-primary-500">imparables.</span>
                </h2>
                <p class="text-xl text-slate-400 mb-12 leading-relaxed">
                   Mocondino Conecta es más que una web, es la herramienta que nos permite actuar coordinadamente por el bienestar de todos los vecinos.
                </p>
                <div class="space-y-6">
                   <div class="flex items-center gap-4 text-white font-bold">
                      <div class="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center">
                         <ArrowRight class="w-3 h-3" />
                      </div>
                      Centralización de la información
                   </div>
                   <div class="flex items-center gap-4 text-white font-bold">
                      <div class="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center">
                         <ArrowRight class="w-3 h-3" />
                      </div>
                      Promoción del comercio veredal
                   </div>
                   <div class="flex items-center gap-4 text-white font-bold">
                      <div class="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center">
                         <ArrowRight class="w-3 h-3" />
                      </div>
                      Transparencia en la gestión pública
                   </div>
                </div>
                <button class="mt-12 btn-premium-primary">
                   Conocer el Proyecto
                </button>
             </div>
          </div>
       </div>
    </section>

    <!-- Events Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div class="flex items-center justify-between mb-16">
          <h2 class="section-title">Próxima <span class="text-gradient">Agenda</span></h2>
          <RouterLink to="/eventos" class="text-primary-600 font-black flex items-center gap-2 group">
             Ver Calendario <Calendar class="w-5 h-5 group-hover:scale-110 transition-transform" />
          </RouterLink>
       </div>
       <div class="space-y-8">
          <EventCard v-for="event in store.events" :key="event.id" :event="event" />
       </div>
    </section>

    <!-- Modern CTA -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div class="relative rounded-[3rem] overflow-hidden bg-slate-900 py-24 px-8 text-center group">
          <!-- Background Abstract -->
          <div class="absolute inset-0 bg-gradient-to-br from-primary-800/80 via-transparent to-secondary-800/80 z-0"></div>
          <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0"></div>
          
          <div class="relative z-10 max-w-3xl mx-auto">
             <h2 class="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase leading-tight">
                ¿Listo para transformar <br/> la vereda?
             </h2>
             <p class="text-xl text-primary-100/70 mb-12">
                Ya somos cientos de vecinos conectados. Tu participación es el motor de cambio que Mocondino necesita.
             </p>
             <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
                <RouterLink to="/participar" class="btn-premium-primary text-xl w-full sm:w-auto shadow-2xl shadow-primary-900">
                   ¡Me quiero unir!
                </RouterLink>
                <a href="mailto:contacto@mocondino.co" class="btn-premium bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 w-full sm:w-auto">
                   Contáctanos
                </a>
             </div>
          </div>
       </div>
    </section>
  </div>
</template>
