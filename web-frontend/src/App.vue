<template>
    <v-app>
        <Navbar v-if="this.$store.state.user.authorized"/>
        <v-content>
            <router-view/>
            <v-dialog v-model="loading" fullscreen full-width>
                <v-container fluid fill-height style="background-color: rgba(255, 255, 255, 0.5);">
                    <v-layout justify-center align-center>
                        <v-progress-circular
                                indeterminate
                                color="primary">
                        </v-progress-circular>
                    </v-layout>
                </v-container>
            </v-dialog>
        </v-content>
        <Footer v-if="this.$store.state.user.authorized"/>
    </v-app>
</template>

<script>
    import Navbar from "./components/Navbar";
    import Footer from "./components/Footer";

    export default {
        name: 'App',

        components: {
            Navbar,
            Footer
        },

        data: () => ({
            authorized: false,
            loading: true
        }),

        mounted() {
            this.loading = true;
            this.$store.dispatch('checkAuth').then(() => {
                if (this.$store.state.user.authorized) {
                    this.$router.push({name: 'calendar'});
                } else {
                    this.$router.push({name: 'login'});
                }
                this.loading = false;
            }).catch(() => {
                this.$router.push({name: 'login'});
                this.loading = false;
            });
        },

        watch: {
            authorized: function () {
                return this.$store.state.user.authorized;
            }
        }
    };
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
</style>
