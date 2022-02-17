<template>
    <div class="d-aplayer">
        <aplayer preload="metadata" repeat="repeat-one"
                 :autoplay="autoplay"
                 :music="{
                    title: 'File âm thanh',
                    artist: ' ',
                    src: src,
                  }" theme="#d20819"/>
    </div>
</template>
<script>
    import Aplayer from 'vue-aplayer'
    Aplayer.disableVersionBadge = true
    export default {
        name: "player",
        props: {
            src: {
                type: String,
                required: true
            },
            autoplay: {
                type: Boolean,
                default: false
            }
        },
        components: {
            Aplayer
        }
    }
</script>