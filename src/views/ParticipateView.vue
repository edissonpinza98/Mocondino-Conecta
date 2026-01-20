<script setup>
import { ref } from 'vue'
import { 
  Heart, Users, Handshake, Mail, User, MessageSquare, 
  ChevronRight, CheckCircle, Send, Sparkles, ArrowRight
} from 'lucide-vue-next'

const formType = ref('voluntariado')
const isSubmitted = ref(false)
const formData = ref({
  name: '',
  email: '',
  message: '',
  interest: 'voluntariado'
})

const submitForm = () => {
  // Mock submission
  console.log('Form data:', formData.value)
  isSubmitted.value = true
}

const types = [
  { 
    id: 'voluntariado', 
    name: 'Voluntariado', 
    icon: Users, 
    color: 'from-blue-500 to-primary-600',
    description: 'Aporta tu tiempo y habilidades en nuestras jornadas de limpieza, mantenimiento o educación.'
  },
  { 
    id: 'donaciones', 
    name: 'Donaciones', 
    icon: Heart, 
    color: 'from-accent-coral to-red-600',
    description: 'Apoya financieramente proyectos específicos como la mejora del acueducto o eventos culturales.'
  },
  { 
    id: 'alianzas', 
    name: 'Alianzas', 
    icon: Handshake, 
    color: 'from-secondary-500 to-secondary-700',
    description: 'Si tienes una empresa u organización, trabajemos juntos por el desarrollo de la vereda.'
  }
]
</script>

