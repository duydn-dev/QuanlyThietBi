<template>
    <div class="kt-grid kt-grid--ver kt-grid--root kt-page">
    </div>
</template>
<script>
import {  mapActions } from 'vuex'; 

var opts = {
    name: 'logout',
    data() {
    },
    computed: {
    },
    methods: {
        ...mapActions(['logOut']),
       
    },
    created() {
        this.logOut().then(() => {
            this.$router.push(`/login`);
        });
    },
    watch: {}
};
export default opts;
</script>
