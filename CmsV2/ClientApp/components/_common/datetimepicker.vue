<template>
  <!--<input v-if="isTrans" type="text" class="form-control" v-model="dateValue" />-->
  <date-label
    :values="value"
    mode="edit"
    v-if="lang && lang != 'vi'"
    :lang="lang"
    v-model="dateValue"
    :type="type"
  />
  <div
    v-else
    :class="{'w-100':!isOption && fullWidth, 'is-disable-todate': disabled}"
  >
    <div
      class="input-group"
      v-if="isOption"
    >
      <date-picker
        v-model="date"
        :key="key"
        :lang="cusLang"
        :type="ctype"
        :value-type="formatValue"
        :format="cFormat"
        :time-picker-options="timePickerOptions"
        :disabled="disabled || lang != 'vi'"
        input-class="form-control txt-ipt"
        :range="range"
        :confirm="range"
        :disabled-date="disabledDate"
        :use-utc="true"
        :placeholder="placeHolder"
        :shortcuts="isShortcut?shortcuts:[]"
        @change="change"
        ref="datePickerWithOption"
      />
      <!-- :shortcuts="shortcuts" -->
      <div
        class="input-group-append"
        v-if="$route.path.indexOf('translate') == -1 || lang=='vi'"
      >
        <select
          v-model="ctype"
          class="form-control txt-ipt"
        >
          <option value="date">Ngày tháng năm</option>
          <option value="month">Tháng năm</option>
          <option value="year">Năm</option>
        </select>
      </div>
    </div>
    <date-picker
      style="width:100%;"
      v-else
      v-model="date"
      :lang="cusLang"
      :type="type"
      :format="format"
      :range="range"
      :confirm="range"
      :time-picker-options="timePickerOptions"
      :disabled="disabled || lang != 'vi'"
      input-class="form-control txt-ipt"
      :use-utc="true"
      :disabled-date="disabledDate"
      :value-type="formatValue"
      :placeholder="placeHolder"
      :shortcuts="isShortcut?shortcuts:[]"
      @change="change"
    />
    <!-- :shortcuts="shortcuts" -->
  </div>
