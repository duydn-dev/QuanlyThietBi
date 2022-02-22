<template>
    <div name="ComplexTable" class="-complex-table" v-if="(rows && headers)||debug">
        <template v-for="x in ['Header', 'Body']">
            <div
                ref="wrappers"
                :name="`Table${x}Wrapper`"
                :class="`-table-${x.toLowerCase()}`"
                :style="[
          x !== 'Header' && { marginTop: `-${scrollWidth}px` },
          x === 'Body' && tableStyle
        ]"
                :key="x"
            >
                <div :name="`NormalTable${x}`">
                    <table
                        class="table table-striped table-hover table-bordered"
                        style="margin-bottom: 0px; table-layout: fixed;"
                    >
                        <colgroup>
                            <template v-for="header in headers">
                                <col
                                    v-if="typeof $scopedSlots[header.text.toLowerCase()] !== 'undefined'"
                                    :style="{width:header.width+'px'}"
                                    :key="`normalCol${header.text}`"
                                />
                            </template>
                        </colgroup>
                        <thead v-if="x=='Header'">
                            <tr>
                                <template v-for="(header) in headers">
                                    <th
                                        v-if="typeof $scopedSlots[header.text.toLowerCase()] !== 'undefined'"
                                        :key="`xxxnormalText${header.text}`"
                                    >{{header.text}}</th>
                                </template>
                            </tr>
                        </thead>
                        <tbody v-else>
                            <tr
                                v-for="(row, rowIndex) in rows"
                                :key="`scroll-table-part-row-${rowIndex}`"
                                :style="rowStyle"
                            >
                                <template v-for="(header, i) in headers">
                                    <td
                                        v-if="typeof $scopedSlots[header.text.toLowerCase()] !== 'undefined'"
                                        :key="`main-data-${rowIndex}${i}`"
                                    >
                                        <slot
                                            :name="header.text.toLowerCase()"
                                            :header="header"
                                            :index="rowIndex"
                                            :indexCol="i"
                                            :data="row"
                                            :row="row"
                                        ></slot>
                                    </td>
                                    <!--<td v-else :key="`main-data-${rowIndex}${i}`">
                                        n/a
                                    </td>-->
                                </template>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div
                    v-if="leftFixedColumns.length && isNeedScroll"
                    :name="`LeftFixedTable${x}`"
                    class="-left-fixed -fixed-table"
                    :style="{ left: `${offsetLeft}px`, width:`${widthLeft}px` }"
                >
                    <table
                        class="table table-striped table-hover table-bordered"
                        style="margin-bottom: 0px; table-layout: fixed;"
                    >
                        <colgroup>
                            <col
                                v-for="col in leftFixedColumns"
                                :style="{width:col.width+'px'}"
                                :key="`leftCol${col.text}`"
                            />
                        </colgroup>
                        <thead v-if="x=='Header'">
                            <tr>
                                <th
                                    v-for="col in leftFixedColumns"
                                    :key="`leftText${col.text}`"
                                >{{col.text}}</th>
                            </tr>
                        </thead>
                        <tbody v-else>
                            <tr
                                v-for="(row, rowIndex) in rows"
                                :key="`left-data-${rowIndex}`"
                                :style="rowStyle"
                            >
                                <template v-for="(header, i) in leftFixedColumns">
                                    <td
                                        v-if="typeof $scopedSlots[header.text.toLowerCase()] !== 'undefined'"
                                        :key="`left-data-${rowIndex}${i}`"
                                    >
                                        <slot
                                            :name="header.text.toLowerCase()"
                                            :header="header"
                                            :index="rowIndex"
                                            :indexCol="i"
                                            :data="row"
                                            :row="row"
                                        ></slot>
                                    </td>
                                    <td v-else :key="`left-data-${rowIndex}${i}`">n/a</td>
                                </template>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div
                    v-if="rightFixedColumns.length && isNeedScroll"
                    :name="`RightFixedTable${x}`"
                    class="-right-fixed -fixed-table"
                    :style="{ right: `-${offsetLeft}px` }"
                >
                    <table
                        class="table table-striped table-hover table-bordered"
                        style="margin-bottom: 0px; table-layout: fixed;"
                    >
                        <colgroup>
                            <col
                                v-for="col in rightFixedColumns"
                                :style="{width:col.width+'px'}"
                                :key="`rightCol${col.text}`"
                            />
                        </colgroup>
                        <thead v-if="x=='Header'">
                            <tr>
                                <th
                                    v-for="col in rightFixedColumns"
                                    :key="`rightText${col.text}`"
                                >{{col.text}}</th>
                            </tr>
                        </thead>
                        <tbody v-else>
                            <tr
                                v-for="(row, rowIndex) in rows"
                                :key="`right-data-${rowIndex}`"
                                :style="rowStyle"
                            >
                                <template v-for="(header, i) in rightFixedColumns">
                                    <td
                                        v-if="typeof $scopedSlots[header.text.toLowerCase()] !== 'undefined'"
                                        :key="`right-data-${rowIndex}${i}`"
                                    >
                                        <slot
                                            :name="header.text.toLowerCase()"
                                            :header="header"
                                            :index="rowIndex"
                                            :indexCol="i"
                                            :data="row"
                                            :row="row"
                                        ></slot>
                                    </td>
                                    <td v-else :key="`right-data-${rowIndex}${i}`">n/a</td>
                                </template>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </template>
        <modal
            title="Convert table to scroll-table"
            :width="1000"
            v-if="debug"
            @close="debug=false"
        >
            <div slot="body">
                <textarea
                    class="form-control"
                    placeholder="Copy tất cả mã html của table cũ vào đây"
                    style="height:200px !important"
                    ref="inputHtml"
                ></textarea>
                <button class="btn btn-success pd-3" @click="convertHtml">Convert</button>
                <textarea
                    class="form-control"
                    placeholder="Output data here"
                    style="height:200px !important"
                    ref="outputData"
                ></textarea>
                <textarea
                    class="form-control"
                    placeholder="Output html here"
                    style="height:200px !important"
                    ref="outputHtml"
                ></textarea>
            </div>
        </modal>
    </div>
