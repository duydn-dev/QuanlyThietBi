<template>
    <div :class="`more-actions-btn ${cls}`" @click="activeAction" v-click-outside="deActiveAll">
        <i class="fa fa-ellipsis-v"></i>
        <slot></slot>
    </div>
</template>
<style scope>
.more-actions-btn {
    float: right;
    position: relative;
}

.more-actions-btn i {
    font-size: 10px;
    color: #999;
    cursor: pointer;
    padding: 0 5px;
}

.more-actions-btn i:hover {
    color: #333;
}

.more-actions-btn ul {
    position: absolute;
    right: 0px;
    background: #fff;
    font-size: 13px;
    width: 150px;
    border: solid 1px #ddd;
    border-radius: 3px;
    box-shadow: 0 0 2px #ccc;
    display: none;
}

.more-actions-btn ul li {
    list-style-type: none;
    padding: 10px;
    font-size: 12px;
}

.more-actions-btn ul li {
    border-bottom: solid 1px #ddd;
    cursor: pointer;
}

.more-actions-btn ul li:last-child {
    border: 0;
}

.more-actions-btn ul li:hover {
    background: #f1f1f1;
}

.more-actions-btn.active ul {
    display: block;
}
</style>
<script>
export default {
    name: 'actions',
    data() {
        return {
            active: false,
        };
    },
    computed: {
        cls() {
            return this.active ? 'active' : '';
        },
    },
    methods: {
        activeAction() {
            this.active = !this.active;
        },
        deActiveAll() {
            this.active = false;
        },
    },
};
</script>