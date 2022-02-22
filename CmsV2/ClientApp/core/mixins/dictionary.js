import Vue from 'vue';
import { mapGetters } from 'vuex';
Vue.mixin({
    computed: {
        ...mapGetters(['dictionaries'])
    },
    methods: {
        $dict(key, cusLang) {
            if (!cusLang)
                cusLang = this.lang;

            if (cusLang == 'vi')
                return key; 

            if (!key) return "";
            key = key + '';

            var dis = _.find(this.dictionaries['dict'], (o) => {
                if (!o || !o.vi)
                    return "";
                return (o.vi == key || o.vi.toLowerCase() == key.toLowerCase());
            });
            if (dis) {
                if (dis[cusLang])
                    return dis[cusLang];
            }

            return `[${cusLang}]${key}`;
        },
        $dictInsert(key, dataInsert, cusLang) {
            if (!cusLang)
                cusLang = this.lang;

            if (cusLang == 'vi')
                return key + ':' + dataInsert;

            if (!key) return "";
            key = key + '';

            var dis = _.find(this.dictionaries['dict'], (o) => {
                if (!o || !o.vi)
                    return "";
                return (o.vi == key || o.vi.toLowerCase() == key.toLowerCase());
            });
            if (dis) {
                if (dis[cusLang]) {
                    if (cusLang == 'jp') {
                        return dis[cusLang] + ':' + dataInsert;
                    } else if (cusLang == 'en') {
                        if (dataInsert == null || dataInsert == '') dataInsert = '...';
                        return dis[cusLang].replace('___', dataInsert);
                    }
                }
                    
            }
            return `[${cusLang}]${key}`;
        },
        $dictByType(key, cusLang, typeName) {
            if (!typeName)
                return this.$dict(key, cusLang);
            if (!cusLang)
                cusLang = this.lang;
            if (cusLang == 'vi')
                return key;
            if (!key) return "";
            key = key + '';

            var dis = _.find(this.dictionaries['dict'], (o) => {
                if (!o || !o.vi)
                    return "";
                return (o.vi == key || o.vi.toLowerCase() == key.toLowerCase())
            });
            //console.log(key, dis);
            if (dis) {
                return dis[cusLang];
            }

            return `[${cusLang}]${key}`;
        },
        $dictByTypeNew(key, cusLang, typeName) {
            if (!typeName)
                return this.$dict(key, cusLang);
            if (!cusLang)
                cusLang = this.lang;
            if (cusLang == 'vi')
                return key;
            if (!key) return "";
            key = key + '';

            var dis = _.find(this.dictionaries[typeName], (o) => {
                if (!o || !o.vi)
                    return "";
                return (o.vi == key || o.vi.toLowerCase() == key.toLowerCase())
            });
            //console.log(key, dis);
            if (dis) {
                return dis[cusLang];
            }

            return `[${cusLang}]${key}`;
        },
        $dictId(key, typeName) {
            if (!key) return "";
            if (typeof key == 'string') {
                return key;
            }
            else if (typeof key == 'object') {
                if (key.length == 0) {
                    return "";
                }
                var res = [];
                _.forEach(key, (o) => {
                    res.push(this.$dictId(o, typeName));
                })
                return res.join(', ');
            } else {
                let dis = _.find(this.dictionaries[typeName], ['id', key]);
                if (dis) {
                    if (!dis[this.lang])
                        return this.$dictAccents(dis.vi);
                    else
                        return dis[this.lang || 'vi'];
                }
                if (typeof (key) == 'string') {
                    return this.$dictAccents(key);
                }
                return `[${this.lang}]${key}`;
            }

        },
        $dictIdByLang(key, typeName, lang) {
            if (!key) return "";
            if (typeof key == 'string') {
                return key;
            }
            else if (typeof key == 'object') {
                if (key.length == 0) {
                    return "";
                }
                var res = [];
                _.forEach(key, (o) => {
                    res.push(this.$dictId(o, typeName));
                })
                return res.join(', ');
            } else {
                let dis = _.find(this.dictionaries[typeName], ['id', key]);
                if (dis) {
                    if (!dis[lang])
                        return this.$dictAccents(dis.vi);
                    else
                        return dis[lang || 'vi'];
                }
                if (typeof (key) == 'string') {
                    return this.$dictAccents(key);
                }
                return `[${lang}]${key}`;
            }

        },
        $dictMalformation(key) {
            if (!key) return "";
            if (typeof key == 'object') {
                let dis = _.find(this.dictionaries['dict'], ['id', key.id]);
                if (dis) {
                    let val = dis[this.lang];
                    if (this.lang == 'jp' && val.indexOf('（ ）') !== -1)
                        return val.replace('（ ）', '（' + key.value + '）');
                    if (this.lang == 'vi' && val.indexOf('( )') !== -1)
                        return val.replace('( )', '(' + key.value + ')');
                    return val;
                }
            }
            return key;
        },
        $dictIdAccents(key, typeName) {
            if (!key) return "";

            let dis = _.find(this.dictionaries[typeName], ['id', key]);
            if (dis) {
                if (this.lang == 'vi') return dis.vi;
                else
                    return this.$dictAccents(dis.vi);
            }
            if (typeof (key) == 'string') {
                return this.$dictAccents(key);
            }
            return `[${this.lang}]${key}`;
        },
        $dictAccents(key) {
            if (this.lang && this.lang == 'vi')
                return key;
            if (key) {
                key = key + '';
                return key.normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/đ/g, 'd').replace(/Đ/g, 'D');
            }
            return key;
        },
        $dictAccentsVI(key) {
            if (key) {
                key = key + '';
                return key.normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/đ/g, 'd').replace(/Đ/g, 'D');
            }
            return key;
        }
    }
});