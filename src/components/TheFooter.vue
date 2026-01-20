<script setup>
import { RouterLink } from 'vue-router'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Heart, MapPinIcon, MessageCircle } from 'lucide-vue-next'
</script>

<template>
  <footer class="bg-slate-900 text-white relative overflow-hidden">
    <!-- Abstract Decoration -->
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-coral"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-primary-600/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
        
        <!-- Brand Column -->
        <div class="lg:col-span-4 space-y-8">
          <RouterLink to="/" class="flex items-center space-x-4 group">
            <div class="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
               <MapPinIcon class="w-7 h-7 text-white" />
            </div>
            <div class="flex flex-col text-left">
              <span class="text-2xl font-black leading-none tracking-tighter">MOCONDINO</span>
              <span class="text-xs font-black tracking-[0.4em] text-primary-500 uppercase">Conecta</span>
            </div>
          </RouterLink>
          
          <p class="text-slate-400 text-lg leading-relaxed font-medium">
            La plataforma oficial de nuestra vereda. Uniendo voluntades, transparentando la gestión y celebrando nuestro talento local.
          </p>

          <div class="flex gap-4">
            <a v-for="icon in [Facebook, Instagram, MessageCircle, Twitter]" :key="icon" href="#" class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-600 hover:border-primary-500 transition-all group">
              <component :is="icon" class="w-5 h-5 text-slate-400 group-hover:text-white" />
            </a>
          </div>
        </div>

        <!-- Navigation Columns -->
        <div class="lg:col-span-2">
          <h3 class="text-xs font-black text-primary-500 uppercase tracking-[0.3em] mb-10">Comunidad</h3>
          <ul class="space-y-4">
            <li v-for="link in [
              {name: 'Acueducto', path: '/juntas/acueducto'},
              {name: 'Acción Comunal', path: '/juntas/comunal'},
              {name: 'Cementerio', path: '/juntas/cementerio'},
              {name: 'Edil Principal', path: '/juntas/edil_uno'},
              {name: 'Edil Secundario', path: '/juntas/edil_dos'}
            ]" :key="link.name">
              <RouterLink :to="link.path" class="text-slate-400 hover:text-white transition-colors font-bold uppercase text-[11px] tracking-widest">
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-2">
          <h3 class="text-xs font-black text-primary-500 uppercase tracking-[0.3em] mb-10">Descubre</h3>
          <ul class="space-y-4">
            <li v-for="link in [
              {name: 'Talento Local', path: '/talento'},
              {name: 'Negocios', path: '/negocios'},
              {name: 'Eventos', path: '/eventos'},
              {name: 'Participar', path: '/participar'}
            ]" :key="link.name">
              <RouterLink :to="link.path" class="text-slate-400 hover:text-white transition-colors font-bold uppercase text-[11px] tracking-widest">
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contact Column -->
        <div class="lg:col-span-4">
          <h3 class="text-xs font-black text-primary-500 uppercase tracking-[0.3em] mb-10">Oficina Principal</h3>
          <div class="space-y-8">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <MapPin class="w-5 h-5 text-secondary-500" />
              </div>
              <p class="text-slate-400 text-sm font-bold leading-relaxed">
                Salón Comunal Mocondino <br/>
                Corregimiento de Mocondino, Pasto, Nariño
              </p>
            </div>
            
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <MessageCircle class="w-5 h-5 text-green-500" />
              </div>
              <a href="https://wa.me/573123456789" target="_blank" class="text-slate-400 text-sm font-bold hover:text-white transition-colors">+57 312 345 6789</a>
            </div>

            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <Mail class="w-5 h-5 text-accent-coral" />
              </div>
              <a href="mailto:hola@mocondino.com" class="text-slate-400 text-sm font-bold hover:text-white transition-colors">hola@mocondino.com</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div class="flex items-center gap-2 text-slate-500 text-xs font-black uppercase tracking-widest">
           HECHO CON <Heart class="w-4 h-4 text-accent-coral animate-pulse" /> PARA LA VEREDA
        </div>
        
        <div class="flex items-center gap-12">
          <p class="text-[10px] font-black text-slate-600 uppercase tracking-widest leading-none">
            &copy; 2026 Mocondino Conecta. <br class="md:hidden"/> Todos los derechos reservados.
          </p>
          <div class="flex gap-6">
            <a href="#" class="text-[10px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Privacidad</a>
            <a href="#" class="text-[10px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Transparencia</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
