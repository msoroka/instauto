<template>
    <v-container
            v-if="this.$store.state.user.authorized"
    >
        <v-row class="fill-height">
            <v-col>
                <v-sheet height="64">
                    <v-toolbar flat color="white">
                        <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
                            Today
                        </v-btn>
                        <v-btn fab text small color="grey darken-2" @click="prev">
                            <v-icon small>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn fab text small color="grey darken-2" @click="next">
                            <v-icon small>mdi-chevron-right</v-icon>
                        </v-btn>
                        <v-toolbar-title>{{ title }}</v-toolbar-title>
                        <v-spacer/>
                        <v-menu bottom right>
                            <template v-slot:activator="{ on }">
                                <v-btn
                                        outlined
                                        color="grey darken-2"
                                        v-on="on"
                                >
                                    <span>{{ typeToLabel[type] }}</span>
                                    <v-icon right>mdi-menu-down</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item @click="type = 'day'">
                                    <v-list-item-title>Day</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="type = 'week'">
                                    <v-list-item-title>Week</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="type = 'month'">
                                    <v-list-item-title>Month</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-toolbar>
                </v-sheet>
                <v-sheet height="600"
                >
                    <v-calendar
                            ref="calendar"
                            v-model="focus"
                            color="primary"
                            :events="events"
                            :event-color="getEventColor"
                            :now="today"
                            :type="type"
                            @click:event="showEvent"
                            @click:more="viewDay"
                            @click:date="viewDay"
                            @change="updateRange"
                    />
                    <v-menu
                            v-model="selectedOpen"
                            :close-on-content-click="false"
                            :activator="selectedElement"
                            offset-x
                    >
                        <v-card
                                color="grey lighten-4"
                                min-width="350px"
                                flat
                        >
                            <v-toolbar
                                    :color="selectedEvent.color"
                                    dark
                            >
                                <v-btn @click="editTask(selectedEvent.id)" icon
                                       v-if="selectedEvent.status === 'pending'">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-toolbar-title v-html="selectedEvent.name"/>
                                <v-spacer/>
                                <v-menu bottom left v-if="selectedEvent.status === 'pending'">
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                                dark
                                                icon
                                                v-on="on"
                                        >
                                            <v-icon>mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>

                                    <v-list>
                                        <v-list-item>
                                            <v-list-item-title @click="deleteEvent(selectedEvent.id)">Delete
                                            </v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </v-toolbar>
                            <v-card-text>
                                <v-card-text>
                                    Status: {{ selectedEvent.status }}
                                </v-card-text>
                                <v-card-text>
                                    Tags: {{ selectedEvent.name }}
                                </v-card-text>
                                <v-card-text>
                                    Start at: {{ selectedEvent.start }}
                                </v-card-text>
                                <v-card-text>
                                    End at: {{ selectedEvent.end }}
                                </v-card-text>
                                <v-card-text>
                                    Like: {{ selectedEvent.like }}
                                </v-card-text>
                                <v-card-text>
                                    Follow: {{ selectedEvent.follow }}
                                </v-card-text>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn
                                        text
                                        color="secondary"
                                        @click="selectedOpen = false"
                                >
                                    Close
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-menu>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Tasks",
        data: () => ({
            loading: true,
            focus: '',
            type: 'week',
            typeToLabel: {
                month: 'Month',
                week: 'Week',
                day: 'Day'
            },
            start: null,
            end: null,
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            events: [],
            colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        }),
        computed: {
            title() {
                const {start, end} = this
                if (!start || !end) {
                    return ''
                }

                const startMonth = this.monthFormatter(start)
                const endMonth = this.monthFormatter(end)
                const suffixMonth = startMonth === endMonth ? '' : endMonth

                const startYear = start.year
                const endYear = end.year
                const suffixYear = startYear === endYear ? '' : endYear

                const startDay = start.day + this.nth(start.day)
                const endDay = end.day + this.nth(end.day)

                switch (this.type) {
                    case 'month':
                        return `${startMonth} ${startYear}`
                    case 'week':
                    case '4day':
                        return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
                    case 'day':
                        return `${startMonth} ${startDay} ${startYear}`
                }
                return ''
            },
            monthFormatter() {
                return this.$refs.calendar.getFormatter({
                    timeZone: 'UTC', month: 'long',
                })
            },
        },
        mounted() {
            this.$refs.calendar.checkChange()
        },
        methods: {
            viewDay({date}) {
                this.focus = date
                this.type = 'day'
            },
            editTask(id) {
                this.$router.push({
                    name: "edit-task",
                    params: {
                        taskId: id
                    }
                });
            },
            deleteEvent(id) {
                this.$store.dispatch('deleteTask', id).then(() => {
                    this.selectedOpen = false;
                    let events = [];
                    let tasks = [];

                    this.$store.dispatch('getTasks').then(data => {
                        tasks = data.data.tasks;
                        tasks.forEach(task => {
                            events.push({
                                name: task.tags,
                                start: task.start_at,
                                end: task.end_at,
                                color: 'red',
                                like: task.like,
                                follow: task.follow,
                                status: task.status,
                                id: task.id
                            });
                        });
                    });

                    this.events = events;
                });
            },
            getEventColor(event) {
                return event.color
            },
            setToday() {
                this.focus = this.today
            },
            prev() {
                this.$refs.calendar.prev()
            },
            next() {
                this.$refs.calendar.next()
            },
            showEvent({nativeEvent, event}) {
                const open = () => {
                    this.selectedEvent = event
                    this.selectedElement = nativeEvent.target
                    setTimeout(() => this.selectedOpen = true, 10)
                }

                if (this.selectedOpen) {
                    this.selectedOpen = false
                    setTimeout(open, 10)
                } else {
                    open()
                }

                nativeEvent.stopPropagation()
            },
            updateRange({start, end}) {
                let events = [];
                let tasks = [];

                this.$store.dispatch('getTasks').then(data => {
                    tasks = data.data.tasks;
                    tasks.forEach(task => {
                        events.push({
                            name: task.tags,
                            start: task.start_at,
                            end: task.end_at,
                            color: 'red',
                            like: task.like,
                            follow: task.follow,
                            status: task.status,
                            id: task.id
                        });
                    });
                });

                this.events = events;

                this.start = start;
                this.end = end;
            },
            nth(d) {
                return d > 3 && d < 21
                    ? 'th'
                    : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
            },
        },
    }
</script>

<style scoped>

</style>
