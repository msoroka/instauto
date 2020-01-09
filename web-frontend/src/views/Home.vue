<template>
    <div>
    </div>
</template>

<script>
    export default {
        name: "home",
        components: {},
        mounted() {
            if (this.$store.state.user.authorized) {
                this.$router.push({name: 'calendar'});
            } else {
                this.$router.push({name: 'login'});
            }
        }
    };
</script>
