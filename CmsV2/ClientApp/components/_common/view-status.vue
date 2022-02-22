<template>
    <div>
        <td
            v-if="!isNotTable"
            v-b-tooltip.hover
            v-b-tooltip="{ placement: 'right', variant: 'danger', delay: 500, html: true }"
            class="cursor-pointer"
            :title="tooltipShowStatusMember"
            @mouseover="viewStatus(listStatus)"
        >
            <template class="cursor-pointer text-center" v-if="listStatus && listStatus.length > 0">
                <span style="font-size:14px;">{{listStatus[0].title}}</span>
            </template>
            <template class="cursor-pointer text-center" v-else>
                <span style="font-size:13px;">---</span>
            </template>
        </td>
        <div
            v-else
            v-b-tooltip.hover
            v-b-tooltip="{ placement: 'right', variant: 'danger', delay: 500, html: true }"
            class="cursor-pointer"
            :title="tooltipShowStatusMember"
            @mouseover="viewStatus(listStatus)"
        >
            <template class="cursor-pointer text-center" v-if="listStatus && listStatus.length > 0">
                <span style="font-size:14px;">{{listStatus[0].title}}</span>
            </template>
            <template class="cursor-pointer text-center" v-else>
                <span style="font-size:13px;">---</span>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    name: 'view-status',
    props: ['listStatus', 'isNotTable'],
    data() {
        return {
            tooltipShowStatusMember: ''
        };
    },
    methods: {
        viewStatus(list) {
            if (list.length != 0) {
                this.tooltipShowStatusMember = `
         <div class="kt-timeline-v3 test">
            <div class="kt-timeline-v3__items">`;

                _.forEach(list, a => {
                    this.tooltipShowStatusMember += `<div class="kt-timeline-v3__item kt-timeline-v3__item--info">
<span class="kt-timeline-v3__item-time mr-4" style="font-size:14px;"> ${a.statusDate}</span>
<div class="kt-timeline-v3__item-desc text-left"><span class="kt-timeline-v3__item-text ">${a.titleParent} : <b>${a.title}</b></span> </div>
</div>`;
                });

                this.tooltipShowStatusMember += `</div>
        </div>`;
            } else {
                this.tooltipShowStatusMember = 'Chưa có trạng thái';
            }
        }
    },
    created() {}
};
</script>