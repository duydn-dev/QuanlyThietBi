<template>
    <div contenteditable="true" v-if="mode == 'edit'" v-html="label" class="form-control" @input="handleInput">
    </div>
    <span v-else v-html="showLabel"></span>
</template>
<script>
    export default {
        props: {
            values: {
                type: null
            },
            day: {
                type: null
            },
            month: {
                type: null
            },
            year: {
                type: null
            },
            lang: {
                type: String,
                default: 'vi'
            },
            separate: {
                type: null,
                default: 'unit'
            },
            separateJp: {
                type: null,
                default: ''
            },
            isDict: {
                type: Boolean,
                default: false
            },
            mode: {
                type: String,
                default: ''
            },
            ffix: {
                type: String,
                default: ''
            },
            revFix: {
                type: Boolean,
                default: false
            },
            isDefault: {
                type: Boolean,
                default: false
            },
            notSeparate: {
                type: Boolean,
                default: false,
            },
            isDictSuffixes: {
                type: Boolean,
                default: true,
            }
        },
        data() {
            return {
                type: '',
                timeOut: 0,
                label: '',
                showLabel: '',
                spt: 'unit',
                isLoader: false,
                strMonths: {
                    'en': { '01': 'January', '02': 'February', '03': 'March', '04': 'April', '05': 'May', '06': 'June', '07': 'July', '08': 'August', '09': 'September', '1': 'January', '2': 'February', '3': 'March', '4': 'April', '5': 'May', '6': 'June', '7': 'July', '8': 'August', '9': 'September', '10': 'October', '11': 'November', '12': 'December' },
                    'de': { '01': 'January', '02': 'February', '03': 'March', '04': 'April', '05': 'May', '06': 'June', '07': 'July', '08': 'August', '09': 'September', '10': 'October', '11': 'November', '12': 'December' }
                }
            };
        },
        watch: {
            'values'() {
                clearTimeout(this.timeOut);
                this.timeOut = setTimeout(() => {
                    if (this.lang == 'vi')
                        this.ShowDate();
                    else
                        this.showLabel = this.values;

                }, 500)

            },
            //'label'() {
            //    this.showLabel = this.label;
            //    if (this.lang != 'vi')
            //        this.$emit('input', this.label);
            //},
            'day'() {
                if (this.isLoader)
                    this.ShowDate();
            },
            'month'() {
                if (this.isLoader)
                    this.ShowDate();
            }, 'year'() {
                if (this.isLoader)
                    this.ShowDate();
            },
            'ffix'() {
                if (this.isLoader)
                    this.ShowDate();
            }

        },
        methods: {
            handleInput: function (e) {
                this.showLabel = e.target.innerHTML;
                this.$emit('input', this.showLabel);

            },
            ShowDate() {
                this.showLabel = '';
                this.label = '';
                var date = this.values;
                let _day;
                let _month;
                let _year;
                if (date) {
                    var dt;
                    if (!(date + '').includes('T') && !(date + '').includes(':')) {
                      
                        if (this.lang == 'en' && (date + '').includes('<sup>')) {
                          
                            this.type = 'YYYY';
                            _year = date;
                        }
                        else if ((date + '').lastIndexOf('-') == -1 && (date + '').lastIndexOf('/') == -1 && (date + '').lastIndexOf(',') == -1) {
                            this.type = 'YYYY';
                            _year = date;
                        }
                        else if (date.split('-').length == 2) {
                            dt = date.split('-');
                            this.type = 'MM-YYYY';
                            _year = dt[1];
                            _month = dt[0];
                        }
                        else if (date.split('/').length == 2) {
                            dt = date.split('/');
                            this.type = 'MM/YYYY';
                            _year = dt[1];
                            _month = dt[0];
                        }
                        else if (date.split('/').length == 3) {
                            dt = date.split('/')
                            this.type = 'DD/MM/YYYY';
                            _year = dt[2];
                            _month = dt[1];
                            _day = dt[0];

                        }
                        else if (date.split('-').length == 3) {
                            dt = date.split('-');
                            this.type = 'DD-MM-YYYY';
                            _year = dt[2];
                            _month = dt[1];
                            _day = dt[0];
                        }
                        else {
                            dt = date.split(',');
                            this.type = 'DD,MM,YYYY';
                            _year = dt[2];
                            _month = dt[1];
                            _day = dt[0];
                        }
                    }
                    else {
                        dt = new Date(date);
                        if (date.lastIndexOf('-') == -1 && date.lastIndexOf('/') == -1) {
                            _year = date;
                            this.type = 'YYYY';
                        }
                        else {
                            _day = dt.getDate();
                            _month = dt.getMonth() + 1;
                            _year = dt.getFullYear();
                            if (_day <= 9)
                                _day = `0${_day}`
                            if (_month <= 9)
                                _month = `0${_month}`
                            if (date.includes('-')) {
                                //dt = date.split('-')
                                //_year = dt[2];
                                //_month = dt[1];
                                //_day = dt[0];
                                this.type = 'DD-MM-YYYY';

                            }
                            else if (date.includes('/')) {
                                //dt = date.split('/')
                                //_year = dt[2];
                                //_month = dt[1];
                                //_day = dt[0];
                                this.type = 'DD/MM/YYYY';
                            }
                        }
                    }
                }
                else {
                    _day = this.day || null;
                    _month = this.month || null;
                    _year = this.year || null;
                    this.type = "DD-MM-YYYY"
                }
                this.isLoader = true;
                if (this.isDictSuffixes) {
                    if (date && this.type == "YYYY") {
                        if (this.lang == 'vi') {
                            this.label = `năm ${_year}`;
                        }
                        else if (this.lang == 'jp') {
                            if (_year && _year.includes('年'))
                                this.label = _year;
                            else
                                this.label = `${_year}年`;
                        }
                        else {
                            this.label = `${_year}`;
                        }
                    }
                    else if (date && (this.type == "MM/YYYY" || this.type == "MM-YYYY")) {
                        if (this.lang == 'vi') {
                            this.label = `Tháng ${_month} năm ${_year}`;
                        }
                        else if (this.lang == 'jp') {
                            this.label = `${_year}年${_month}月`;
                        } else if (this.lang == 'en') {
                            this.label = `${this.strMonths[this.lang][_month]} ${_year}`;
                        }
                        else if (this.lang == 'de') {
                            this.label = `${this.strMonths[this.lang][_month]} ${_year}`;
                        }
                    }
                    else {
                        if (_day && _year) {
                            if (this.lang == 'vi') {
                                this.label = `Ngày ${_day} tháng ${_month} năm ${_year}`;
                            }
                            else if (this.lang == 'jp') {
                                this.label = `${_year}年${_month}月${_day}日`;
                            }
                            else if (this.lang == 'en') {
                                var sup = "th";

                                if (_day == '01' || _day == '1' || _day == '21' || _day == '31')
                                    sup = "st";
                                else if (_day == '02' || _day == '2' || _day == '22')
                                    sup = "nd";
                                else if (_day == '03' || _day == '3' || _day == '23')
                                    sup = "rd";
                                this.label = `${this.strMonths[this.lang][_month]} ${_day}<sup>${sup}</sup>, ${_year}`;
                            }
                            else if (this.lang == 'de') {
                                this.label = `${this.strMonths[this.lang][_month]} ${_day} ${_year}`;
                            }
                        }
                    }
                }
                else {
                    if (this.lang == 'jp' || this.lang == 'vi') {
                        if (date && this.type == "YYYY") {
                            this.label = `${_year}`;
                        }
                        else if (date && this.type == "MM/YYYY") {
                            this.label = `${_year}/${_month}`;
                        }
                        else if (date && this.type == "MM-YYYY") {
                            this.label = `${_year}-${_month}`;
                        }
                        else if (date && this.type == "DD/MM/YYYY") {
                            if (_day && _year) {
                                this.label = `${_year}/${_month}/${_day}`;
                            }
                        }
                        else if (date && this.type == "DD-MM-YYYY") {
                            if (_day && _year) {
                                this.label = `${_year}-${_month}-${_day}`;
                            }
                        }
                        else {
                            if (_day && _year) {
                                this.label = `${_year},${_month},${_day}`;
                            }
                        }
                    }
                    if (this.lang == 'vi') {
                        if (date && this.type == "YYYY") {
                            this.label = `${_year}`;
                        }
                        else if (date && this.type == "MM/YYYY") {
                            this.label = `${_month}/${_year}`;
                        }
                        else if (date && this.type == "MM-YYYY") {
                            this.label = `${_month}-${_year}`;
                        }
                        else if (date && this.type == "DD/MM/YYYY") {
                            if (_day && _year) {
                                this.label = `${_day}/${_month}/${_year}`;
                            }
                        }
                        else if (date && this.type == "DD-MM-YYYY") {
                            if (_day && _year) {
                                this.label = `${_day}-${_month}-${_year}`;
                            }
                        }
                        else {
                            if (_day && _year) {
                                this.label = `${_day},${_month},${_year}`;
                            }
                        }
                    }
                    else if (this.lang == 'en') {
                        if (date && this.type == "YYYY") {
                                this.label = `${_year}`;
                        }
                        else if (date && (this.type == "MM/YYYY" || this.type == "MM-YYYY")) {
                                this.label = `${this.strMonths[this.lang][_month]} ${_year}`;
                        }
                        else {
                            if (_day && _year) {
                                    var aa = "th";
                                    if (_day == '01' || _day == '1' || _day == '21' || _day == '31')
                                        aa = "st";
                                    else if (_day == '02' || _day == '2' || _day == '22')
                                        aa = "nd";
                                    else if (_day == '03' || _day == '3' || _day == '23')
                                        aa = "rd";
                                this.label = `${this.strMonths[this.lang][_month]} ${_day}<sup>${aa}</sup>, ${_year}`;
                            }
                        }
                    }
                }
                if (this.label && this.ffix) {
                    if (this.lang == 'jp' && this.revFix)
                        this.label = `${this.label} ${this.ffix}`;
                    else
                        this.label = `${this.ffix}, ${this.label}`;
                }
                this.showLabel = this.label;
                this.$emit('input', this.showLabel);
                if (!this.showLabel && this.isDefault) {
                    if (this.lang == 'vi')
                        this.showLabel = `Ngày...tháng...năm...`;
                    else if (this.lang == 'jp')
                        this.showLabel = `...年...月...日`;
                    else if (this.lang == 'en')
                        this.showLabel = `date...month...year...`;
                    else if (this.lang == 'de')
                        this.showLabel = `date...month...year...`;
                }
            }
        },
        created() {
            
            this.ShowDate();
        }
    };
</script>
