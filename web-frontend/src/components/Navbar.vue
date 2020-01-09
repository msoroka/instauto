<template>
    <div>
        <v-navigation-drawer
                v-model="drawer"
                app
        >
            <v-list dense>
                <v-list-item link to="/calendar">
                    <v-list-item-action>
                        <v-icon>mdi-calendar</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Tasks Calendar</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/create-task">
                    <v-list-item-action>
                        <v-icon>mdi-plus</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Create task</v-list-item-title>
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
            <template v-slot:append>
                <div class="pa-2">
                    <v-btn color="primary" block @click="logout">Logout</v-btn>
                </div>
            </template>
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
                <span class="mr-2">Welcome, {{ this.$store.state.user.data.first_name }}</span>
                <v-avatar color="white" size="36">
                    <v-icon color="primary">mdi-account-circle</v-icon>
                </v-avatar>
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
                    this.$router.push({name: 'calendar'});
                });
            }
        }
    };
</script>

<style scoped>

</style>
