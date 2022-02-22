<template>
    <div class="kt-datatable kt-datatable--default m-0">
        <div v-if="total > 0" class="kt-datatable__pager kt-datatable--paging-loaded pl-0 pr-0">
            <ul v-if="showPager && total > pageSize" class="kt-datatable__pager-nav">
                <li>
                    <a
                        title="Trang đầu"
                        :class="{
                            'kt-datatable__pager-link--disabled disabled': pageIndex <= 1
                        }"
                        class="kt-datatable__pager-link kt-datatable__pager-link--first"
                        @click="changePage(1)"
                        ><i class="flaticon2-fast-back"
                    /></a>
                </li>
                <li v-if="showNextPrev">
                    <a :class="prevCls" href="javascript:;" @click="changePage(pageIndex - 1)"
                        ><i class="fas fa-chevron-left"
                    /></a>
                </li>
                <template v-if="showNumber">
                    <li
                        v-for="(item, index) in items"
                        :key="index"
                        :class="{
                            'page-item': true,
                            'kt-datatable__pager-link--active': pageIndex === item.value
                        }"
                    >
                        <a
                            class="kt-datatable__pager-link kt-datatable__pager-link-number"
                            :class="{ disabled: pageIndex == item.value }"
                            href="javascript:;"
                            @click="changePage(item.value)"
                            >{{ item.text }}</a
                        >
                    </li>
                </template>
                <li v-if="showNextPrev">
                    <a :class="nextCls" href="javascript:;" @click="changePage(pageIndex + 1)"
                        ><i class="fas fa-chevron-right"
                    /></a>
                </li>
                <li>
                    <a
                        title="Trang cuối"
                        :class="{
                            'kt-datatable__pager-link--disabled disabled': pageIndex >= totalPage
                        }"
                        class="kt-datatable__pager-link kt-datatable__pager-link--last"
                        @click="changePage(totalPage)"
                        ><i class="flaticon2-fast-next"
                    /></a>
                </li>
            </ul>
            <ul v-else class="kt-datatable__pager-nav" />
            <div class="kt-datatable__pager-info">
                <span class="kt-datatable__pager-detail"
                    >Hiển thị <b>{{ pageIndex * pageSize - pageSize + 1 }}</b> -
                              <b>{{ (pageIndex * itemCount) > total ? total : (pageIndex * itemCount) }}</b> trong tổng <b>{{ total }}</b></span
                >
            </div>
        </div>
    </div>
</template>
<style scoped>
.disabled {
    opacity: 0.5;
    pointer-events: none;
}
</style>
<script>
export default {
    name: 'Pager',
    props: {
        total: {
            type: Number,
            default: 0,
            validator: val => val >= 0
        },
        pageIndex: {
            type: Number,
            default: 1,
            validator: val => val >= 1
        },
        pageCount: {
            type: Number,
            default: 7,
            validator(val) {
                return val >= 5 && val <= 21 && val % 2 !== 0;
            }
        },
        pageSize: {
            type: Number,
            default: 20
        },
        showNextPrev: {
            type: Boolean,
            default: true
        },
        showNumber: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        showPager() {
            return this.totalPage > 1;
        },
        itemCount() {
            if (this.pageSize > this.total) return this.total;
            else return this.pageSize;
        },
        prevCls() {
            return (
                'kt-datatable__pager-link kt-datatable__pager-link--prev ' +
                (this.pageIndex <= 1 ? 'kt-datatable__pager-link--disabled disabled' : '')
            );
        },
        nextCls() {
            return (
                'kt-datatable__pager-link kt-datatable__pager-link--next ' +
                (this.pageIndex >= this.totalPage
                    ? 'kt-datatable__pager-link--disabled disabled'
                    : '')
            );
        },
        showPageCount() {
            return this.pageCount - 2;
        },
        totalPage() {
            return Math.ceil(this.total / this.pageSize);
        },
        items() {
            if (this.total === 0) return [];
            const showPageCount = this.showPageCount;
            const arr = [];
            const start = 1;
            const end = this.totalPage;

            if (end <= showPageCount + 2) {
                for (let i = start; i <= end; i++) {
                    arr.push({ text: i, value: i });
                }
                return arr;
            }
            arr.push({ text: start, value: start });
            if (this.pageIndex - start >= showPageCount - 1) {
                const go = this.pageIndex - showPageCount;
                arr.push({
                    text: '...',
                    value: go < 1 ? 1 : go
                });
            }

            let listStart = this.pageIndex - Math.floor(showPageCount / 2);
            if (listStart <= 1) listStart = 2;
            let listEnd = listStart + showPageCount - 1;
            if (listEnd >= end) listEnd = end - 1;
            listStart = listEnd - showPageCount + 1;

            for (let i = listStart; i <= listEnd; i++) {
                arr.push({ text: i, value: i });
            }

            if (end - this.pageIndex >= showPageCount - 1) {
                const go = this.pageIndex + showPageCount;
                arr.push({
                    text: '...',
                    value: go > end ? end : go
                });
            }
            arr.push({ text: end, value: end });
            return arr;
        }
    },
    methods: {
        changePage(page) {
            this.$emit('update:pageIndex', page);
            this.$emit('change', page);
        }
    }
};
</script>
