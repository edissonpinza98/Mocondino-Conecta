<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCommunityStore } from '../stores/community'
import { ShieldCheck, User, Lock, ArrowRight, MapPin } from 'lucide-vue-next'

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
  <div class="min-h-[85vh] flex items-center justify-center py-20 px-4">
    <div class="max-w-md w-full animate-fade-in-up">
      <div class="text-center mb-12">
        <div class="w-20 h-20 bg-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary-500/20 rotate-12">
           <ShieldCheck class="w-10 h-10 text-white" />
        </div>
        <h1 class="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Acceso Directivo</h1>
        <p class="text-slate-500 font-medium leading-relaxed">
          Ingresa para gestionar el contenido oficial de tu junta comunal.
        </p>
      </div>

      <div class="glass-card p-10 border-white/60 shadow-2xl relative overflow-hidden">
        <div class="absolute -top-12 -right-12 w-32 h-32 bg-primary-50 rounded-full blur-3xl"></div>
        
        <form @submit.prevent="handleLogin" class="space-y-8 relative z-10">
          <div class="space-y-3">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Seleccionar Junta</label>
            <div class="relative group">
              <MapPin class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
              <select 
                v-model="boardId"
                required
                class="w-full pl-14 pr-6 py-5 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all font-bold text-slate-900 appearance-none"
              >
                <option value="" disabled>Selecciona tu junta...</option>
                <option v-for="b in boards" :key="b.id" :value="b.id">{{ b.name }}</option>
              </select>
            </div>
          </div>

          <div class="space-y-3">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Código de Acceso</label>
            <div class="relative group">
              <Lock class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
              <input 
                v-model="password"
                type="password" 
                required
                placeholder="••••"
                class="w-full pl-14 pr-6 py-5 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all font-bold placeholder-slate-300 text-slate-900"
              >
            </div>
          </div>

          <div v-if="error" class="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-xs font-bold text-center border border-red-100 animate-pulse">
            {{ error }}
          </div>

          <button type="submit" class="w-full btn-premium-primary !py-5 text-lg uppercase tracking-widest group/btn shadow-xl shadow-primary-500/20">
            Iniciar Sesión
            <ArrowRight class="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
          </button>
        </form>
      </div>

      <p class="text-center mt-8 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
        El acceso está restringido a directivos y representantes <br/> registrados en la base de datos oficial.
      </p>
    </div>
  </div>
</template>
