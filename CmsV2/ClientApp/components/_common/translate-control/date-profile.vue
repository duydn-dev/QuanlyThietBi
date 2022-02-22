<template>
    <date-label :values="value" mode="edit" v-if="lang && lang != 'vi'" :lang="lang" :isDictSuffixes="isDictSuffixes" v-model="dateValue" />
    <div v-else :class="{'w-100':!isOption && fullWidth}">
        <div class="input-group" v-if="isOption">
            <div style="max-width:55%;">
                <date-picker v-model="date"
                             :key="key"
                             :lang="cusLang"
                             :type="type"
                             :format="cFormat"
                             :time-picker-options="timePickerOptions"
                             :disabled="disabled || lang != 'vi'"
                             input-class="form-control"
                             :use-utc="true" />
            </div>
            <div class="input-group-append" v-if="$route.path.indexOf('translate') == -1 || lang=='vi'">
                <select v-model="ctype" class="form-control">
                    <option value="DD/MM/YYYY">Ngày/Tháng/Năm</option>
                    <option value="DD-MM-YYYY">Ngày-Tháng-Năm</option>
                    <option value="DD,MM,YYYY">Ngày,Tháng,Năm</option>
                    <option value="MM/YYYY">Tháng/Năm</option>
                    <option value="MM-YYYY">Tháng-Năm</option>
                    <option value="MM,YYYY">Tháng,Năm</option>
                    <option value="YYYY">Năm</option>
                </select>
            </div>
        </div>
        <date-picker style="width:100%;" v-else
                     v-model="date"
                     :lang="cusLang"
                     :type="type"
                     :format="format"
                     :range="range"
                     :confirm="range"
                     :time-picker-options="timePickerOptions"
                     :disabled="disabled || lang != 'vi'"
                     input-class="form-control"
                     :use-utc="true" />
    </div>
</template>
<style>
    .input-group .mx-datepicker {
        width: auto;
    }
