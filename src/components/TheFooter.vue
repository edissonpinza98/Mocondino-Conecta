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
            <div class="icon-container-primary !w-14 !h-14 group-hover:rotate-[360deg] transition-transform duration-1000 relative overflow-hidden">
               <MapPinIcon class="w-8 h-8 text-white relative z-10 animate-premium-float" stroke-width="2.5" />
               <div class="absolute inset-0 bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-700 rounded-full"></div>
               <div class="absolute -top-1/2 -left-1/2 w-full h-full bg-white/10 rotate-45"></div>
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
            <!-- Facebook -->
            <a href="#" class="icon-container-glass !w-14 !h-14 !bg-blue-500/10 border-blue-500/20 hover:!bg-blue-500 hover:border-blue-500 hover:scale-110 hover:-rotate-6 transition-all duration-500 group/social relative">
              <div class="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover/social:opacity-100 transition-opacity"></div>
              <Facebook class="w-6 h-6 text-blue-400 group-hover/social:text-white animate-premium-float relative z-10" stroke-width="2.5" />
            </a>
            
            <!-- Instagram -->
            <a href="#" class="icon-container-glass !w-14 !h-14 !bg-pink-500/10 border-pink-500/20 hover:!bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:border-pink-500 hover:scale-110 hover:-rotate-6 transition-all duration-500 group/social relative">
              <div class="absolute inset-0 bg-pink-500/20 blur-xl opacity-0 group-hover/social:opacity-100 transition-opacity"></div>
              <Instagram class="w-6 h-6 text-pink-400 group-hover/social:text-white animate-premium-float relative z-10" stroke-width="2.5" />
            </a>
            
            <!-- WhatsApp -->
            <a href="#" class="icon-container-glass !w-14 !h-14 !bg-green-500/10 border-green-500/20 hover:!bg-green-500 hover:border-green-500 hover:scale-110 hover:-rotate-6 transition-all duration-500 group/social relative">
              <div class="absolute inset-0 bg-green-500/20 blur-xl opacity-0 group-hover/social:opacity-100 transition-opacity"></div>
              <div class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ripple opacity-0 group-hover/social:opacity-100"></div>
              <MessageCircle class="w-6 h-6 text-green-400 group-hover/social:text-white animate-premium-float relative z-10" stroke-width="2.5" />
            </a>
            
            <!-- Twitter -->
            <a href="#" class="icon-container-glass !w-14 !h-14 !bg-sky-500/10 border-sky-500/20 hover:!bg-sky-500 hover:border-sky-500 hover:scale-110 hover:-rotate-6 transition-all duration-500 group/social relative">
              <div class="absolute inset-0 bg-sky-500/20 blur-xl opacity-0 group-hover/social:opacity-100 transition-opacity"></div>
              <Twitter class="w-6 h-6 text-sky-400 group-hover/social:text-white animate-premium-float relative z-10" stroke-width="2.5" />
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
            <div class="flex items-start gap-4 group/contact">
              <div class="icon-container-glass !w-12 !h-12 !bg-secondary-500/10 border-secondary-500/20 flex items-center justify-center shrink-0 group-hover/contact:scale-110 group-hover/contact:rotate-6 transition-all duration-500 relative">
                <MapPin class="w-6 h-6 text-secondary-400 relative z-10 animate-premium-float" stroke-width="2.5" />
                <div class="absolute inset-0 bg-secondary-500/20 blur-xl opacity-0 group-hover/contact:opacity-100 transition-opacity"></div>
              </div>
              <p class="text-slate-400 text-sm font-bold leading-relaxed group-hover/contact:text-slate-300 transition-colors">
                Salón Comunal Mocondino <br/>
                Corregimiento de Mocondino, Pasto, Nariño
              </p>
            </div>
            
            <div class="flex items-center gap-4 group/contact">
              <div class="icon-container-glass !w-12 !h-12 !bg-green-500/10 border-green-500/20 flex items-center justify-center shrink-0 group-hover/contact:scale-110 group-hover/contact:-rotate-6 transition-all duration-500 relative">
                <MessageCircle class="w-6 h-6 text-green-400 relative z-10 animate-pulse" stroke-width="2.5" />
                <div class="absolute inset-0 bg-green-500/20 blur-xl opacity-0 group-hover/contact:opacity-100 transition-opacity"></div>
                <div class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ripple"></div>
              </div>
              <a href="https://wa.me/573123456789" target="_blank" class="text-slate-400 text-sm font-bold hover:text-white transition-colors">+57 312 345 6789</a>
            </div>

            <div class="flex items-center gap-4 group/contact">
              <div class="icon-container-glass !w-12 !h-12 !bg-accent-coral/10 border-accent-coral/20 flex items-center justify-center shrink-0 group-hover/contact:scale-110 group-hover/contact:rotate-6 transition-all duration-500 relative">
                <Mail class="w-6 h-6 text-accent-coral relative z-10 animate-premium-float" stroke-width="2.5" />
                <div class="absolute inset-0 bg-accent-coral/20 blur-xl opacity-0 group-hover/contact:opacity-100 transition-opacity"></div>
              </div>
              <a href="mailto:hola@mocondino.com" class="text-slate-400 text-sm font-bold hover:text-white transition-colors">hola@mocondino.com</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div class="flex items-center gap-3 text-slate-500 text-xs font-black uppercase tracking-widest">
           <span>HECHO CON</span>
           <div class="relative inline-flex items-center justify-center">
             <div class="w-8 h-8 rounded-xl bg-accent-coral/10 border border-accent-coral/20 flex items-center justify-center group hover:bg-accent-coral/20 transition-all">
               <Heart class="w-4 h-4 text-accent-coral animate-pulse fill-accent-coral/50" stroke-width="2.5" />
               <div class="absolute inset-0 bg-accent-coral/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
             </div>
           </div>
           <span>PARA LA VEREDA</span>
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
