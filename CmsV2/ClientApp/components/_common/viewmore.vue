<template>
    <div v-if="isLoading != 3" class="row text-center">
        <a class="dviewmore text-center" href="javascript:;" @click="$emit('loadMore')">
            <span v-if="isLoading == 2" class="ttx">
                <i class="fa fa-cog fa-spin fa-2x fa-fw" />
                <span class="sr-only">Loading...</span>
            </span>
            <span v-else class="view">
                {{ $t('Label.Message.ViewMore') }}&nbsp;
                <i class="fa fa-angle-down" aria-hidden="true" />
            </span>
        </a>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    computed: mapGetters(['isLoading'])
};
</script>
<style scoped>
.dviewmore {
    color: white;
    background-color: #ffa30a;
    display: inline-block;
    padding: 10px 34px;
    border-radius: 25px;
}
</style>
