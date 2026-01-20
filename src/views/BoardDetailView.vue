<script setup>
import { computed, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useCommunityStore } from '../stores/community'
import { 
  Users, Calendar, FileText, Bell, TrendingUp, ChevronLeft,
  Target, Award, Layout, CheckCircle2, ArrowUpRight, Shield, Download,
  Clock, MapPin, Plus, Trash2, Edit3, X, Save, Facebook
} from 'lucide-vue-next'

const route = useRoute()
const store = useCommunityStore()

const boardId = computed(() => route.params.id)
const board = computed(() => store.getBoardById(boardId.value))
const canEdit = computed(() => store.user && store.user.boardId === boardId.value)

// Admin Forms State
const showAddMeeting = ref(false)
const showAddAnnouncement = ref(false)
const isEditingMission = ref(false)
const isEditingMembers = ref(false)
const isEditingContact = ref(false)

const meetingForm = ref({ date: '', topic: '', summary: '', links: { pdf: '#' } })
const announcementForm = ref({ title: '', content: '', date: new Date().toISOString().split('T')[0] })
const missionDraft = ref('')
const membersDraft = ref([])
const whatsappDraft = ref('')

const toggleMissionEdit = () => {
  if (!isEditingMission.value) missionDraft.value = board.value.mission
  isEditingMission.value = !isEditingMission.value
}

const saveMission = () => {
  store.updateBoardMission(boardId.value, missionDraft.value)
  isEditingMission.value = false
}

const toggleMembersEdit = () => {
  if (!isEditingMembers.value) {
    membersDraft.value = JSON.parse(JSON.stringify(board.value.members))
  }
  isEditingMembers.value = !isEditingMembers.value
}

const saveMembers = () => {
  store.updateMembers(boardId.value, membersDraft.value)
  isEditingMembers.value = false
}

const toggleContactEdit = () => {
  if (!isEditingContact.value) whatsappDraft.value = board.value.whatsapp || ''
  isEditingContact.value = !isEditingContact.value
}

const saveContact = () => {
  store.updateBoardContact(boardId.value, whatsappDraft.value)
  isEditingContact.value = false
}

const addNewMeeting = () => {
  store.addMeeting(boardId.value, { ...meetingForm.value })
  showAddMeeting.value = false
  meetingForm.value = { date: '', topic: '', summary: '', links: { pdf: '#' } }
}

const addNewAnnouncement = () => {
  store.addAnnouncement(boardId.value, { ...announcementForm.value })
  showAddAnnouncement.value = false
  announcementForm.value = { title: '', content: '', date: new Date().toISOString().split('T')[0] }
}
</script>

