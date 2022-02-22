<template>
    <div id="select-language">
        <div class="wp-content">
            <div class="kt-head kt-head--skin-dark" style="background-image: url(/img/bg-1.jpg)">
                <h3 class="kt-head__title">
                    Chọn ngôn ngữ
                </h3>
            </div>
            <div class="wp-language">
                <div class="item-language"
                     :class="{ 'select-active': locale == 'vi' }"
                     @click="updateLang('vi');
                        $emit('close',{name: 'Tiếng Việt', url: '/img/flag-vn.png'});">
                    <div class="img-flag">
                        <img src="/img/flag-vn.png" alt="" />
                    </div>
                    <div class="name-language">
                        <h5>
                            <span class="english-name">Vietnamese</span>-<span class="origin-name">Tiếng Việt</span>
                        </h5>
                    </div>
                    <div class="icon-selected">
                        <span><i class="fa fa-check" aria-hidden="true" /></span>
                    </div>
                </div>
                <div class="item-language"
                     :class="{ 'select-active': locale == 'en' }"
                     @click="
                        updateLang('en');
                        $emit('close',{name: 'English', url: '/img/flag-en.png'});
                    ">
                    <div class="img-flag">
                        <img src="/img/flag-en.png" alt="" />
                    </div>
                    <div class="name-language">
                        <h5>
                            <span class="english-name">English</span>-<span class="origin-name">English</span>
                        </h5>
                    </div>
                    <div class="icon-selected">
                        <span><i class="fa fa-check" aria-hidden="true" /></span>
                    </div>
                </div>
                <!--<div class="item-language" :class="{'select-active':locale=='ko'}" @click="updateLang('ko');$emit('close')">
            <div class="img-flag">
                <img src="/images-fix/flag-kr.png" alt="">
            </div>
            <div class="name-language">
                <h5><span class="english-name">Korean</span>-<span class="origin-name">한국어</span></h5>
            </div>
            <div class="icon-selected">
                <span><i class="fa fa-check" aria-hidden="true"></i></span>
            </div>
        </div>
        <div class="item-language" :class="{'select-active':locale=='zh'}" @click="updateLang('zh');$emit('close')">
            <div class="img-flag">
                <img src="/img/flag-cn.png" alt="">
            </div>
            <div class="name-language">
                <h5><span class="english-name">Chinese</span>-<span class="origin-name">中国</span></h5>
            </div>
            <div class="icon-selected">
                <span><i class="fa fa-check" aria-hidden="true"></i></span>
            </div>
        </div>-->
                <div class="item-language"
                     :class="{ 'select-active': locale == 'ja' }"
                     @click="
                        updateLang('ja');
                        $emit('close',{name: '日本語', url: '/img/flag-jp.png'});
                    ">
                    <div class="img-flag">
                        <img src="/img/flag-jp.png" alt="" />
                    </div>
                    <div class="name-language">
                        <h5>
                            <span class="english-name">Japanese</span>-<span class="origin-name">日本語</span>
                        </h5>
                    </div>
                    <div class="icon-selected">
                        <span><i class="fa fa-check" aria-hidden="true" /></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex';
    export default {
        name: 'LanguageSelect',
        computed: {
            ...mapGetters(['locale'])
        },
        methods: {
            ...mapActions(['setLang']),
            updateLang(lang) {
                this.setLang(lang);
                window.location.reload();
            }
        },
        created() {
            if (this.locale == 'vi')
                this.$emit('close', { name: 'Việt Nam', url: '/img/flag-vn.png' });
            else if (this.locale == 'en')
                this.$emit('close', { name: 'English', url: '/img/flag-en.png' });
            else if (this.locale == 'ja')
                this.$emit('close', { name: '日本語', url: '/img/flag-jp.png' });
        }
    };
</script>
<style scoped>
    #select-language {
        background-color: #f2f2f2;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

        #select-language .wp-content {
            width: 400px;
        }

            #select-language .wp-content .wp-language {
                box-shadow: 0px 0px 13px #f1f1f1;
            }

        #select-language .title-sl {
            border-radius: 3px;
            display: flex;
            padding: 7px 35px;
            align-items: center;
            background-color: #393c41;
            color: #e8e7e7;
            justify-content: space-between;
        }

            #select-language .title-sl h5 {
                font-size: 15px;
            }

            #select-language .title-sl .icon i {
                font-size: 12px;
            }

        #select-language .item-language {
            display: flex;
            align-items: center;
            padding: 7px 35px;
            justify-content: space-between;
            background-color: white;
            transition: 0.2s;
        }

            #select-language .item-language:hover {
                cursor: pointer;
                background-color: #4ebcf1;
                color: white;
            }

            #select-language .item-language.select-active {
                background-color: #4ebcf1;
                color: white;
            }

            #select-language .item-language .img-flag {
                width: 30px;
            }

                #select-language .item-language .img-flag img {
                    width: 100%;
                    border-radius: 2px;
                    border: solid 1px #f1f1f1;
                }

            #select-language .item-language:hover .img-flag img,
            #select-language .item-language.select-active .img-flag img {
                border-color: transparent;
            }

            #select-language .item-language .name-language {
                flex: 1;
                padding-left: 20px;
            }

                #select-language .item-language .name-language h5 {
                    line-height: 20px;
                }

                #select-language .item-language .name-language span {
                    margin: 0px 8px;
                }

            #select-language .item-language .icon-selected i {
                color: white;
            }

    @media (max-width: 767px) {
        #select-language .wp-content {
            width: 100%;
        }
    }
</style>