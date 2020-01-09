<template>
    <v-container
            class="fill-height"
            fluid
    >
        <v-row
                align="center"
                justify="center"
        >
            <v-col
                    cols="12"
                    sm="8"
                    md="4"
            >
                <v-card class="elevation-12">
                    <v-toolbar
                            color="primary"
                            dark
                            flat
                    >
                        <v-toolbar-title>Login Form</v-toolbar-title>
                        <v-spacer/>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                    label="E-mail"
                                    name="email"
                                    prepend-icon="email"
                                    type="email"
                                    v-model="login"
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
                                @click="signIn()"
                                :loading="loginLoading"
                        >Login
                        </v-btn>
                    </v-card-actions>
                    <v-card-actions>
                        <v-spacer/>
                        <span class="title mr-2">or</span>
                        <v-btn class="white--text" to="/register" color="red">Register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                login: '',
                password: '',
                loginLoading: false
            }
        },

        mounted() {
            if (this.$store.state.user.authorized) {
                this.$router.push({name: 'calendar'});
            } else {
                this.$router.push({name: 'login'});
            }
        },

        methods: {
            signIn: function () {
                this.loginLoading = true;
                this.$store.dispatch('login', {
                    'email': this.login,
                    'password': this.password
                }).then(() => {
                    this.$router.push({name: 'calendar'});
                    this.loginLoading = false;
                }).catch(() => {
                    this.$router.push({name: 'login'});
                    this.loginLoading = false;
                })
            }
        }
    }
</script>

<style scoped>
</style>
