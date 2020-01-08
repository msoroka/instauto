<template>
    <div>
        <v-navigation-drawer
                v-model="drawer"
                app
        >
            <v-list dense>
                <v-list-item link to="/tasks">
                    <v-list-item-action>
                        <v-icon>mdi-calendar</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Tasks</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/profile">
                    <v-list-item-action>
                        <v-icon>mdi-instagram</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Instagram Profile</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/user">
                    <v-list-item-action>
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>User Settings</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                app
                color="primary"
                dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer/>
            <v-card-actions>
                <v-btn text @click="logout">Logout</v-btn>
            </v-card-actions>
        </v-app-bar>
    </div>
</template>

<script>
    export default {
        name: "Navbar",
        data() {
            return {
                title: 'Instauto',
                drawer: null
            }
        },

        methods: {
            logout: function () {
                this.$store.dispatch('logout').then(() => {
                    this.$router.push({name: 'login'});
                }).catch(() => {
                    this.$router.push({name: 'home'});
                });
            }
        }
    };
</script>

<style scoped>

</style>
