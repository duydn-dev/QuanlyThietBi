<template>
    <div class="search-control-inner" v-click-outside="onClickOutside">
        <div class="search-control-tl">
            <input
                type="text"
                class="search-translate form-control"
                :placeholder="placeholder"
                v-on:keyup="filterKorWordByKeyword"
                ref="filterKorKeyword"
                @keyup.38="changeUp"
                @keyup.40="changeDown"
                @keyup.enter="Click"
                v-model="keyWord"
            />
        </div>
        <div class="block-search-content" v-if="lstWord && lstWord.length > 0">
            <vue-custom-scrollbar class="scroll-area scroll-custom" :settings="scrollSettings">
                <div class="content-search mCustomScrollbar">
                    <div class="list-content-search open-tab-search">
                        <template v-for="(item,index) in lstWord">
                            <div
                                :key="index"
                                class="item-search"
                                :class="{'tb-item': index == checkindex}"
                                @click="ClickRoute(item[fieldName])"
                            >
                                <div class="name-search">{{item[fieldName]}}</div>
                            </div>
                        </template>
                    </div>
                </div>
            </vue-custom-scrollbar>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    props: {
        typeName: {
            type: null,
        },
        placeholder: {
            type: String,
            default: 'Nhập giá trị',
        },
        value: {
            type: null,
        },
    },
    data() {
        return {
            lstWord: [],
            checkindex: 0,
            keyWord: '',
            fieldName: 'name',
        };
    },
    methods: {
        ...mapActions(['addressSuggest']),
        filterKorWordByKeyword(event) {
            if (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13) return;
            clearTimeout(this.timeDelay);
            this.timeDelay = setTimeout(() => {
                let kw = event.target.value;
                this.$emit('input', kw);
                if (kw.length > 0) {
                    this.addressSuggest({ keyword: kw, type: this.typeName }).then((response) => {
                        this.lstWord = response;
                        if (kw && this.lstWord) {
                            this.lstWord.unshift({
                                districtName: kw,
                                name: kw,
                                provinceName: kw,
                                wardName: kw,
                            });
                        }
                        this.$forceUpdate();
                    });
                } else {
                    this.lstWord = [];
                    this.$forceUpdate();
                }
            }, 100);
        },
        ClickRoute(val) {
            this.keyWord = val;
            this.$emit('input', val);
            this.onClickOutside();
        },
        Click() {
            if (this.lstWord.length) {
                var val = this.lstWord[this.checkindex][this.fieldName];
                this.ClickRoute(val);
            }
        },
        changeDown() {
            this.checkindex++;
            if (this.checkindex > this.lstWord.length) {
                this.checkindex = 0;
            }
        },
        changeUp() {
            this.checkindex--;
            if (this.checkindex < 0) {
                this.checkindex = this.lstWord.length;
            }
        },
        onClickOutside() {
            this.lstWord = null;
        },
    },
    created() {
        this.keyWord = this.value || '';
        if (this.typeName) this.fieldName = this.typeName + 'Name';
    },
};
</script>

<style>
.tb-item .name-search {
    color: #080808;
}

.tb-item {
    background: #d4d4d4;
}

.content-search .mCustomScrollBox {
    border-radius: 15px;
}

.search-control-inner {
    position: relative;
}

input.search-translate {
    position: relative;
}

.search-control-tl {
    overflow: hidden;
}

.list-content-search {
    display: none;
}

.item-search {
    display: block;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-bottom: 1px dashed rgba(170, 175, 170, 0.4);
    padding: 7px 10px;
    cursor: pointer;
}

.list-content-search.open-tab-search {
    display: block;
}

.name-search {
    color: #080808;
    -webkit-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
}

.name-search span {
    font-weight: 400;
}

.menu-educate-child .menu-header__list ul.nav-menu {
    background: transparent;
}

.item-search:last-child {
    border: none;
}

.search-control-inner {
    width: 100%;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    /*border: 1px solid #d4d4d4;*/
    border-radius: 4px;
    -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
        -webkit-box-shadow 0.15s ease-in-out;
}

.block-search-content {
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    min-width: 160px;
    padding: 5px 0;
    margin: 0;
    width: 100%;
    overflow: auto;
    border: 1px solid rgba(0, 0, 0, 0.26);
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
    border-top: none;
    border-radius: 0 0 4px 4px;
    text-align: left;
    list-style: none;
    background: #fff;
    max-height: 250px;
}
</style>