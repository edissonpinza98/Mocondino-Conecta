import { defineStore } from 'pinia'
import { supabase } from '../lib/supabase'

export const useCommunityStore = defineStore('community', {
    state: () => ({
        boards: {},
        talents: [],
        businesses: [],
        events: [],
        user: null,
        loading: false
    }),

    getters: {
        getBoardById: (state) => (id) => state.boards[id],
        filteredTalents: (state) => (type) => {
            if (!type) return state.talents
            return state.talents.filter(t => t.type === type)
        },
        isAdmin: (state) => !!state.user
    },

    actions: {
        async fetchAllData() {
            this.loading = true
            try {
                // Fetch Boards
                const { data: boardsData, error: boardsError } = await supabase
                    .from('boards')
                    .select('*, members(*), announcements(*), meetings(*)')

                if (boardsError) throw boardsError

                // Transform boards array to object keyed by id
                const boardsObj = {}
                boardsData.forEach(board => {
                    // Sorting members by id or a specific order if needed
                    const sortedMembers = [...board.members].sort((a, b) => (a.id - b.id))

                    boardsObj[board.id] = {
                        ...board,
                        members: sortedMembers,
                        announcements: board.announcements || [],
                        meetings: board.meetings || []
                    }
                })
                this.boards = boardsObj

                // Fetch other collections
                const { data: talents } = await supabase.from('talents').select('*')
                const { data: businesses } = await supabase.from('businesses').select('*')
                const { data: events } = await supabase.from('events').select('*')

                this.talents = talents || []
                this.businesses = businesses || []
                this.events = events || []

            } catch (err) {
                console.error('Error fetching data from Supabase:', err.message)
                // Fallback or error state
            } finally {
                this.loading = false
            }
        },

        async login(role, boardId) {
            // For test phase, we keep the mock login but we could integrate Supabase Auth
            this.user = { role, boardId }
        },

        logout() {
            this.user = null
        },

        async updateBoardMission(boardId, mission) {
            const { error } = await supabase
                .from('boards')
                .update({ mission })
                .eq('id', boardId)

            if (!error && this.boards[boardId]) {
                this.boards[boardId].mission = mission
            }
        },

        async updateBoardResources(boardId, resources) {
            const newResources = { ...this.boards[boardId].resources, ...resources }
            const { error } = await supabase
                .from('boards')
                .update({ resources: newResources })
                .eq('id', boardId)

            if (!error && this.boards[boardId]) {
                this.boards[boardId].resources = newResources
            }
        },

        async updateBoardContact(boardId, whatsapp) {
            const { error } = await supabase
                .from('boards')
                .update({ whatsapp })
                .eq('id', boardId)

            if (!error && this.boards[boardId]) {
                this.boards[boardId].whatsapp = whatsapp
            }
        },

        async addMeeting(boardId, meeting) {
            const { data, error } = await supabase
                .from('meetings')
                .insert([{ ...meeting, board_id: boardId }])
                .select()

            if (!error && data) {
                this.boards[boardId].meetings.unshift(data[0])
            }
        },

        async removeMeeting(boardId, id) {
            const { error } = await supabase
                .from('meetings')
                .delete()
                .eq('id', id)

            if (!error) {
                this.boards[boardId].meetings = this.boards[boardId].meetings.filter(m => m.id !== id)
            }
        },

        async addAnnouncement(boardId, announcement) {
            const { data, error } = await supabase
                .from('announcements')
                .insert([{ ...announcement, board_id: boardId }])
                .select()

            if (!error && data) {
                this.boards[boardId].announcements.unshift(data[0])
            }
        },

        async removeAnnouncement(boardId, id) {
            const { error } = await supabase
                .from('announcements')
                .delete()
                .eq('id', id)

            if (!error) {
                this.boards[boardId].announcements = this.boards[boardId].announcements.filter(a => a.id !== id)
            }
        },

        async updateMembers(boardId, members) {
            // Updated to handle array update in Supabase
            // This is a bit more complex. For simplicity in test, we update each modified member
            for (const member of members) {
                if (member.id) {
                    await supabase
                        .from('members')
                        .update({
                            name: member.name,
                            whatsapp: member.whatsapp,
                            facebook: member.facebook
                        })
                        .eq('id', member.id)
                }
            }
            // Update local state
            if (this.boards[boardId]) {
                this.boards[boardId].members = [...members]
            }
        }
    }
})
