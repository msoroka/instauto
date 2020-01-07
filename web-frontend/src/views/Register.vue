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
                        <v-toolbar-title>Register Form</v-toolbar-title>
                        <v-spacer/>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                    id="name"
                                    label="Name"
                                    name="name"
                                    prepend-icon="person"
                                    type="text"
                            />
                            <v-text-field
                                    id="email"
                                    label="E-mail"
                                    name="email"
                                    prepend-icon="email"
                                    type="email"
                            />
                            <v-text-field
                                    id="password"
                                    label="Password"
                                    name="password"
                                    prepend-icon="lock"
                                    type="password"
                            />
                            <v-text-field
                                    id="password_confirmation"
                                    label="Password Confirmation"
                                    name="password_confirmation"
                                    prepend-icon="lock"
                                    type="password_confirmation"
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn color="primary">Register</v-btn>
                    </v-card-actions>
                    <v-card-actions>
                        <v-spacer/>
                        <span class="title mr-2">or</span>
                        <v-btn class="white--text" to="/login" color="red">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Register"
    }
</script>

<style scoped>

</style>
