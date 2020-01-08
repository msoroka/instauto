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
                                    id="name"
                                    label="Name"
                                    name="name"
                                    prepend-icon="person"
                                    type="text"
                                    v-model="first_name"
                            />
                            <v-text-field
                                    id="email"
                                    label="E-mail"
                                    name="email"
                                    prepend-icon="email"
                                    type="email"
                                    v-model="email"
                                    disabled
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
                                @click="updateUser()"
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
        name: "User",
        data() {
            return {
                loading: false,
                first_name: '',
                email: '',
                password: ''
            }
        },

        methods: {
            getProfile: function () {
                this.loading = true;
                this.$store.dispatch('checkAuth').then(data => {
                    this.first_name = data.data.first_name;
                    this.email = data.data.email;
                    this.password = data.data.password;
                    this.loading = false;
                }).catch(() => {
                    this.first_name = '';
                    this.email = '';
                    this.password = '';
                    this.loading = false;
                });
            },
            updateUser: function () {
                this.loading = true;
                if (this.password) {
                    this.$store.dispatch('update', {
                        first_name: this.first_name,
                        password: this.password
                    }).then(() => {
                        this.loading = false;
                        this.getProfile();
                    }).catch(() => {
                        this.loading = false;
                    })
                } else {
                    this.$store.dispatch('update', {
                        first_name: this.first_name,
                    }).then(() => {
                        this.loading = false;
                        this.getProfile();
                    }).catch(() => {
                        this.loading = false;
                    })
                }
            }
        },

        mounted() {
            this.getProfile();
        }
    }
</script>

<style scoped>

</style>
