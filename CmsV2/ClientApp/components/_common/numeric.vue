<template>
    <input class="form-control"
           :placeholder="placeholder"
           @blur="onBlurHandler"
           @input="onInputHandler"
           @focus="onFocusHandler"
           ref="numeric"
           type="text"
           v-model="amount"
           :disabled="dis"
           v-if="!readOnly">
    <span v-else
          ref="readOnly">{{ amount }}</span>
</template>

<script>
    export default {
        name: 'VueNumeric',

        props: {
            /**
             * Currency symbol.
             */
            currency: {
                type: String,
                default: '',
                required: false
            },

            /**
             * Maximum value allowed.
             */
            max: {
                type: Number,
                default: Number.MAX_SAFE_INTEGER || 9007199254740991,
                required: false,
            },

            /**
             * Minimum value allowed.
             */
            min: {
                type: Number,
                default: Number.MIN_SAFE_INTEGER || -9007199254740991,
                required: false
            },

            /**
             * Enable/Disable minus value.
             */
            minus: {
                type: Boolean,
                default: false,
                required: false
            },

            /**
             * Input placeholder.
             */
            placeholder: {
                type: String,
                default: '',
                required: false
            },

            /**
             * Value when the input is empty
             */
            emptyValue: {
                type: [Number, String],
                default: '',
                required: false
            },

            /**
             * Number of decimals.
             * Decimals symbol are the opposite of separator symbol.
             */
            precision: {
                type: Number,
                default: 0,
                required: false
            },

            /**
             * Thousand separator type.
             * Separator props accept either . or , (default).
             */
            separator: {
                type: String,
                default: ',',
                required: false
            },

            /**
             * Forced thousand separator.
             * Accepts any string.
             */
            thousandSeparator: {
                default: undefined,
                required: false,
                type: String
            },

            /**
             * Forced decimal separator.
             * Accepts any string.
             */
            decimalSeparator: {
                default: undefined,
                required: false,
                type: String
            },

            /**
              * The output type used for v-model.
              * It can either be String or Number (default).
              */
            outputType: {
                required: false,
                type: String,
                default: 'Number'
            },

            /**
             * v-model value.
             */
            value: {
                type: null,
                default: 0,
                required: true
            },

            /**
             * Hide input and show value in text only.
             */
            readOnly: {
                type: Boolean,
                default: false,
                required: false
            },
            dis: {
                type: Boolean,
                default: false,
                required: false
            },

            /**
             * Class for the span tag when readOnly props is true.
             */
            readOnlyClass: {
                type: String,
                default: '',
                required: false
            },

            /**
             * Position of currency symbol
             * Symbol position props accept either 'suffix' or 'prefix' (default).
             */
            currencySymbolPosition: {
                type: String,
                default: 'prefix',
                required: false
            }
        },

        data: () => ({
            amount: ''
        }),

        computed: {
            /**
             * Number type of formatted value.
             * @return {Number}
             */
            amountNumber() {
                return this.format(this.amount)
            },

            /**
             * Number type of value props.
             * @return {Number}
             */
            valueNumber() {
                return this.format(this.value)
            },

            /**
             * Define decimal separator based on separator props.
             * @return {String} '.' or ','
             */
            decimalSeparatorSymbol() {
                if (typeof this.decimalSeparator !== 'undefined') return this.decimalSeparator
                if (this.separator === ',') return '.'
                return ','
            },

            /**
             * Define thousand separator based on separator props.
             * @return {String} '.' or ','
             */
            thousandSeparatorSymbol() {
                if (typeof this.thousandSeparator !== 'undefined') return this.thousandSeparator
                if (this.separator === '.') return '.'
                if (this.separator === 'space') return ' '
                return ','
            },

            /**
             * Define format position for currency symbol and value.
             * @return {String} format
             */
            symbolPosition() {
                if (!this.currency) return '%v'
                return this.currencySymbolPosition === 'suffix' ? '%v %s' : '%s %v'
            }
        },

        watch: {
            'amount'() {
                this.amount = this.format(this.amount);
            }
        },

        mounted() {
            this.process(this.valueNumber)
            this.amount = this.format(this.valueNumber)

            // In case of delayed props value.
            setTimeout(() => {
                this.process(this.valueNumber)
                this.amount = this.format(this.valueNumber)
            }, 500)
        },

        methods: {
            /**
             * Handle blur event.
             * @param {Object} e
             */
            onBlurHandler(e) {
                this.$emit('blur', e)
                this.amount = this.format(this.amount);
            },

            /**
             * Handle focus event.
             * @param {Object} e
             */
            onFocusHandler(e) {
                this.$emit('focus', e)
                if (this.valueNumber === 0) {
                    this.amount = null
                } else {
                    //this.amount = accounting.formatMoney(this.valueNumber, {
                    //  symbol: '',
                    //  format: '%v',
                    //  thousand: '',
                    //  decimal: this.decimalSeparatorSymbol,
                    //  precision: Number(this.precision)
                    //})
                }
            },

            /**
             * Handle input event.
             */
            onInputHandler() {
                this.process(this.amountNumber)
            },

            /**
             * Validate value before update the component.
             * @param {Number} value
             */
            process(value) {
                if (value >= this.max) this.update(this.max)
                if (value <= this.min) this.update(this.min)
                if (value > this.min && value < this.max) this.update(value)
                if (!this.minus && value < 0) this.min >= 0 ? this.update(this.min) : this.update(0)
            },

            /**
             * Update parent component model value.
             * @param {Number} value
             */
            update(value) {
                //const output = this.format(value);
                this.amount = value;
                this.$emit('input', this.kparseNumber(value))
                this.$emit('change', this.kparseNumber(value))
            },

            /**
             * Format value using symbol and separator.
             * @param {Number} value
             * @return {String}
             */
            format(value) {
                value = value + '';
                if (value.endsWith('.') || value == '-')
                    return value;
                if (value == "0-")
                    return "-";
                var result = this.kformatNumber(this.kparseNumber(value));
                this.update(result);
                return result;
            },


            //h() {
            //    var f = ["ae", "au", "ca", "cn", "eg", "gb", "hk", "il", "in", "jp", "sk", "th", "tw", "us"];
            //    var b = ["at", "br", "de", "dk", "es", "gr", "it", "nl", "pt", "tr", "vn"];
            //    var i = ["cz", "fi", "fr", "ru", "se", "pl"];
            //    var d = ["ch"];
            //    //var g = [
            //    //    [".", ","],
            //    //    [",", "."],
            //    //    [",", " "],
            //    //    [".", "'"]
            //    //];
            //    var c = [f, b, i, d];
            //    for (var l = 0; l < c.length; l++) {
            //        localeGroup = c[l];
            //        for (var m = 0; m < localeGroup.length; m++) {
            //            a.put(localeGroup[m], l)
            //        }
            //    }
            //},
            e() {
                //var g = [
                //    [".", ","],
                //    [",", "."],
                //    [",", " "],
                //    [".", "'"]
                //];
                var q = ".";
                var o = ",";
                var p = "-";
                return this.j(q, o, p)
            },
            j(n, l, m) {
                return {
                    dec: n,
                    group: l,
                    neg: m
                }
            },
            kformatNumber(q) {
                var w = { format: "#,##0", locale: "us" }
                //var l = this.e(w.locale.toLowerCase());
                //var n = l.dec;
                //var u = l.group;
                //var o = l.neg;
                var m = "0#-,.";
                var t = "";
                var s = false;
                for (var r = 0; r < w.format.length; r++) {
                    if (m.indexOf(w.format.charAt(r)) == -1) {
                        t = t + w.format.charAt(r)
                    } else {
                        if (r == 0 && w.format.charAt(r) == "-") {
                            s = true;
                            continue
                        } else {
                            break
                        }
                    }
                }
                var v = "";
                for (var r2 = w.format.length - 1; r2 >= 0; r2--) {
                    if (m.indexOf(w.format.charAt(r2)) == -1) {
                        v = w.format.charAt(r2) + v
                    } else {
                        break
                    }
                }
                w.format = w.format.substring(t.length);
                w.format = w.format.substring(0, w.format.length - v.length);
                var p = new Number(q);
                return this._formatNumber(p, w, v, t, s)
            },
            _formatNumber(m, q1, n, G, s) {
                var q = {
                    format: "#,##0.###",
                    locale: "us",
                    decimalSeparatorAlwaysShown: false,
                    nanForceZero: true,
                    round: true
                };
                var E = this.e(q.locale.toLowerCase());
                var D = E.dec;
                var v = E.group;
                var l = E.neg;
                var x = false;
                if (isNaN(m)) {
                    if (q.nanForceZero == true) {
                        m = 0;
                        x = true
                    } else {
                        return null
                    }
                }
                if (n == "%") {
                    m = m * 100
                }
                var z = "";
                if (q.format.indexOf(".") > -1) {
                    var F = D;
                    var t = q.format.substring(q.format.lastIndexOf(".") + 1);
                    if (q.round == true) {
                        m = new Number(m.toFixed(t.length))
                    } else {
                        var K = m.toString();
                        K = K.substring(0, K.lastIndexOf(".") + t.length + 1);
                        m = new Number(K)
                    }
                    var y = m % 1;
                    var A = new String(y.toFixed(t.length));
                    A = A.substring(A.lastIndexOf(".") + 1);
                    for (var H = 0; H < t.length; H++) {
                        if (t.charAt(H) == "#" && A.charAt(H) != "0") {
                            F += A.charAt(H);
                            continue
                        } else {
                            if (t.charAt(H) == "#" && A.charAt(H) == "0") {
                                var r = A.substring(H);
                                if (r.match("[1-9]")) {
                                    F += A.charAt(H);
                                    continue
                                } else {
                                    break
                                }
                            } else {
                                if (t.charAt(H) == "0") {
                                    F += A.charAt(H)
                                }
                            }
                        }
                    }
                    z += F
                } else {
                    m = Math.round(m)
                }
                var u = Math.floor(m);
                if (m < 0) {
                    u = Math.ceil(m)
                }
                var C = "";
                if (q.format.indexOf(".") == -1) {
                    C = q.format
                } else {
                    C = q.format.substring(0, q.format.indexOf("."))
                }
                var J = "";
                if (!(u == 0 && C.substr(C.length - 1) == "#") || x) {
                    var w = new String(Math.abs(u));
                    var p = 9999;
                    if (C.lastIndexOf(",") != -1) {
                        p = C.length - C.lastIndexOf(",") - 1
                    }
                    var o = 0;
                    for (var H2 = w.length - 1; H2 > -1; H2--) {
                        J = w.charAt(H2) + J;
                        o++;
                        if (o == p && H2 != 0) {
                            J = v + J;
                            o = 0
                        }
                    }
                    if (C.length > J.length) {
                        var I = C.indexOf("0");
                        if (I != -1) {
                            var B = C.length - I;
                            while (J.length < B) {
                                J = "0" + J
                            }
                        }
                    }
                }
                if (!J && C.indexOf("0", C.length - 1) !== -1) {
                    J = "0"
                }
                z = J + z;
                if (m < 0 && s && G.length > 0) {
                    G = l + G
                } else {
                    if (m < 0) {
                        z = l + z
                    }
                }
                if (!q.decimalSeparatorAlwaysShown) {
                    if (z.lastIndexOf(D) == z.length - 1) {
                        z = z.substring(0, z.length - 1)
                    }
                }
                z = G + z + n;
                return z
            },
            kparseNumber(r) {
                r = r + '';
                if (!r || r == "")
                    return 0;
                var v = {
                    format: "#,##0",
                    locale: "us",
                    decimalSeparatorAlwaysShown: false
                };
                var m = this.e(v.locale.toLowerCase());
                var o = m.dec;
                var t = m.group;
                var p = m.neg;
                var l = "1234567890.-";
                while (r.indexOf(t) > -1) {
                    r = r.replace(t, "")
                }
                r = r.replace(o, ".").replace(p, "-");
                var u = "";
                var n = false;
                if (r.charAt(r.length - 1) == "%") {
                    n = true
                }
                for (var s = 0; s < r.length; s++) {
                    if (l.indexOf(r.charAt(s)) > -1) {
                        u = u + r.charAt(s)
                    }
                }
                var q = new Number(u);
                if (n) {
                    q = q / 100;
                    q = this._roundNumber(q, u.length - 1)
                }
                return q
            },
            _roundNumber(n, m) {
                var l = Math.pow(10, m || 0);
                var o = String(Math.round(n * l) / l);
                if (m > 0) {
                    var p = o.indexOf(".");
                    if (p == -1) {
                        o += ".";
                        p = 0
                    } else {
                        p = o.length - (p + 1)
                    }
                    while (p < m) {
                        o += "0";
                        p++
                    }
                }
                return o
            }
        },
        created() {
        }
    }
</script>