<template>
  <div v-if="board" class="min-h-screen pb-32">
    <!-- Admin Banner -->
    <div v-if="canEdit" class="bg-primary-600 text-white py-3 px-4 sticky top-0 z-[60] flex items-center justify-between shadow-lg">
      <div class="flex items-center gap-3">
        <Shield class="w-5 h-5" />
        <span class="text-xs font-black uppercase tracking-widest">Panel de Gestión: {{ board.name }}</span>
      </div>
      <button @click="store.logout()" class="text-[10px] font-black uppercase tracking-widest bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-lg transition-colors">
        Cerrar Sesión Admin
      </button>
    </div>

    <!-- Premium Header -->
    <header class="relative pt-32 pb-48 overflow-hidden">
      <!-- Background Patterns -->
      <div class="absolute inset-0 z-0">
        <div class="absolute top-0 left-0 w-full h-full bg-slate-50"></div>
        <div class="absolute top-[-20%] right-[-10%] w-[60%] h-[80%] bg-primary-100/50 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-[-20%] left-[-10%] w-[60%] h-[80%] bg-secondary-100/30 rounded-full blur-[120px]"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RouterLink 
          to="/" 
          class="inline-flex items-center text-sm font-black text-primary-600 mb-12 hover:translate-x-[-4px] transition-transform uppercase tracking-widest"
        >
          <ChevronLeft class="w-4 h-4 mr-2" />
          Volver al Inicio
        </RouterLink>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div class="lg:col-span-8 animate-fade-in-up">
            <div class="flex items-center gap-4 mb-6">
               <div class="px-4 py-1.5 bg-white/80 backdrop-blur-md border border-white rounded-full shadow-sm">
                  <span class="text-[10px] font-black text-primary-600 uppercase tracking-[0.3em]">Gestión Oficial</span>
               </div>
            </div>
            
            <h1 class="text-6xl md:text-7xl font-black text-slate-900 leading-tight mb-8 tracking-tighter">
               {{ board.name.split(' ')[0] }} <span class="text-gradient">{{ board.name.split(' ').slice(1).join(' ') }}</span>
            </h1>
            
            <div class="relative group">
              <div v-if="!isEditingMission">
                <p class="text-xl text-slate-600 leading-relaxed max-w-2xl font-medium">
                   {{ board.mission }}
                </p>
                <button v-if="canEdit" @click="toggleMissionEdit" class="mt-4 flex items-center gap-2 text-xs font-black text-primary-600 uppercase tracking-widest hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit3 class="w-4 h-4" /> Editar Misión
                </button>
              </div>
              <div v-else class="max-w-2xl space-y-4">
                <textarea 
                  v-model="missionDraft"
                  rows="4"
                  class="w-full p-4 bg-white border-2 border-primary-500 rounded-2xl font-medium text-slate-700 focus:outline-none"
                ></textarea>
                <div class="flex gap-2">
                  <button @click="saveMission" class="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-xl text-xs font-black uppercase tracking-widest">
                    <Save class="w-4 h-4" /> Guardar
                  </button>
                  <button @click="isEditingMission = false" class="flex items-center gap-2 px-6 py-2 bg-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest">
                    <X class="w-4 h-4" /> Cancelar
                  </button>
                </div>
              </div>
            </div>

            <div class="mt-12 flex flex-wrap gap-6">
               <div class="flex items-center gap-3 text-slate-500">
                  <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                     <Clock class="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                     <div class="text-[10px] font-black uppercase text-slate-400">Próxima Reunión</div>
                     <div class="text-sm font-bold text-slate-900">15 de Feb, 2026</div>
                  </div>
               </div>

               <div v-if="board.whatsapp || canEdit" class="flex items-center gap-3 group/contact relative">
                  <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-green-500">
                     <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.049c0 2.123.555 4.197 1.608 6.041l-1.71 6.241 6.386-1.675a11.832 11.832 0 005.76 1.496h.004c6.637 0 12.046-5.412 12.049-12.05a11.776 11.776 0 00-3.535-8.528z"/></svg>
                  </div>
                  <div v-if="!isEditingContact">
                     <div class="text-[10px] font-black uppercase text-slate-400">Contacto Directo</div>
                     <a :href="`https://wa.me/57${board.whatsapp}`" target="_blank" class="text-sm font-bold text-slate-900 hover:text-green-600 transition-colors">
                        {{ board.whatsapp ? `+57 ${board.whatsapp}` : 'Sin contacto' }}
                     </a>
                     <button v-if="canEdit" @click="toggleContactEdit" class="absolute -right-6 top-1/2 -translate-y-1/2 text-primary-500 opacity-0 group-hover/contact:opacity-100 transition-opacity">
                        <Edit3 class="w-3 h-3" />
                     </button>
                  </div>
                  <div v-else class="flex gap-2">
                     <input 
                        v-model="whatsappDraft"
                        type="text" 
                        class="bg-white border rounded-lg px-2 py-1 text-xs font-bold w-32 focus:outline-none focus:ring-1 focus:ring-green-500"
                        placeholder="Ej. 312..."
                     />
                     <button @click="saveContact" class="text-xs font-black text-green-600 uppercase">Ok</button>
                     <button @click="isEditingContact = false" class="text-xs font-black text-slate-400 uppercase">X</button>
                  </div>
               </div>
            </div>
          </div>

          <!-- Quick Stats Card -->
          <div class="lg:col-span-4 animate-fade-in-up delay-200">
             <div class="glass-card p-10 border-white/60 shadow-2xl relative overflow-hidden group">
                <h4 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Estado de Recursos</h4>
                <div class="space-y-8">
                   <div>
                      <div class="flex justify-between items-end mb-3">
                         <span class="text-sm font-black text-slate-900">Proyectos Ejecutados</span>
                         <span class="text-2xl font-black text-primary-600">85%</span>
                      </div>
                      <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                         <div class="w-[85%] h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full"></div>
                      </div>
                   </div>
                   <button class="w-full btn-premium-primary text-sm shadow-none hover:shadow-lg">
                      Solicitar Transparencia
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <!-- Main Content -->
        <div class="lg:col-span-8 space-y-12">
          
          <!-- Recent Meetings Section -->
          <section class="animate-fade-in-up delay-400">
            <div class="flex items-center justify-between mb-8">
               <h2 class="text-3xl font-black flex items-center gap-4 tracking-tighter uppercase">
                  <div class="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center text-white">
                     <FileText class="w-6 h-6" />
                  </div>
                  Últimas Actas
               </h2>
               <div class="flex gap-4">
                 <button v-if="canEdit" @click="showAddMeeting = !showAddMeeting" class="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-700 transition-colors">
                   <Plus class="w-4 h-4" /> Agregar Acta
                 </button>
               </div>
            </div>
            
            <!-- Add Meeting Form -->
            <transition name="page">
              <div v-if="showAddMeeting" class="glass-card p-8 mb-8 border-primary-500 border-2">
                <h3 class="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight">Cargar Nueva Acta</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Fecha</label>
                    <input v-model="meetingForm.date" type="date" class="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-900">
                  </div>
                  <div class="space-y-2">
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Asunto Principal</label>
                    <input v-model="meetingForm.topic" type="text" placeholder="Ej. Presupuesto 2026" class="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-900">
                  </div>
                </div>
                <div class="space-y-2 mb-6">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Resumen Ejecutivo</label>
                  <textarea v-model="meetingForm.summary" rows="3" class="w-full p-4 bg-slate-50 border-0 rounded-2xl font-bold text-slate-900" placeholder="Describe los puntos clave..."></textarea>
                </div>
                <div class="flex gap-2">
                  <button @click="addNewMeeting" class="flex items-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary-500/20">
                    <Save class="w-4 h-4" /> Publicar Acta
                  </button>
                  <button @click="showAddMeeting = false" class="flex items-center gap-2 px-8 py-3 bg-slate-100 text-slate-500 rounded-2xl text-xs font-black uppercase tracking-widest">
                    <X class="w-4 h-4" /> Cancelar
                  </button>
                </div>
              </div>
            </transition>
            
            <div class="space-y-6">
              <div v-for="(meeting, index) in board.meetings" :key="index" class="glass-card p-8 group hover:bg-white transition-all cursor-default relative">
                <button v-if="canEdit" @click="store.removeMeeting(boardId, meeting.id)" class="absolute top-4 right-4 p-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 class="w-4 h-4" />
                </button>
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div class="flex-grow">
                    <div class="flex items-center gap-4 mb-4">
                       <span class="px-3 py-1 bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                          {{ meeting.date }}
                       </span>
                    </div>
                    <h3 class="text-2xl font-black mb-4 text-slate-900 group-hover:text-primary-600 transition-colors">{{ meeting.topic }}</h3>
                    <p class="text-slate-500 leading-relaxed text-sm">
                       {{ meeting.summary }}
                    </p>
                  </div>
                  <a 
                    :href="meeting.links.pdf" 
                    target="_blank"
                    class="btn-premium bg-slate-900 text-white hover:bg-primary-600 transition-colors shrink-0 !py-4"
                  >
                    <Download class="w-5 h-5" />
                    <span class="text-sm font-black uppercase tracking-widest">Acta PDF</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <!-- Board Members Section -->
          <section class="animate-fade-in-up delay-500">
            <div class="flex items-center justify-between mb-8">
              <h2 class="text-3xl font-black flex items-center gap-4 tracking-tighter uppercase">
                 <div class="w-12 h-12 rounded-2xl bg-secondary-600 flex items-center justify-center text-white">
                    <Users class="w-6 h-6" />
                 </div>
                 Cuerpo Directivo
              </h2>
              <button v-if="canEdit" @click="toggleMembersEdit" class="flex items-center gap-2 px-4 py-2 bg-secondary-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-secondary-700 transition-colors">
                <template v-if="!isEditingMembers">
                  <Edit3 class="w-4 h-4" /> Editar Miembros
                </template>
                <template v-else>
                  <X class="w-4 h-4" /> Cancelar
                </template>
              </button>
            </div>

            <div v-if="!isEditingMembers" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div v-for="(member, index) in board.members" :key="index" class="glass-card p-6 flex flex-col gap-4 group hover:translate-x-2 transition-transform">
                <div class="flex items-center gap-6">
                  <div class="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-secondary-500 transition-colors shrink-0">
                    <Award class="w-8 h-8 text-slate-400 group-hover:text-white" />
                  </div>
                  <div class="flex-grow">
                    <div class="text-[10px] font-black text-secondary-600 uppercase tracking-widest mb-1">{{ member.role }}</div>
                    <div class="text-xl font-black text-slate-900 line-clamp-1">{{ member.name || 'Vacante' }}</div>
                  </div>
                </div>
                
                <div v-if="member.whatsapp || member.facebook" class="pt-4 border-t border-slate-100 mt-auto flex gap-2">
                  <a v-if="member.whatsapp" :href="`https://wa.me/57${member.whatsapp}`" target="_blank" class="flex items-center justify-center gap-2 flex-grow py-3 bg-green-50 text-green-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.049c0 2.123.555 4.197 1.608 6.041l-1.71 6.241 6.386-1.675a11.832 11.832 0 005.76 1.496h.004c6.637 0 12.046-5.412 12.049-12.05a11.776 11.776 0 00-3.535-8.528z"/></svg>
                    WhatsApp
                  </a>
                  <a v-if="member.facebook" :href="member.facebook" target="_blank" class="flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shrink-0">
                    <Facebook class="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div v-else class="glass-card p-8 border-2 border-secondary-500">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 mb-8">
                <div v-for="(member, index) in membersDraft" :key="index" class="space-y-4 p-6 bg-slate-900/5 rounded-3xl border border-slate-200">
                  <div class="text-[10px] font-black text-secondary-600 uppercase tracking-widest ml-2">{{ member.role }}</div>
                  <div class="space-y-3">
                    <div class="relative">
                      <input 
                        v-model="member.name"
                        type="text" 
                        placeholder="Nombre completo"
                        class="w-full p-4 bg-white border border-slate-100 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-secondary-500 outline-none pr-12 text-sm"
                      >
                      <button 
                        v-if="member.name"
                        @click="member.name = ''"
                        class="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 class="w-4 h-4" />
                      </button>
                    </div>
                    <div class="relative">
                      <input 
                        v-model="member.whatsapp"
                        type="text" 
                        placeholder="WhatsApp (ej. 3123456789)"
                        class="w-full p-3 bg-white border border-slate-100 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-green-500 outline-none pl-11 text-xs"
                      >
                      <div class="absolute left-4 top-1/2 -translate-y-1/2 text-green-500">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.049c0 2.123.555 4.197 1.608 6.041l-1.71 6.241 6.386-1.675a11.832 11.832 0 005.76 1.496h.004c6.637 0 12.046-5.412 12.049-12.05a11.776 11.776 0 00-3.535-8.528z"/></svg>
                      </div>
                    </div>
                    <div class="relative">
                      <input 
                        v-model="member.facebook"
                        type="text" 
                        placeholder="Link a Facebook"
                        class="w-full p-3 bg-white border border-slate-100 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none pl-11 text-xs"
                      >
                      <div class="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">
                        <Facebook class="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex gap-4">
                <button @click="saveMembers" class="flex items-center gap-2 px-8 py-3 bg-secondary-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-secondary-500/20">
                  <Save class="w-4 h-4" /> Guardar Cambios
                </button>
                <button @click="isEditingMembers = false" class="flex items-center gap-2 px-8 py-3 bg-slate-100 text-slate-500 rounded-2xl text-xs font-black uppercase tracking-widest">
                  <X class="w-4 h-4" /> Cancelar
                </button>
              </div>
            </div>
          </section>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-4 space-y-12 animate-fade-in-up delay-600">
          <section class="glass-card p-10 bg-slate-900 text-white border-0 shadow-2xl relative overflow-hidden">
             <div class="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-3xl rounded-full"></div>
             <div class="flex items-center justify-between mb-10">
               <h2 class="text-xl font-black flex items-center gap-3 uppercase tracking-tighter relative z-10">
                  <Bell class="w-5 h-5 text-secondary-400" />
                  Anuncios
               </h2>
               <button v-if="canEdit" @click="showAddAnnouncement = !showAddAnnouncement" class="relative z-10 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                 <Plus class="w-4 h-4" />
               </button>
             </div>

             <!-- Add Announcement Form -->
             <transition name="page">
               <div v-if="showAddAnnouncement" class="mb-10 bg-white/5 p-6 rounded-2xl border border-white/10 relative z-20">
                 <div class="space-y-4">
                   <input v-model="announcementForm.title" type="text" placeholder="Título del anuncio" class="w-full bg-white/10 border-0 rounded-xl p-3 text-sm text-white placeholder-slate-500">
                   <textarea v-model="announcementForm.content" rows="3" placeholder="Contenido del anuncio..." class="w-full bg-white/10 border-0 rounded-xl p-3 text-sm text-white placeholder-slate-500"></textarea>
                   <div class="flex gap-2">
                     <button @click="addNewAnnouncement" class="bg-primary-600 text-white px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase">Guardar</button>
                     <button @click="showAddAnnouncement = false" class="bg-white/10 text-slate-300 px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase">Cancelar</button>
                   </div>
                 </div>
               </div>
             </transition>

             <div class="space-y-10 relative z-10">
               <div v-for="(ann, index) in board.announcements" :key="index" class="relative pl-6 group">
                 <button v-if="canEdit" @click="store.removeAnnouncement(boardId, ann.id)" class="absolute top-0 right-0 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Trash2 class="w-3 h-3" />
                 </button>
                 <div class="absolute left-0 top-0 bottom-0 w-1 bg-secondary-500 rounded-full"></div>
                 <div class="text-[10px] font-black text-secondary-400 mb-2 uppercase tracking-[0.2em]">{{ ann.date }}</div>
                 <h4 class="font-black text-lg mb-3 tracking-tight">{{ ann.title }}</h4>
                 <p class="text-sm text-slate-400 leading-relaxed font-medium">{{ ann.content }}</p>
               </div>
             </div>
          </section>

          <!-- Admin Info (Visible only if NOT logged in) -->
          <section v-if="!canEdit" class="glass-card p-10 border-dashed border-2 border-slate-200">
            <h2 class="text-lg font-black mb-6 flex items-center gap-3 uppercase tracking-tighter">
               <Layout class="w-5 h-5 text-primary-600" />
               Área Directiva
            </h2>
            <p class="text-sm text-slate-500 mb-10 leading-relaxed font-medium">Si eres directivo de esta junta, ingresa con tu código para gestionar este espacio.</p>
            <RouterLink to="/login" class="w-full btn-premium bg-slate-100 text-slate-700 !py-4 rounded-xl hover:bg-slate-200 transition-all text-sm font-black uppercase tracking-widest">
              Ingresar al Sistema
            </RouterLink>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.delay-200 { animation-delay: 0.2s; }
.delay-400 { animation-delay: 0.4s; }
.delay-500 { animation-delay: 0.5s; }
.delay-600 { animation-delay: 0.6s; }
</style>
