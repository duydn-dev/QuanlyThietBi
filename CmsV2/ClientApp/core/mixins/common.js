import Vue from 'vue';
import axios from '../../core/plugins/http';
import util from '../../core/utils/index';
import { mapGetters, mapActions } from 'vuex';
import _, { create } from 'lodash';
if (!process.env.VUE_ENV) {
    Vue.mixin({
        data() {
            return {
                ww: window.innerWidth,
                wh: window.innerHeight,
                scrollSettings: {
                    maxScrollbarLength: 60,
                    wheelSpeed: 0.2
                },
                currentMemberStep: {}
            };
        },
        computed: {
            ...mapGetters(['systemHubProxy', 'calendarCurrentUser', 'userPermissions']),
            isMobile() {
                return this.ww < 767;
            },
            isIOS() {
                let isIpad =
                    navigator.userAgent.match(/(iPad)/) ||
                    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

                return isIpad; //navigator.userAgent.match(/iPad/i) != null;
            },
            isTranslatePage() {
                return this.$route.path.indexOf('translate') !== -1;
            },
            techCoServiceUrl() {
                if (this.appSettings.configs && this.appSettings.configs.techcoServiceUrl)
                    return this.appSettings.configs.techcoServiceUrl;
                return 'https://service.O2Tech.vn';
            }
        },
        methods: {
            ...mapActions([
                'updateTrigger',
                'addressById',
                'setShowProcess',
                'getCurrentMemberStep'
            ]),
            getFileUrl(fileUrl) {
                if (fileUrl.indexOf('http') > -1) return fileUrl;
                return this.appSettings.configs.storageDomain + fileUrl;
            },

            getMemberStep(data) {
                this.getCurrentMemberStep(data).then(data => {
                    this.currentMemberStep = data;
                });
            },
            getUrlPreviewOffice(url) {
                let temp = url;
                return `https://view.officeapps.live.com/op/embed.aspx?src=${temp}`;
            },
            handleResize() {
                this.ww = window.innerWidth;
                this.wh = window.innerHeight;
            },
            
            isPermission(permissionIds, level) {
                if (typeof permissionIds != 'object') permissionIds = [permissionIds];
                let userPermission = this.userPermissions;
                if (!userPermission || userPermission.length == 0)
                    userPermission = this.appSettings.userPermission;
                let permission = this._.filter(userPermission, item => {
                    return (
                        permissionIds.indexOf(item.code) >= 0 ||
                        permissionIds.findIndex(
                            o => item.code && o && item.code.toLowerCase() === o.toLowerCase()
                        ) >= 0
                    );
                });
                if (!permission || permission.length == 0) return false;

                if (level || level == 0) return permission[0].level == level;
                return true;
            },
            isAllowPermission(permissions){
                if(this.currentUser.isAdministrator){
                    return true;
                }
                if(typeof permissions === 'object'){
                    return this.userPermissions.filter(n => permissions.includes(n.roleCode)).length > 0;
                }
                return false;
            },
            isManangerAll(permissionIds) {
                if (typeof permissionIds != 'object') permissionIds = [permissionIds];
                let userPermission = this.userPermissions;
                if (!userPermission || userPermission.length == 0)
                    userPermission = this.appSettings.userPermission;

                let permission = this._.filter(userPermission, item => {
                    return permissionIds.indexOf(item.code) >= 0 && item.level == 2; //isFullPermission == true ||
                });

                return permission && permission.length > 0;
            },
            levelOfPermission(permissionIds) {
                if (typeof permissionIds != 'object') permissionIds = [permissionIds];
                let userPermission = this.userPermissions;
                if (!userPermission || userPermission.length == 0)
                    userPermission = this.appSettings.userPermission;

                let permission = this._.find(userPermission, item => {
                    return permissionIds.indexOf(item.code) >= 0; //&& item.level == 2; //isFullPermission == true ||
                });

                return permission ? permission.level : 0;
            },
            // truyền vào view code, button code
            //step nếu check button trong list
            //memberId nếu check button khi edit
            //, memberId, departmentCode
            checkShowButton(viewCode, buttonCode, step, memberId, departmentCode) {
                let temp = this.appSettings.viewButtonConfigs.find(
                    c => c.viewCode == viewCode && c.buttonCode == buttonCode
                );
                if (!temp) return true;
                if (temp.lstPermissionCode) {
                    let isHavePermission = this.isPermission(temp.lstPermissionCode);
                    if (!isHavePermission) return false;
                    // if (memberId > 0) {
                    // this.getCurrentMemberStep({ memberId: memberId, departmentCode: departmentCode }).then(data => {
                    //     if (data && data.currentStepOfDepartment) {
                    //         return temp.lstStepId && temp.lstStepId.indexOf(data.currentStepOfDepartment) > -1;
                    //     }
                    //     else
                    //         return false;
                    // })
                    // }
                    //  else {
                    if (temp.lstStepId && temp.lstStepId.length > 0) {
                        return temp.lstStepId && temp.lstStepId.indexOf(step) > -1;
                    } else return true;
                    // }
                }
                return false;
            },

            checkPermissionView(viewCode, buttonCode) {
                let temp = this.appSettings.viewButtonConfigs.find(
                    c => c.viewCode == viewCode && c.buttonCode == buttonCode
                );
                if (!temp) return true;
                if (temp.lstPermissionCode) {
                    let isHavePermission = this.isPermission(temp.lstPermissionCode);
                    return isHavePermission;
                }
                return false;
            },

            triggerClick(key) {
                this.updateTrigger(key);
            },
            getWardNameById(id) {
                var units = {
                    xa: 'xã',
                    phuong: 'phường',
                    'thi-tran': 'thị trấn',
                    'thi-xa': 'thị xã'
                };
                return new Promise((resolve, reject) => {
                    return this.addressById(id)
                        .then(o => {
                            if (o) return resolve(units[o.wardType] + ' ' + o.wardName);
                            return '';
                        })
                        .catch(err => {
                            return reject(err);
                        });
                });
            },
            translateKey(keyword) {
                return new Promise(resolve => {
                    return this.$http({
                        data: {
                            m: 'autotranslate',
                            fn: 'gg-translate',
                            keyword: keyword,
                            lang: 'en'
                        }
                    }).then(res => {
                        console.log('dichhhhhhhh', res);
                        return resolve(res.data);
                    });
                });
            },
            kanjiToRomaji(q) {
                return new Promise((resolve, reject) => {
                    return this.$http({
                        data: {
                            m: 'ConvertName',
                            fn: 'kanji-to-romaji',
                            q
                        }
                    })
                        .then(response => {
                            return resolve(response.data);
                        })
                        .catch(err => {
                            return reject(err);
                        });
                });
            },
            convertDateToFullString(value, lang) {
                var daysVi = {
                    '01': 'mồng một',
                    '02': 'mồng hai',
                    '03': 'mồng ba',
                    '04': 'mồng bốn',
                    '05': 'mồng năm',
                    '06': 'mồng sáu',
                    '07': 'mồng bảy',
                    '08': 'mồng tám',
                    '09': 'mồng chín',
                    '1': 'mồng một',
                    '2': 'mồng hai',
                    '3': 'mồng ba',
                    '4': 'mồng bốn',
                    '5': 'mồng năm',
                    '6': 'mồng sáu',
                    '7': 'mồng bảy',
                    '8': 'mồng tám',
                    '9': 'mồng chín',
                    '10': 'mồng mười',
                    '11': 'mười một',
                    '12': 'mười hai',
                    '13': 'mười ba',
                    '14': 'mười bốn',
                    '15': 'mười lăm',
                    '16': 'mười sáu',
                    '17': 'mười bảy',
                    '18': 'mười tám',
                    '19': 'mười chín',
                    '20': 'hai mươi',
                    '21': 'hai mươi mốt',
                    '22': 'hai mươi hai',
                    '23': 'hai mươi ba',
                    '24': 'hai mươi bốn',
                    '25': 'hai mươi lăm',
                    '26': 'hai mươi sáu',
                    '27': 'hai mươi bảy',
                    '28': 'hai mươi tám',
                    '29': 'hai mươi chín',
                    '30': 'ba mươi',
                    '31': 'ba mươi mốt'
                };
                var daysEn = {
                    '01': '​first',
                    '02': 'second',
                    '03': 'third',
                    '04': 'fourth',
                    '05': 'fifth',
                    '06': 'sixth',
                    '07': 'seventh',
                    '08': 'eighth',
                    '09': 'ninth',
                    '1': '​first',
                    '2': 'second',
                    '3': 'third',
                    '4': 'fourth',
                    '5': 'fifth',
                    '6': 'sixth',
                    '7': 'seventh',
                    '8': 'eighth',
                    '9': 'ninth',
                    '10': 'tenth',
                    '11': 'eleventh',
                    '12': 'twelfth',
                    '13': 'thirteenth',
                    '14': 'fourteenth',
                    '15': 'fifteenth',
                    '16': 'sixteenth',
                    '17': 'seventeenth',
                    '18': 'eighteenth',
                    '19': 'nineteenth',
                    '20': 'twentieth',
                    '21': 'twenty-first',
                    '22': 'twenty-second',
                    '23': 'twenty-third',
                    '24': 'twenty-fourth',
                    '25': 'twenty-fifth',
                    '26': 'twenty-sixth',
                    '27': 'twenty-seventh',
                    '28': 'twenty-eighth',
                    '29': 'twenty-ninth',
                    '30': 'thirtieth',
                    '31': 'thirty-first'
                };

                var monthsVi = {
                    '01': 'một',
                    '02': 'hai',
                    '03': 'ba',
                    '04': 'bốn',
                    '05': 'năm',
                    '06': 'sáu',
                    '07': 'bảy',
                    '08': 'tám',
                    '09': 'chín',
                    '1': 'một',
                    '2': 'hai',
                    '3': 'ba',
                    '4': 'bốn',
                    '5': 'năm',
                    '6': 'sáu',
                    '7': 'bảy',
                    '8': 'tám',
                    '9': 'chín',
                    '10': 'mười',
                    '11': 'mười một',
                    '12': 'mười hai'
                };
                var monthsEn = {
                    '01': 'January',
                    '02': 'February',
                    '03': 'March',
                    '04': 'April',
                    '05': 'May',
                    '06': 'June',
                    '07': 'July',
                    '08': 'August',
                    '09': 'September',
                    '1': 'January',
                    '2': 'February',
                    '3': 'March',
                    '4': 'April',
                    '5': 'May',
                    '6': 'June',
                    '7': 'July',
                    '8': 'August',
                    '9': 'September',
                    '10': 'October',
                    '11': 'November',
                    '12': 'December'
                };
                var yearsVi = {
                    '1940': 'một nghìn chín trăm bốn mươi',
                    '1941': 'một nghìn chín trăm bốn mươi mốt',
                    '1942': 'một nghìn chín trăm bốn mươi hai',
                    '1943': 'một nghìn chín trăm bốn mươi ba',
                    '1944': 'một nghìn chín trăm bốn mươi bốn',
                    '1945': 'một nghìn chín trăm bốn mươi lăm',
                    '1946': 'một nghìn chín trăm bốn mươi sáu',
                    '1947': 'một nghìn chín trăm bốn mươi bảy',
                    '1948': 'một nghìn chín trăm bốn mươi tám',
                    '1949': 'một nghìn chín trăm bốn mươi chín',
                    '1950': 'một nghìn chín trăm năm mươi',
                    '1951': 'một nghìn chín trăm năm mươi mốt',
                    '1952': 'một nghìn chín trăm năm mươi hai',
                    '1953': 'một nghìn chín trăm năm mươi ba',
                    '1954': 'một nghìn chín trăm năm mươi bốn',
                    '1955': 'một nghìn chín trăm năm mươi lăm',
                    '1956': 'một nghìn chín trăm năm mươi sáu',
                    '1957': 'một nghìn chín trăm năm mươi bảy',
                    '1958': 'một nghìn chín trăm năm mươi tám',
                    '1959': 'một nghìn chín trăm năm mươi chín',
                    '1960': 'một nghìn chín trăm sáu mươi',
                    '1961': 'một nghìn chín trăm sáu mươi mốt',
                    '1962': 'một nghìn chín trăm sáu mươi hai',
                    '1963': 'một nghìn chín trăm sáu mươi ba',
                    '1964': 'một nghìn chín trăm sáu mươi bốn',
                    '1965': 'một nghìn chín trăm sáu mươi lăm',
                    '1966': 'một nghìn chín trăm sáu mươi sáu',
                    '1967': 'một nghìn chín trăm sáu mươi bảy',
                    '1968': 'một nghìn chín trăm sáu mươi tám',
                    '1969': 'một nghìn chín trăm sáu mươi chín',
                    '1970': 'một nghìn chín trăm bảy mươi',
                    '1971': 'một nghìn chín trăm bảy mươi mốt',
                    '1972': 'một nghìn chín trăm bảy mươi hai',
                    '1973': 'một nghìn chín trăm bảy mươi ba',
                    '1974': 'một nghìn chín trăm bảy mươi bốn',
                    '1975': 'một nghìn chín trăm bảy mươi lăm',
                    '1976': 'một nghìn chín trăm bảy mươi sáu',
                    '1977': 'một nghìn chín trăm bảy mươi bảy',
                    '1978': 'một nghìn chín trăm bảy mươi tám',
                    '1979': 'một nghìn chín trăm bảy mươi chín',
                    '1980': 'một nghìn chín trăm tám mươi',
                    '1981': 'một nghìn chín trăm tám mươi mốt',
                    '1982': 'một nghìn chín trăm tám mươi hai',
                    '1983': 'một nghìn chín trăm tám mươi ba',
                    '1984': 'một nghìn chín trăm tám mươi bốn',
                    ' 1985': 'một nghìn chín trăm tám mươi lăm',
                    '1986': 'một nghìn chín trăm tám mươi sáu',
                    '1987': 'một nghìn chín trăm tám mươi bảy',
                    '1988': 'một nghìn chín trăm tám mươi tám',
                    '1989': 'một nghìn chín trăm tám mươi chín',
                    '1990': 'một nghìn chín trăm chín mươi',
                    '1991': 'một nghìn chín trăm chín mươi mốt',
                    '1992': 'một nghìn chín trăm chín mươi hai',
                    '1993': 'một nghìn chín trăm chín mươi ba',
                    '1994': 'một nghìn chín trăm chín mươi bốn',
                    '1995': 'một nghìn chín trăm chín mươi lăm',
                    '1996': 'một nghìn chín trăm chín mươi sáu',
                    '1997': 'một nghìn chín trăm chín mươi bảy',
                    '1998': 'một nghìn chín trăm chín mươi tám',
                    '1999': 'một nghìn chín trăm chín mươi chín',
                    '2000': 'hai nghìn',
                    '2001': 'hai nghìn không trăm lẻ một',
                    '2002': 'hai nghìn không trăm lẻ hai',
                    '2003': 'hai nghìn không trăm lẻ ba',
                    '2004': 'hai nghìn không trăm lẻ bốn',
                    '2005': 'hai nghìn không trăm lẻ lăm',
                    '2006': 'hai nghìn không trăm lẻ sáu',
                    '2007': 'hai nghìn không trăm lẻ bảy',
                    '2008': 'hai nghìn không trăm lẻ tám',
                    '2009': 'hai nghìn không trăm lẻ chín',
                    '2010': 'hai nghìn không trăm mười',
                    '2011': 'hai nghìn không trăm mười một',
                    '2012': 'hai nghìn không trăm mười hai',
                    '2013': 'hai nghìn không trăm mười ba',
                    '2014': 'hai nghìn không trăm mười bốn',
                    '2015': 'hai nghìn không trăm mười lăm',
                    '2016': 'hai nghìn không trăm mười sáu',
                    '2017': 'hai nghìn không trăm mười bảy',
                    '2018': 'hai nghìn không trăm mười tám',
                    '2019': 'hai nghìn không trăm mười chín',
                    '2020': 'hai nghìn không trăm hai mươi',
                    '2021': 'hai nghìn không trăm hai mươi mốt',
                    '2022': 'hai nghìn không trăm hai mươi hai',
                    '2023': 'hai nghìn không trăm hai mươi ba',
                    '2024': 'hai nghìn không trăm hai mươi bốn',
                    '2025': 'hai nghìn không trăm hai mươi lăm',
                    '2026': 'hai nghìn không trăm hai mươi sáu',
                    '2027': 'hai nghìn không trăm hai mươi bảy'
                };

                //var daysEn = {
                //    '01': 'First', '02': 'Second', '03': 'Third', '04': 'Fourth', '05': 'Fifth', '06': 'Sixth', '07': 'Seventh', '08': 'Eighth', '09': 'Ninth', '10': 'Tenth',
                //    '11': 'Eleventh', '12': 'Twelfth', '13': 'Thirteenth', '14': 'Fourteenth', '15': 'Fifteenth', '16': 'Sixteenth', '17': 'Seventeenth', '18': 'Eighteenth', '19': 'Nineteenth', '20': 'Twentieth',
                //    '21': 'Twenty-first', '22': 'Twenty-second', '23': 'Twenty-third', '24': 'Twenty-fourth', '25': 'Twenty-fifth', '26': 'Twenty-sixth', '27': 'Twenty-seventh', '28': 'Twenty-eighth', '29': 'Twenty-ninth', '30': 'Thirtieth', '31': 'Thirty-first'
                //};
                //var monthsEn = {
                //    '01': 'January', '02': 'February', '03': 'March', '04': 'April', '05': 'May', '06': 'June', '07': 'July', '08': 'August', '09': 'September', '10': 'October',
                //    '11': 'November', '12': 'December'
                //};
                let _day;
                let _month;
                let _year;
                let date;
                if (value) {
                    var dt = '';
                    if (value.includes('T') && value.includes(':')) {
                        var dt = this.$moment(value).format('DD/MM/YYYY');
                        dt = dt.split('/');
                    } else {
                        if (value.includes('-')) {
                            dt = value.split('-');
                        } else if (value.includes('/')) {
                            dt = value.split('/');
                        } else if (value.includes(',')) {
                            dt = value.split(',');
                        } else {
                            dt = value;
                        }
                    }
                    //    if (value.includes('-')) {
                    //        dt = value.split('-');
                    //    } else if (value.includes('/')) {
                    //        dt = value.split('/');
                    //    } else if (value.includes(',')) {
                    //        dt = value.split(',');
                    //    }
                    //else dt = value;

                    if (dt.length == 3) {
                        _day = dt[0];
                        _month = dt[1];
                        _year = dt[2];
                        if (lang == 'vi') {
                            date = `Ngày ${daysVi[_day]} tháng ${monthsVi[_month]} năm ${yearsVi[_year]}`;
                        } else if (lang == 'jp') {
                            date = `${this.$dictByType(_year, lang, 'year')}${this.$dictByType(
                                parseInt(_month, 10),
                                lang,
                                'month'
                            )}${this.$dictByType(parseInt(_day, 10), lang, 'day')}`;
                        } else if (lang == 'en') {
                            date = `The ${daysEn[_day]} of ${monthsEn[_month]
                                } in ${this.$dictByType(_year, lang, 'year')}`;
                        } else {
                            date = '';
                        }
                        return date;
                    } else if (dt.length == 2) {
                        _month = dt[0];
                        _year = dt[1];
                        if (lang == 'vi') {
                            date = `Tháng ${monthsVi[_month]} năm ${yearsVi[_year]}`;
                        } else if (lang == 'jp') {
                            date = `${this.$dictByType(_year, lang, 'year')}${this.$dictByType(
                                parseInt(_month, 10),
                                lang,
                                'month'
                            )}`;
                        } else if (lang == 'en') {
                            date = `${monthsEn[_month]} in ${this.$dictByType(
                                _year,
                                lang,
                                'year'
                            )}`;
                        } else {
                            date = '';
                        }
                        return date;
                    } else {
                        _year = dt;
                        if (lang == 'vi') {
                            date = `Năm ${yearsVi[_year]}`;
                        } else if (lang == 'jp') {
                            date = `${this.$dictByType(_year, lang, 'year')}`;
                        } else if (lang == 'en') {
                            date = `in ${this.$dictByType(_year, lang, 'year')}`;
                        } else {
                            date = '';
                        }
                        return date;
                    }

                    //else {
                    //    _day = dt.getDate();
                    //    _month = dt.getMonth() + 1;
                    //    console.log('month', _month);
                    //    _year = dt.getFullYear();
                    //    if (lang == 'vi') {
                    //        date = `Ngày ${daysVi[_day]} tháng ${monthsVi[_month]} năm ${
                    //            yearsVi[_year]
                    //            }`;
                    //    } else if (lang == 'jp') {
                    //        date = `${this.$dictByType(_year, lang, 'year')}${this.$dictByType(
                    //            parseInt(_month, 10),
                    //            lang,
                    //            'month'
                    //        )}${this.$dictByType(parseInt(_day, 10), lang, 'day')}`;
                    //    } else if (lang == 'en') {
                    //        date = `The ${daysEn[_day]} of ${
                    //            monthsEn[_month]
                    //            } in ${this.$dictByType(_year, lang, 'year')}`;
                    //    } else {
                    //        date = '';
                    //    }
                    //    return date;
                    //}
                } else {
                    return '';
                }
            },
            getDateByCondition(
                lstHoliday,
                date,
                type,
                isIgnoreSunDay = false,
                isIgnoreHoliday = false,
                dayofWeek
            ) {
                if (!date) return date;

                let minDate = new Date(-8640000000000000);
                while (date > minDate) {
                    let isValidDate = true;
                    let day = date.getDay();

                    if (dayofWeek && day != dayofWeek) isValidDate = false;

                    if (isValidDate && isIgnoreSunDay) {
                        if (day == 0 || day == 6) isValidDate = false;
                    }
                    if (
                        isValidDate &&
                        isIgnoreHoliday &&
                        lstHoliday &&
                        _.filter(lstHoliday, o => {
                            if (
                                new Date(o.fromDate).getTime() <= date.getTime() &&
                                new Date(o.toDate).getTime() >= date.getTime()
                            )
                                return o;
                        }).length > 0
                    )
                        isValidDate = false;

                    if (isValidDate) return date.toUTCString();
                    else {
                        date.setDate(date.getDate() + type); //.addDays(type);
                    }
                }
            },
            getNumberFormat(value, decimalDigits) {
                if (!decimalDigits) decimalDigits = 0;

                return this.$options.filters.currency(value, '', decimalDigits, {
                    thousandsSeparator: ',',
                    decimalSeparator: '.'
                });
            },
            getMemberType(typeId) {
                let o = _.find(this.appSettings.memberType, ['id', typeId]);
                if (o) return o.name;
            },
            getAboradMemberType(typeId) {
                let o = _.find(this.appSettings.abroadMemberType, ['id', typeId]);
                if (o) return o.name;
            },
            getLaborMemberType(typeId) {
                let o = _.find(this.appSettings.laborMemberType, ['id', typeId]);
                if (o) return o.name;
            },
            getExtentionOnly(fileext) {
                return fileext.split('.').pop();
            },
            getFileNameWithoutExtendsion(fileName) {
                return fileName
                    .split('.')
                    .slice(0, -1)
                    .join('.');
            },
            getFileNameWithTime(fileName) {
                let name = this.getFileNameWithoutExtendsion(fileName);
                name += '_' + new Date().getTime();
                return (name += '.' + this.getExtentionOnly(fileName));
            },
            showProcess(type) {
                this.setShowProcess({ type: type, isShow: true });
            },
            closeProcess() {
                this.setShowProcess(null);
            },
            getCalendarTitle(type) {
                switch (type) {
                    case 1:
                        return 'Lịch cá nhân';
                    case 2:
                        return 'Lịch nhóm';
                    case 3:
                        return 'Lịch phòng ban';
                    case 4:
                        return 'Lịch đơn vị';

                    default:
                        return '';
                }
            },
            calendarIsCanEdit(item) {
                let created = item.createdBy;
                if (!created) return true;
                if (this.calendarCurrentUser) return item.createdBy == this.calendarCurrentUser.id;
                else return item.createdBy == this.currentUser.id;
            }
        },
        mounted: function () {
            window.addEventListener('resize', this.handleResize);
            if (this.scope && typeof this.scope == 'String')
                document.body.classList.add(this.scope);
        },
        beforeDestroy: function () {
            window.removeEventListener('resize', this.handleResize);
        },
        destroyed() {
            if (this.scope && typeof this.scope == 'String')
                document.body.classList.remove(this.scope);
        }
    });
    Vue.mixin({
        computed: {
            navigator() {
                var ua = navigator.userAgent,
                    tem,
                    M =
                        ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) ||
                        [];
                if (/trident/i.test(M[1])) {
                    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                    return 'IE ' + (tem[1] || '');
                }
                if (M[1] === 'Chrome') {
                    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
                    if (tem != null)
                        return tem
                            .slice(1)
                            .join(' ')
                            .replace('OPR', 'Opera');
                }
                M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
                if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
                return M.join(' ');
            }
        }
    });
    Vue.mixin({
        methods: {
            $cloneObject(obj) {
                return JSON.parse(JSON.stringify(obj));
            }
        }
    });
    Vue.mixin({
        computed: {
            ...mapGetters([
                'sidebarModeOpen',
            ]),
        },
        methods: {
            ...mapActions([
                'toggleSidebar',
                'setSidebarMode'
            ]),
            sidebarOnMouseEnter() {
                this.setSidebarMode(true);
            },
            sidebarOnMouseLeave() {
                this.setSidebarMode(false);
            },
            clickSideBar() {
                if (!this.sidebarModeOpen) {
                    this.toggleSidebar();
                    //e.preventDefault();
                }
            }
        }
    });
}