</style>
<script>
    import DatePicker from 'vue2-datepicker';
    import moment from 'moment';
    export default {
        name: 'DateProfile',
        components: {
            DatePicker
        },
        props: {
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
                default: true
            },
            isDictSuffixes: {
                type: Boolean,
                default: true,
            },
        },
        data() {
            return {
                type: 'date',
                date: this.value,
                dateValue: '',
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
                ctype: 'DD-MM-YYYY',
                key: 1,
                isTrans: false,
                isWatch: false
            };
        },
        computed: {

        },
        watch: {
            dateValue(val) {
                this.$emit('input', val);
            },
            date(val) {
                if (this.lang == 'vi') {
                    if (!val)
                        this.$emit('input', '');
                    else {
                        let a;
                        if (this.isWatch) {
                            if (this.isOption) {
                                a = moment(val, this.cFormat).format(this.cFormat);
                            }
                            else {
                                a = moment(val, this.cFormat).format();
                            }
                        }
                        else {
                            this.isWatch = true;
                            if (this.isOption) {
                                //this.date = moment(this.date, this.cFormat).format();
                                //a = moment(val, this.cFormat).format(this.cFormat)
                                a = this.date;
                            }
                            else {
                                a = moment(val).format();
                            }
                        }
                        if (a && a != 'Invalid date') {
                            this.$emit('input', a);
                        }
                    }
                }

            },
            ctype(val) {
                if (this.lang == 'vi') {
                    if (val == 'DD-MM-YYYY') { this.cFormat = 'DD-MM-YYYY'; this.type = 'date'; }
                    else if (val == 'DD/MM/YYYY') { this.cFormat = 'DD/MM/YYYY'; this.type = 'date'; }
                    else if (val == 'DD,MM,YYYY') { this.cFormat = 'DD,MM,YYYY'; this.type = 'date'; }
                    else if (val == 'MM-YYYY') { this.cFormat = 'MM-YYYY'; this.type = 'month'; }
                    else if (val == 'MM,YYYY') { this.cFormat = 'MM,YYYY'; this.type = 'month'; }
                    else if (val == 'MM/YYYY') {
                        this.cFormat = 'MM/YYYY';
                        this.type = 'month';
                    }
                    else if (val == 'YYYY') { this.cFormat = 'YYYY'; this.type = 'year'; }
                    else { this.cFormat = 'DD-MM-YYYY'; this.type = 'date'; }
                    this.cusLang.placeholder.date = this.cFormat;
                    this.key++;
                    if (this.date) {
                        let a;
                        if (this.isOption) {
                            a = moment(this.date).format(this.cFormat);
                        }
                        else {
                            a = moment(this.date).format(this.cFormat);
                        }

                        if (a && a != 'Invalid date') {
                            this.$emit('input', a);
                        }

                    }

                    this.$emit("typeChange", this.ctype);
                }
            }
        },
        methods: {
            init() {
                if (this.value) {
                    if (!this.value.includes('T') && !this.value.includes(':')) {
                        if (!this.isOption) {
                            this.cFormat = this.format;
                            this.date = this.value;
                        } else {
                            if (this.value) {
                                if ((this.value + '').lastIndexOf('-') == -1 && (this.value + '').lastIndexOf('/') == -1 && (this.value + '').lastIndexOf(',') == -1) {
                                    this.ctype = 'YYYY';
                                    this.date = this.value;
                                    this.cFormat = 'YYYY';
                                } else if (this.value.split('-').length == 2) {
                                    this.ctype = 'MM-YYYY';
                                    this.date = `${this.formatNumber(this.value.split('-')[0])}-${this.value.split('-')[1]}`;
                                    this.cFormat = 'MM-YYYY';
                                }
                                else if (this.value.split('/').length == 2) {
                                    this.ctype = 'MM/YYYY';
                                    this.date = `${this.formatNumber(this.value.split('/')[0])}/${this.value.split('/')[1]}`;
                                    this.cFormat = 'MM/YYYY';
                                }
                                else if (this.value.split(',').length == 2) {
                                    this.ctype = 'MM,YYYY';
                                    this.date = `${this.formatNumber(this.value.split(',')[0])},${this.value.split(',')[1]}`;
                                    this.cFormat = 'MM,YYYY';
                                }
                                else if (this.value.split('/').length == 3) {

                                    this.ctype = 'DD/MM/YYYY';
                                    this.date = `${this.formatNumber(this.value.split('/')[0])}/${this.formatNumber(this.value.split('/')[1])}/${this.value.split('/')[2]}`;
                                    this.cFormat = 'DD/MM/YYYY';

                                }
                                else if (this.value.split(',').length == 3) {

                                    this.ctype = 'DD,MM,YYYY';
                                    this.date = `${this.formatNumber(this.value.split(',')[0])},${this.formatNumber(this.value.split(',')[1])},${this.value.split(',')[2]}`;
                                    this.cFormat = 'DD,MM,YYYY';

                                }
                                else {
                                    this.ctype = 'DD-MM-YYYY';
                                    this.cFormat = 'DD-MM-YYYY';
                                    this.date = `${this.formatNumber(this.value.split('-')[0])}-${this.formatNumber(this.value.split('-')[1])}-${this.value.split('-')[2]}`;
                                }
                                this.date = moment(this.date, this.cFormat).format();
                            }
                        }
                       
                    }
                    else {
                        //if (this.value.split('/').length == 3) {

                        //    this.ctype = 'DD/MM/YYYY';
                        //    this.cFormat = 'DD/MM/YYYY';

                        //}
                        //else if (this.value.split(',').length == 3) {

                        //    this.ctype = 'DD,MM,YYYY';
                        //    this.cFormat = 'DD,MM,YYYY';

                        //}
                        //else {

                            this.ctype = 'DD-MM-YYYY';
                            this.cFormat = 'DD-MM-YYYY';
                        //}
                       
                        this.date = this.value;
                        this.isWatch = true;
                        //this.date = moment(this.date, this.cFormat).format();
                      
                    }
                    
                    this.cusLang.placeholder.date = this.cFormat;
                    if (this.placeHolder) {
                        this.cusLang.placeholder.date = this.placeHolder;
                        this.cusLang.placeholder.dateRange = this.placeHolder;
                    }
                    this.key++;
                }
                else {
                    this.isWatch = true;
                }
            },
            showDateByTimeZone(d, offset) {
                if (typeof (d) === 'string') {
                    d = new Date(d);
                }
                var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
                var nd = new Date(utc + (3600000 * offset));
                return nd;
            },
            getCurrentTimeZone() {
                let curdate = new Date();
                let offset = curdate.getTimezoneOffset();
                return (offset * -1);
            },
            formatNumber(value) {
                var number = parseInt(value);
                if (Number(number) < 10) {
                    return value;
                }
                return value;
            }
        },
        created() {
          
            this.init();
        }
    };
</script>
