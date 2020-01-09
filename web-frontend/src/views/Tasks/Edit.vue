<template>
    <v-container
            class="fill-height"
            fluid
            v-if="this.$store.state.user.authorized"
    >
        <v-row
                align="center"
                justify="center"
        >
            <v-col
                    cols="12"
                    sm="10"
                    md="10"
            >
                <v-card class="elevation-12" :loading="loading">
                    <v-card-text>
                        <v-form>
                            <v-combobox
                                    prepend-icon="instagram"
                                    v-model="task.tags"
                                    chips
                                    :items="[]"
                                    label="Tags"
                                    :multiple="true"
                            />
                            <v-text-field
                                    id="duration"
                                    label="Duration"
                                    name="duration"
                                    prepend-icon="timer"
                                    type="number"
                                    v-model="task.duration"
                            />
                            <v-row>
                                <v-col
                                        cols="12"
                                        md="3"
                                >
                                    <v-switch
                                            v-model="task.like.active"
                                            id="like-active"
                                            label="Like"
                                            name="like-active"
                                            prepend-icon="thumb_up"
                                    />
                                </v-col>
                                <v-col
                                        cols="12"
                                        md="3"
                                >
                                    <v-text-field
                                            id="like-imitation-from"
                                            label="Imitation from"
                                            name="like-imitation-from"
                                            type="number"
                                            v-model="task.like.imitation.from"
                                            :disabled="!task.like.active"
                                    />
                                </v-col>
                                <v-col
                                        cols="12"
                                        md="3"
                                >
                                    <v-text-field
                                            id="like-imitation-to"
                                            label="Imitation to"
                                            name="like-imitation-to"
                                            type="number"
                                            v-model="task.like.imitation.to"
                                            :disabled="!task.like.active"
                                    />
                                </v-col>
                                <v-col
                                        cols="12"
                                        md="3"
                                >
                                    <v-text-field
                                            id="like-probability"
                                            label="Probability"
                                            name="like-probability"
                                            type="number"
                                            v-model="task.like.probability"
                                            :disabled="!task.like.active"
                                    />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col
                                        cols="12"
                                        md="3"
                                >
                                    <v-switch
                                            v-model="task.follow.active"
                                            id="follow-active"
                                            label="Follow"
                                            name="follow-active"
                                            prepend-icon="thumb_up"
                                    />
                                </v-col>
                                <v-col
                                        cols="12"
                                        md="3"
                                >
                                    <v-text-field
                                            id="follow-imitation-from"
                                            label="Imitation from"
                                            name="follow-imitation-from"
                                            type="number"
                                            v-model="task.follow.imitation.from"
                                            :disabled="!task.follow.active"
                                    />
                                </v-col>
                                <v-col
                                        cols="12"
                                        md="3"
                                >
                                    <v-text-field
                                            id="follow-imitation-to"
                                            label="Imitation to"
                                            name="follow-imitation-to"
                                            type="number"
                                            v-model="task.follow.imitation.to"
                                            :disabled="!task.follow.active"
                                    />
                                </v-col>
                                <v-col
                                        cols="12"
                                        md="3"
                                >
                                    <v-text-field
                                            id="follow-probability"
                                            label="Probability"
                                            name="follow-probability"
                                            type="number"
                                            v-model="task.follow.probability"
                                            :disabled="!task.follow.active"
                                    />
                                </v-col>
                            </v-row>
                            <v-datetime-picker
                                    label="Start at"
                                    prepend-icon="calendar_today"
                                    v-model="task.start_at"
                                    :datePickerProps="datePickerProps"
                                    :timePickerProps="timePickerProps"
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                                color="primary"
                                @click="save()"
                                :loading="loading"
                        >Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import dateformat from 'dateformat';

    export default {
        name: "Edit",
        data() {
            return {
                loading: false,
                datePickerProps: {
                    min: new Date().toISOString().slice(0, 10),
                },
                timePickerProps: {
                    format: '24hr'
                },
                task: {
                    id: '',
                    tags: [],
                    duration: 1000,
                    like: {
                        active: false,
                        probability: 70,
                        imitation: {
                            from: 5,
                            to: 20
                        }
                    },
                    follow: {
                        active: false,
                        probability: 70,
                        imitation: {
                            from: 5,
                            to: 20
                        }
                    },
                    start_at: ''
                }
            }
        },

        methods: {
            save: function () {
                this.loading = true;
                this.task.start_at = dateformat(this.task.start_at, "yyyy-mm-dd HH:MM");
                this.$store.dispatch('editTask', this.task).then(data => {
                    this.loading = false;
                    console.log(data);
                    this.$router.push({name: 'calendar'});
                }).catch(() => {
                    this.loading = false;
                })
            }
        },

        mounted() {
            this.loading = true;
            this.task.id = this.$router.currentRoute.params.taskId;
            this.$store.dispatch('getTask', this.task.id).then(data => {
                this.task = data.data.task;
                this.task.like = JSON.parse(data.data.task.like);
                this.task.follow = JSON.parse(data.data.task.follow);
                this.task.tags = JSON.parse(data.data.task.tags);
                this.task.start_at = new Date(data.data.task.start_at);
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        }
    }
</script>

<style scoped>

</style>
