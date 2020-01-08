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
                    sm="8"
                    md="8"
            >
                <v-card class="elevation-12" :loading="loading">
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                    label="Username"
                                    name="email"
                                    prepend-icon="instagram"
                                    type="email"
                                    v-model="username"
                            />
                            <v-text-field
                                    id="password"
                                    label="Password"
                                    name="password"
                                    prepend-icon="lock"
                                    type="password"
                                    v-model="password"
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                                color="primary"
                                @click="saveProfile()"
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
    export default {
        name: "InstagramProfile",
        data() {
            return {
                username: '',
                password: '',
                loading: false
            }
        },

        mounted() {
            this.getProfile();
        },

        methods: {
            getProfile: function () {
                this.loading = true;
                this.$store.dispatch('getProfile').then(data => {
                    this.username = data.data.profile.username;
                    this.password = data.data.profile.password;
                    this.loading = false;
                }).catch(() => {
                    this.username = '';
                    this.password = '';
                    this.loading = false;
                });
            },
            saveProfile: function () {
                this.loading = true;
                this.$store.dispatch('saveProfile', {
                    'username': this.username,
                    'password': this.password
                }).then(() => {
                    this.getProfile();
                    this.loading = false;
                }).catch(() => {
                    this.loading = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>
