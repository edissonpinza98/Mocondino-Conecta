<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCommunityStore } from '../stores/community'
import { Shield, Fingerprint, Lock, ArrowRight, MapPin, Sparkles, ChevronLeft } from 'lucide-vue-next'

const store = useCommunityStore()
const router = useRouter()

const boardId = ref('')
const password = ref('')
const error = ref('')

const boards = [
  { id: 'acueducto', name: 'Junta del Acueducto' },
  { id: 'comunal', name: 'Acción Comunal' },
  { id: 'cementerio', name: 'Junta del Cementerio' },
  { id: 'edil_uno', name: 'Edil Principal (Curul 1)' },
  { id: 'edil_dos', name: 'Edil Secundario (Curul 2)' }
]

const handleLogin = () => {
  if (boardId.value && password.value === '1234') { // Mock password
    store.login('Presidente', boardId.value)
    router.push({ name: 'board-detail', params: { id: boardId.value } })
  } else {
    error.value = 'Credenciales inválidas para la junta seleccionada.'
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden bg-slate-50">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <div class="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-200/20 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary-200/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
    </div>

    <div class="max-w-xl w-full relative z-10">
      <!-- Back Button -->
      <RouterLink 
        to="/" 
        class="inline-flex items-center gap-2 text-xs font-black text-slate-400 hover:text-primary-600 uppercase tracking-widest mb-12 transition-all group"
      >
        <ChevronLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Volver al Portal
      </RouterLink>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Brand Info -->
        <div class="lg:col-span-12 text-center mb-8 animate-fade-in-up">
           <div class="relative inline-block mb-10 group">
              <div class="absolute inset-0 bg-primary-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
              <div class="icon-container-dark !w-24 !h-24 !rounded-[2rem] mx-auto animate-float relative z-10 border border-white/10 shadow-2xl">
                 <Shield class="w-10 h-10 text-white animate-pulse-glow" />
                 <!-- Decorative Ring -->
                 <div class="absolute -inset-2 border border-primary-500/20 rounded-[2.5rem] animate-rotate-slow"></div>
              </div>
           </div>
           
           <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm mb-6">
              <Fingerprint class="w-3.5 h-3.5 text-primary-600" />
              <span class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Acceso Seguro Verificado</span>
           </div>
           
           <h1 class="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter uppercase leading-none">
              Portal de <span class="text-gradient">Gestión</span>
           </h1>
           <p class="text-lg text-slate-500 font-bold leading-relaxed max-w-md mx-auto">
             Inicie sesión para administrar la información oficial y los recursos de su comunidad.
           </p>
        </div>

        <!-- Login Form Card -->
        <div class="lg:col-span-12 animate-fade-in-up delay-200">
          <div class="glass-card p-4 sm:p-2 bg-white/40 shadow-2xl border-white/60">
            <div class="bg-white/90 backdrop-blur-3xl rounded-[1.8rem] p-10 border border-white shadow-inner">
              <form @submit.prevent="handleLogin" class="space-y-8">
                <div class="space-y-4">
                  <label class="flex items-center gap-2 text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] ml-2">
                    <MapPin class="w-3.5 h-3.5 text-primary-600" />
                    Seleccionar Entidad
                  </label>
                  <div class="relative group">
                    <select 
                      v-model="boardId"
                      required
                      class="w-full px-6 py-5 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-primary-500 focus:ring-0 transition-all font-bold text-slate-900 appearance-none shadow-sm text-sm"
                    >
                      <option value="" disabled>Seleccione una junta o edil...</option>
                      <option v-for="b in boards" :key="b.id" :value="b.id">{{ b.name }}</option>
                    </select>
                    <div class="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                      <ChevronDown class="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div class="space-y-4">
                  <label class="flex items-center gap-2 text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] ml-2">
                    <Lock class="w-3.5 h-3.5 text-primary-600" />
                    Código de Autorización
                  </label>
                  <div class="relative group">
                    <input 
                      v-model="password"
                      type="password" 
                      required
                      placeholder="Ingrese su clave de 4 dígitos"
                      class="w-full px-6 py-5 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-primary-500 focus:ring-0 transition-all font-bold text-slate-900 placeholder-slate-300 shadow-sm text-sm"
                    >
                  </div>
                </div>

                <div v-if="error" class="bg-red-50 text-red-600 px-6 py-4 rounded-2xl text-xs font-black text-center border border-red-100 animate-pulse border-dashed">
                  {{ error }}
                </div>

                <button type="submit" class="w-full btn-premium-primary !py-5 text-sm uppercase tracking-[0.2em] group/btn shadow-2xl shadow-primary-500/30">
                  <Sparkles class="w-4 h-4" />
                  ENTRAR AL PANEL
                  <ArrowRight class="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Info -->
      <div class="mt-16 pt-8 border-t border-slate-200 flex flex-col items-center gap-4">
        <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-center leading-loose">
          Acceso estrictamente monitoreado <br/>
          &copy; 2026 Mocondino Conecta • Seguridad Criptográfica
        </p>
      </div>
    </div>
  </div>
</template>
