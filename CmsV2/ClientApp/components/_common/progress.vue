<template>
    <modal
        :width="450"
        :footer="false"
        :isShowHeader="false"
        v-if="showProcessData"
        @close="closeProcess"
        :zIndex="1060"
    >
        <div slot="body">
            <div class="row font-weight-bold">
                <div class="col-10">{{item.Title}}</div>
                <div
                    class="col-2 text-right"
                    v-if="item.TotalItem"
                >{{item.CurrentItem + ' / ' + item.TotalItem}}</div>
                <div class="col-12 mt-2">
                    <div class="progress">
                        <div
                            class="progress-bar"
                            role="progressbar"
                            :style="{'width': percent + '%'}"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            item: {}
        };
    },
    watch: {
        // showProcessData() {
        //     if (!this.showProcessData) {
        //         this.item = {};
        //     }
        // }
    },
    computed: {
        ...mapGetters(['showProcessData']),
        percent() {
            if (this.item.TotalItem && this.item.TotalItem > 0) {
                return (this.item.CurrentItem / this.item.TotalItem) * 100;
            }
            return 0;
        }
    },
    methods: {
        ...mapActions(['setShowProcess']),
        closeProcess() {
            this.setShowProcess();
        }
    },
    created() {
        this.systemHubProxy.on('progress', payload => {
            if (payload.Type == this.showProcessData.type) this.item = payload;
        });
    }
};
</script>

<style>
</style>