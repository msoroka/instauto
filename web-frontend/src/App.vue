<template>
    <v-app>
        <Navbar v-if="authorized"/>
        <v-content>
            <router-view/>
        </v-content>
        <Footer v-if="authorized"/>
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
        }),

        mounted() {
            this.authorized = this.$store.state.user.authorized;
        },

        watch: {
            authorized: function () {
                this.authorized = this.$store.state.user.authorized;
            }
        }
    };
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
</style>