</template>

<script>
(function ($) {
    $.fn.outerHTML = function () {
        return $(this).clone().wrap('<div></div>').parent().html();
    };
})(jQuery);

import syncScroll from './_utils/syncScroll';
import getScrollWidth from './_utils/getScrollWidth';
export default {
    name: 'scroll-table',
    props: {
        headers: {
            default() {
                return [];
            },
            //required: true
        },
        rows: {
            //required: true
        },
        rowStyle: {
            default() {
                return { height: '70px' };
            },
        },
        tableStyle: {
            default() {
                return {
                    maxHeight: '500px',
                };
            },
        },
        debug: {
            type: Boolean,
            default() {
                return false;
            },
        },
        isCheckNeedScroll: {
            type: Boolean,
            default() {
                return true;
            },
        },
    },
    data() {
        return {
            offsetLeft: 0,
            scrollWidth: getScrollWidth(),
            isNeedScroll: false,
        };
    },
    mounted() {
        setTimeout(() => {
            if (this.rows && this.headers)
                syncScroll(this.$refs.wrappers, (offsetLeft) => {
                    this.offsetLeft = offsetLeft;
                });
        }, 500);

        window.addEventListener('resize', this.checkIsNeedScroll);
    },
    computed: {
        displayTable() {
            return window.location.href.lastIndexOf('localhost:1992') != -1;
        },
        leftFixedColumns() {
            return this._.filter(this.headers, (item) => {
                return item.fixed == 'left';
            });
        },
        rightFixedColumns() {
            return this._.filter(this.headers, (item) => {
                return item.fixed == 'right';
            });
        },
        widthLeft() {
            let w = 0;
            this._.each(this.leftFixedColumns, (item) => {
                w += item.width;
            });
            return w;
        },
    },
    methods: {
        getCellDisplayValue(cellData) {
            if (typeof cellData === 'object') {
                if (Object.keys(cellData).includes('value')) {
                    return cellData.value;
                }
                return JSON.stringify(cellData);
            }

            return cellData;
        },
        checkIsNeedScroll() {
            if (this.isCheckNeedScroll && !this.isMobile && !this.isIOS) {
                let needScr = false;
                if (this.$refs.wrappers) {
                    this.$refs.wrappers.map((me) => {
                        needScr = me.scrollWidth > me.clientWidth;
                    });
                    this.isNeedScroll = needScr;
                }
            }
            return false;
        },
        convertHtml() {
            let inputElm = $(this.$refs.inputHtml);
            let outputElm = $(this.$refs.outputHtml);
            let outputDataElm = $(this.$refs.outputData);

            let $temp = $('<div/>').html(inputElm.val());

            let $th = $('thead th', $temp);
            let _headers = [];
            let k = 0;
            let newHtml = [];
            $('tbody td', $temp).replaceWith(function () {
                var replacement = $('<div>').html($(this).html());
                for (var i = 0; i < this.attributes.length; i++) {
                    replacement.attr(this.attributes[i].name, this.attributes[i].value);
                }
                return replacement;
            });

            newHtml.push('<scroll-table :headers="headers" :rows="rows">');
            $th.each(function () {
                let txt = $(this).text().trim();
                if (!txt) txt = 'col-' + k;
                if (k < 3) {
                    _headers.push({
                        text: txt,
                        fixed: 'left',
                        width: 150,
                    });
                } else {
                    _headers.push({
                        text: txt,
                        width: 150,
                    });
                }

                let html = $('div:eq(' + k + ')', $temp).outerHTML();
                html =
                    '<template slot="' +
                    txt.toLowerCase() +
                    '" slot-scope="{data}">' +
                    html.replace(/item./g, 'data.') +
                    '</template>';
                newHtml.push(html);
                k++;
            });
            newHtml.push('</scroll-table>');
            outputDataElm.val(JSON.stringify(_headers));
            outputElm.val(newHtml.join(''));
        },
    },
    created() {
        setTimeout(() => {
            this.checkIsNeedScroll();
        }, 500);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.checkIsNeedScroll);
    },
};
</script>
<style>
.-complex-table th,
.-complex-table td {
    vertical-align: middle;
}

.-complex-table th {
    white-space: nowrap;
}

.-complex-table {
    position: relative;
}

.-complex-table table {
    background: #fff;
    table-layout: fixed;
}

.-table-header,
.-table-body,
.-table-footer {
    position: relative;
    overflow: scroll;
}

.-fixed-table {
    position: absolute;
    top: 0;
}

.-fixed-table table {
    width: auto;
}

.-left-fixed {
    box-shadow: 1px 0 5px #ddd;
}

.-right-fixed {
    box-shadow: 1px 0 5px #ddd;
}

.-complex-table th {
    font-weight: bold !important;
    color: #646c9a;
}
.-table-header::-webkit-scrollbar {
    -webkit-appearance: none; /*width: 0; height: 0;*/
}
</style>