<template>
    <div v-if="total > 0">
        <div class="detail-show">
              <p>                  
                  Hiển thị <b>{{ pageIndex * pageSize - pageSize + 1 }}</b> -
                              <b>{{ (pageIndex * itemCount) > total ? total : (pageIndex * itemCount) }}</b> trong tổng <b>{{ total }}</b>
              </p>
        </div>
        <div class="pagination d-flex" v-if="showPager && total > pageSize">
            <!-- <a
                title="Trang đầu"
                :class="{
                    'kt-datatable__pager-link--disabled disabled': pageIndex <= 1
                }"
                class="kt-datatable__pager-link kt-datatable__pager-link--first"
                @click="changePage(1)"
                >Trang đầu</a> -->
            <a href="javascript:void(0)" class="preview-page item-arrow"
            :class="{'disabled':pageIndex<=1}"
                v-if="showNextPrev" 
                @click="changePage(pageIndex - 1)"
            >
                <i class="bi bi-chevron-left"></i>
                <span>Trang trước</span>
            </a>
            <!-- Thêm class is-active vào tag a khi trang đó được chọn -->
            
            <template v-if="showNumber">
                <a  v-for="(item, index) in items"
                        :key="index"
                        :class="{'is-active disabled': pageIndex === item.value}"
                        @click="changePage(item.value)"
                        href="javascript:;">
                    {{ item.text }}
                    
                </a>
            </template>

            <a href="javascript:void(0)" class="next-page item-arrow item-arrow" 
                v-if="showNextPrev" 
                @click="changePage(pageIndex + 1)"
                :class="{
                    'disabled': pageIndex >= totalPage
                }"
            >
                <span>Trang tiếp</span>
                <i class="bi bi-chevron-right"></i>
            </a>
            <!-- <a
                title="Trang cuối"
                :class="{
                    'disabled': pageIndex >= totalPage
                }"
                class="kt-datatable__pager-link kt-datatable__pager-link--last"
                @click="changePage(totalPage)"
                >Trang cuối</a> -->
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
