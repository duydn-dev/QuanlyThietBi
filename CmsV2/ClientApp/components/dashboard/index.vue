<template>
    <wrapper>
        <template slot="header">
            <div class="kt-subheader__main">
                <h3 class="kt-subheader__title">Chào mừng bạn đến với hệ thống quản trị!</h3>
            </div>
        </template>
        <div id="kt_content" class="kt-content kt-grid__item kt-grid__item--fluid">
            <div id="kanban2" class="kt-padding-l-10">
                <div class="kanban-container">
                    <template v-for="(menu1, menu1Index) in menuData">
                        <div v-if="checkPermission(menu1)"
                             :key="menu1Index + menu1.link + menu1.title"
                             data-id="_todo"
                             data-order="menu1Index"
                             class="kanban-board"
                             style="width: 250px; margin-left: 0px; margin-right: 0px;">
                            <header class="kanban-board-header primary">
                                <template v-if="menu1.link">
                                    <router-link to="/" class="kt-menu__link">
                                        <div class="kanban-title-board">
                                            <i :class="`kt-menu__link-icon ${menu1.icon}`" />
                                            {{menu1.title}}
                                        </div>
                                    </router-link>
                                </template>
                                <template v-else>
                                    <div class="kanban-title-board">
                                        <i :class="`kt-menu__link-icon ${menu1.icon}`" />
                                        {{menu1.title}}
                                    </div>
                                </template>
                            </header>
                            <main class="kanban-drag" v-if="menu1.childs">
                                <template v-for="(menu2,menu2Index) in menu1.childs">
                                    <template v-if="checkPermission(menu2)">
                                        <template v-if="menu2.link">
                                            <router-link :to="menu2.link"
                                                         class="kt-menu__link"
                                                         :key="menu2Index + menu2.link + menu2.title">
                                                <div class="kanban-item"
                                                     data-class="primary">
                                                    <span class="kt-menu__link-text">{{menu2.title}}</span>
                                                </div>
                                            </router-link>
                                        </template>
                                        <template v-else>
                                            <div class="kanban-item"
                                                 data-class="primary"
                                                 :key="menu2Index + menu2.link + menu2.title">
                                                <span class="kt-menu__link-text">{{menu2.title}}</span>
                                            </div>
                                        </template>
                                        <template v-if="menu2.childs">
                                            <div class="ml-3"
                                                 v-for="(menu3,menu3Index) in menu2.childs"
                                                 :key="menu3Index  + menu3.link + menu3.title">
                                                <template v-if="menu3.link">
                                                    <router-link :to="menu3.link"
                                                                 class="kt-menu__link">
                                                        <div class="kanban-item"
                                                             data-class="info"
                                                             v-if="checkPermission(menu3)">
                                                            <span class="kt-menu__link-text"><i class="fa fa-circle" style="font-size:5px;vertical-align: middle;"></i> {{menu3.title}}</span>
                                                        </div>
                                                    </router-link>
                                                </template>
                                                <template v-else>
                                                    <div class="kanban-item"
                                                         data-class="info"
                                                         v-if="checkPermission(menu3)">
                                                        <span class="kt-menu__link-text">-{{menu3.title}}</span>
                                                    </div>
                                                </template>
                                            </div>
                                        </template>
                                    </template>
                                </template>
                            </main>
                            <footer></footer>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </wrapper>
</template>
<script>
    import { mapGetters } from 'vuex';
    import PermissionMixins from '../../core/mixins/permission';

    export default {
        name: 'DashboardIndex',
        mixins: [PermissionMixins],
        computed: {
            ...mapGetters(['menuData'])
        },
        created() {
            //this.$router.push('/membercare');
        }
    };
</script>
