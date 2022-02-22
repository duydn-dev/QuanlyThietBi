<template>
    <div>
        <div class="box-head">
            <strong class="txt-head">Nội dung báo cáo chỉ số</strong>
        </div>
        <div class="box-ct">
            <ul class="dti-lst-ct dti-lst-report d-flex align-items-center justify-content-center">
                <li>
                    <strong class="txt-tit">Chính quyền số</strong>
                    <div class="txt-link d-flex flex-column">
                        <router-link to="/reports/detail"><i class="bi bi-eye"></i> Xem số liệu</router-link>
                        <router-link to="/reports/input-data"><i class="bi bi-clipboard-plus"></i> Nhập số liệu</router-link>
                    </div>
                </li>
                <li>
                    <strong class="txt-tit">Kinh tế số</strong>
                    <div class="txt-link d-flex flex-column">
                        <router-link to="/reports/detail"><i class="bi bi-eye"></i> Xem số liệu</router-link>
                        <router-link to="/reports/input-data"><i class="bi bi-clipboard-plus"></i> Nhập số liệu</router-link>
                    </div>
                </li>
                <li>
                    <strong class="txt-tit">Xã hội số</strong>
                    <div class="txt-link d-flex flex-column">
                        <router-link to="/reports/detail"><i class="bi bi-eye"></i> Xem số liệu</router-link>
                        <router-link to="/reports/input-data"><i class="bi bi-clipboard-plus"></i> Nhập số liệu</router-link>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ReportIndex',
    };
</script>