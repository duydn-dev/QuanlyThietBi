<template>
    <span v-if="objectType ==1">Học viên</span>
    <span v-else-if="objectType ==2">Cộng tác viên</span>
    <span v-else-if="objectType ==3">Trường học</span>
    <span v-else-if="objectType ==4">Nghiệp đoàn</span>
    <span v-else-if="objectType ==5">Công ty</span>
    <span v-else-if="objectType ==7">Nhân viên</span>
</template>

<script>
export default {
    props: ['objectType']
};
</script>

<style>
</style>