</template>
<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/vi';
import moment from 'moment';
export default {
    name: 'Datetimepicker',
    components: {
        DatePicker
    },
    props: {
        type: {
            type: String,
            default: 'date' //date/time/datetime
        },        
        value: {
            default: null
        },
        fullWidth: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        lang: {
            type: String,
            default: 'vi'
        },
        isOption: {
            type: Boolean,
            default: false
        },
        range: {
            type: Boolean,
            default: false
        },
        isRangeMonth: {
            type: Boolean,
            default: false
        },
        placeHolder: {
            type: String,
            default: '' //date/time/datetime
        },
        dayOnly: {
            type: Number,
            default: -1
        },
        isShortcut:{
            type: Boolean,
            default: false
        }, 
        shortcuts:{
            type: Array, 
            default:()=>[
                // {
                //     text: 'Hôm nay',
                //     onClick: () => {
                //         this.date = [new Date(), new Date()];
                //     }
                // },
                // {
                //     text: 'Hôm qua',
                //     onClick: () => {
                //         let dt = new Date();
                //         dt.setDate(dt.getDate() - 1);
                //         this.date = [dt, new Date()];
                //     }
                // },
                {
                    text: '7 ngày trước',
                    onClick: () => {
                        //alert('1');
                        let dt = new Date();
                        dt.setDate(dt.getDate() - 7);
                        const date = [dt, new Date()];
                        return date;
                    }
                },
                {
                    text: '30 ngày trước',
                    onClick: () => {
                        let dt = new Date();
                        dt.setDate(dt.getDate() - 30);
                        return [dt, new Date()];
                    }
                },
                {
                    text: 'Tuần này',
                    onClick: () => {
                        let curr = new Date(); // get current date
                        let first = curr.getDate() - curr.getDay()+1; 
                        var firstday = new Date(curr.setDate(first))
                        return [firstday, new Date()];
                    }
                },
                {
                    text: 'Tuần trước',
                    onClick: () => {
                        let curr = new Date(); // get current date
                        let last = curr.getDate() - curr.getDay(); 
                        let first = last - 6; 
                        let firstday = new Date(curr.setDate(first));
                        curr = new Date(); 
                        let lastday = new Date(curr.setDate(last));
                        return [firstday, lastday];
                    }
                },
                {
                    text: 'Tháng này',
                    onClick: () => {
                        let date = new Date();
                        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);//ngày đầu tiên tháng này
                        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                        return [firstDay, lastDay];
                    }
                },
                {
                    text: 'Tháng trước',
                    onClick: () => {
                        let date = new Date();
                        let firstCurDay = new Date(date.getFullYear(), date.getMonth(), 1);//ngày đầu tiên tháng này
                        let last=firstCurDay.getDate()-1;
                        let lastDay = new Date(firstCurDay.setDate(last));//ngày cuối cùng tháng trước
                        let firstDay =new Date(lastDay.getFullYear(), lastDay.getMonth(), 1);
                        return [firstDay, lastDay];
                    }
                }
            ]
        },
        disabledBefore:{
            type: String,
            default: null
        },
        disabledAfter:{
            type: String,
            default: null
        }
    },
    data() {
        return {
            date: this.value,
            dateValue: '',
            dateInput: '',
            cusLang: {
                days: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
                months: [
                    'Tháng 1',
                    'Tháng 2',
                    'Tháng 3',
                    'Tháng 4',
                    'Tháng 5',
                    'Tháng 6',
                    'Tháng 7',
                    'Tháng 8',
                    'Tháng 9',
                    'Tháng 10',
                    'Tháng 11',
                    'Tháng 12'
                ],
                pickers: ['tiến 7 ngày', 'tiến 30 ngày', 'lùi 7 ngày', 'lùi 30 ngày'],
                placeholder: {
                    date: 'Chọn ngày',
                    dateRange: this.placeHolder || 'Chọn khoảng thời gian'
                }
            },            
            timePickerOptions: {
                start: '00:00',
                step: '00:15',
                end: '23:45'
            },
            cFormat: 'DD-MM-YYYY',
            ctype: 'date',
            key: 1,
            isTrans: false
        };
    },
    computed: {
        format() {
            if (this.type == 'date') return 'DD-MM-YYYY';
            else if (this.type == 'datetime') return 'DD-MM-YYYY HH:mm';
            else if (this.type == 'time') return 'HH:mm';
            else if (this.type == 'month') return 'MM-YYYY';
            else if (this.type == 'year') return 'YYYY';
            return 'DD-MM-YYYY';
        },
        formatValue() {
            if (this.type == 'date') return 'YYYY-MM-DD';
            else if (this.type == 'datetime') return 'YYYY-MM-DDTHH:mm:ss';
            else if (this.type == 'time') return 'HH:mm';
            else if (this.type == 'month') return 'MM-YYYY';
            else if (this.type == 'year') return 'YYYY';
            return 'YYYY-MM-DD';
        }
    },     
    watch: {
        //value() {
        //    this.created();
        //},
        dateValue(val) {
            this.$emit('input', val);
        },
        date(val) {
            //console.log('val=>',val);
            if (!val) this.$emit('input', '');
            else {
                if (val && val.length == 2) {
                    if (val[0] && val[1]) {
                        let temp = {
                            fromDate: val[0],
                            toDate: val[1]
                        };
                        this.$emit('input', temp);
                    } else this.$emit('input', '');
                } else this.$emit('input', val);
                // let a;
                // if (this.ctype != 'date' && this.isOption) {
                //     a = moment(val, this.cFormat).format(this.cFormat);
                // } else if (val && val.length == 2) {
                //     if (val[0] && val[1]) {
                //         a = {
                //             fromDate: moment(val[0], this.cFormat).format(),
                //             toDate: moment(val[1], this.cFormat).format()
                //         };
                //     } else this.$emit('input', '');
                // } else {
                //     a = moment(val, this.cFormat).format();
                // }
                // if (this.isRangeMonth) {
                //     if (this.date[0] && this.date[1]) {
                //         a = {
                //             fromDate: moment(this.date[0], this.cFormat).format(this.cFormat),
                //             toDate: moment(this.date[1], this.cFormat).format(this.cFormat)
                //         };
                //     }
                // }
                // if (a && a != 'Invalid date') {
                //     //if (this.getCurrentTimeZone() != 7)
                //     //    a = a.replace(a.substring(a.length - 6), '+07:00');
                //     this.$emit('input', a);
                // } else if (this.lang != 'vi') this.$emit('input', val);
            }
        },
        ctype(val) {
            if (val == 'date') this.cFormat = 'DD-MM-YYYY';
            else if (val == 'datetime') this.cFormat = 'DD-MM-YYYY HH:mm';
            else if (val == 'time') this.cFormat = 'HH:mm';
            else if (val == 'month') this.cFormat = 'MM-YYYY';
            else if (val == 'year') this.cFormat = 'YYYY';
            else this.cFormat = 'DD-MM-YYYY';
            this.cusLang.placeholder.date = this.cFormat;
            this.key++;
            if (this.date) {
                let a;
                if (val != 'date') {
                    a = moment(this.date).format(this.cFormat);
                } else if (this.date && this.date.length == 2) {
                    if (this.date[0] && this.date[1]) {
                        a = {
                            fromDate: moment(this.date[0], this.cFormat).format(this.cFormat),
                            toDate: moment(this.date[1], this.cFormat).format(this.cFormat)
                        };
                    }
                } else {
                    a = moment(this.date).format();
                }
                if (this.isRangeMonth) {
                    if (this.date[0] && this.date[1]) {
                        a = {
                            fromDate: moment(this.date[0], this.cFormat).format(this.cFormat),
                            toDate: moment(this.date[1], this.cFormat).format(this.cFormat)
                        };
                    }
                }
                if (a && a != 'Invalid date') {
                    this.$emit('input', a);
                } else this.$emit('input', '');
            }

            this.$emit('typeChange', this.ctype);
        }
    },
    methods: {
        init() {
            this.dateInput = this.value;
            if (!this.isOption) {
                this.cFormat = this.format;
                if (this.value && this.value.length == 2) {
                    this.date = [
                        this.value[0],
                        this.value[1]
                        // moment(this.value[0], this.cFormat),
                        // moment(this.value[1], this.cFormat)
                    ];
                } else this.date = this.value;
            } else {
                if (this.value) {
                    if (this.value.lastIndexOf('-') == -1) {
                        this.ctype = 'year';
                        this.date = '01-01-' + this.value;
                    } else if (this.value.lastIndexOf('-') <= 2) {
                        this.ctype = 'month';
                        this.date = `${this.value.split('-')[0]}-20-${this.value.split('-')[1]}`;
                    } else {
                        this.ctype = 'date';
                        console.log();
                        this.date = this.value;
                    }

                    if (this.type && this.type != 'date') this.ctype = this.type;
                }
            }
            this.cusLang.placeholder.date = this.cFormat;
            if (this.lang != 'vi' && new Date(this.date) == 'Invalid date') this.isTrans = true;

            if (this.placeHolder) {
                this.cusLang.placeholder.date = this.placeHolder;
                this.cusLang.placeholder.dateRange = this.placeHolder;
            }
        },
        showDateByTimeZone(d, offset) {
            if (typeof d === 'string') {
                d = new Date(d);
            }
            var utc = d.getTime() + d.getTimezoneOffset() * 60000;
            var nd = new Date(utc + 3600000 * offset);
            return nd;
        },
        getCurrentTimeZone() {
            let curdate = new Date();
            let offset = curdate.getTimezoneOffset();
            return offset * -1;
        },
        disabledDate(date) {
            if(this.disabledBefore && this.disabledAfter){
                const fromDate = new Date(this.disabledBefore);
                const toDate = new Date(this.disabledAfter);
                return date < fromDate || date > toDate;
            }
            if (this.dayOnly == -1) return false;
            return date.getDay() != this.dayOnly;
        },
        change(){
            this.$emit('change', this.date);
        }
    },
    created() {
        //console.log("this.date",this.date);
        this.init();
    }
};
</script>