<template>
  <div class="min-h-screen pb-32">
    <!-- Premium Header -->
    <header class="relative pt-32 pb-24 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <div class="absolute top-0 left-0 w-full h-full bg-slate-50"></div>
        <div class="absolute top-[-10%] right-[-10%] w-[50%] h-[80%] bg-primary-100/40 rounded-full blur-[120px]"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-3xl animate-fade-in-up">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full mb-8 border border-primary-100 shadow-sm">
             <Sparkles class="w-4 h-4 text-primary-600" />
             <span class="text-[10px] font-black text-primary-700 uppercase tracking-[0.3em]">Impacto Social</span>
          </div>
          <h1 class="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter uppercase leading-[0.9]">
             Hagamos <br/>
             <span class="text-gradient">Historia</span> Juntos.
          </h1>
          <p class="text-xl text-slate-500 max-w-xl leading-relaxed font-medium">
             Tu contribución, sin importar el tamaño, es el motor que impulsa el bienestar de nuestra vereda. Elige un camino para empezar.
          </p>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        <!-- Selection Sidebar -->
        <div class="lg:col-span-5 space-y-6 animate-fade-in-up delay-200">
          <div 
            v-for="type in types" 
            :key="type.id"
            @click="formType = type.id; formData.interest = type.id"
            :class="[
              'glass-card p-8 border-2 transition-all cursor-pointer group relative overflow-hidden',
              formType === type.id ? 'border-primary-500 bg-white scale-[1.02] shadow-2xl shadow-primary-500/10' : 'border-white/60 hover:border-slate-200'
            ]"
          >
            <!-- Background Accent -->
            <div 
               v-if="formType === type.id"
               class="absolute -right-12 -top-12 w-32 h-32 bg-primary-50 rounded-full blur-3xl opacity-50"
            ></div>
            
            <div class="flex items-start gap-8 relative z-10">
              <div 
                :class="[
                  'w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 shadow-lg',
                  formType === type.id ? 'bg-slate-900 text-white rotate-0' : 'bg-slate-50 text-slate-400 rotate-6 group-hover:rotate-0 group-hover:bg-slate-100'
                ]"
              >
                <component :is="type.icon" class="w-8 h-8" />
              </div>
              <div>
                <h3 class="text-2xl font-black mb-3 tracking-tight uppercase group-hover:text-primary-600 transition-colors">{{ type.name }}</h3>
                <p class="text-slate-500 leading-relaxed text-sm font-medium">
                  {{ type.description }}
                </p>
              </div>
              <div class="ml-auto shrink-0 md:pt-4">
                 <div 
                    :class="[
                       'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                       formType === type.id ? 'bg-primary-600 border-primary-600' : 'border-slate-200 group-hover:border-primary-300'
                    ]"
                 >
                    <div class="w-2 h-2 bg-white rounded-full" v-if="formType === type.id"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Container -->
        <div class="lg:col-span-7 animate-fade-in-up delay-400">
          <div class="glass-card p-12 border-white/60 shadow-2xl relative overflow-hidden">
            <transition name="page" mode="out-in">
              <div v-if="!isSubmitted" :key="formType">
                 <div class="flex items-center justify-between mb-12">
                   <h2 class="text-3xl font-black flex items-center gap-4 tracking-tighter uppercase">
                      <div class="w-12 h-12 rounded-2xl bg-secondary-100 flex items-center justify-center text-secondary-600">
                         <Send class="w-6 h-6" />
                      </div>
                      Tu Propuesta
                   </h2>
                   <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                      Modo: {{ formType }}
                   </div>
                 </div>

                 <form @submit.prevent="submitForm" class="space-y-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div class="space-y-3">
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Nombre Completo</label>
                        <div class="relative group">
                          <User class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                          <input 
                            v-model="formData.name"
                            type="text" 
                            required
                            placeholder="Ej. María Josefa"
                            class="w-full pl-14 pr-6 py-5 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all font-bold placeholder-slate-300 text-slate-900"
                          >
                        </div>
                      </div>
                      <div class="space-y-3">
                        <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Correo Electrónico</label>
                        <div class="relative group">
                          <Mail class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                          <input 
                            v-model="formData.email"
                            type="email" 
                            required
                            placeholder="tu@email.com"
                            class="w-full pl-14 pr-6 py-5 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all font-bold placeholder-slate-300 text-slate-900"
                          >
                        </div>
                      </div>
                    </div>

                    <div class="space-y-3">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Mensaje o Detalle Técnico</label>
                      <div class="relative group">
                        <MessageSquare class="absolute left-5 top-6 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                        <textarea 
                          v-model="formData.message"
                          required
                          rows="5"
                          placeholder="Cuéntanos un poco más sobre cómo te gustaría participar..."
                          class="w-full pl-14 pr-6 py-6 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all font-bold placeholder-slate-300 text-slate-900 resize-none"
                        ></textarea>
                      </div>
                    </div>

                    <button type="submit" class="w-full btn-premium-primary !py-6 text-xl shadow-2xl shadow-primary-500/20 uppercase tracking-widest group/btn">
                      Enviar Propuesta
                      <ArrowRight class="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                    
                    <div class="flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <CheckCircle class="w-4 h-4 text-green-500" />
                       Datos protegidos bajo ley de transparencia veredal
                    </div>
                 </form>
              </div>
              <div v-else :key="'success'" class="py-24 text-center">
                 <div class="relative inline-block mb-12">
                   <div class="absolute inset-0 bg-secondary-100 rounded-full scale-150 blur-3xl opacity-50"></div>
                   <div class="relative w-32 h-32 bg-white rounded-[3rem] flex items-center justify-center shadow-2xl border border-slate-50 text-secondary-600">
                      <CheckCircle class="w-16 h-16 animate-bounce" />
                   </div>
                 </div>
                 <h2 class="text-5xl font-black text-slate-900 mb-6 tracking-tighter uppercase leading-[0.9]">
                    Mensaje <br/>
                    Recibido.
                 </h2>
                 <p class="text-xl text-slate-500 max-w-sm mx-auto mb-16 leading-relaxed font-medium">
                    Gracias por tu compromiso. La Junta de Acción Comunal revisará tu solicitud y te responderá en máximo 48 horas.
                 </p>
                 <button 
                    @click="isSubmitted = false; formData = { name: '', email: '', message: '', interest: formType }" 
                    class="btn-premium-secondary"
                 >
                    Enviar otro mensaje
                 </button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.delay-200 { animation-delay: 0.2s; }
.delay-400 { animation-delay: 0.4s; }
</style>
