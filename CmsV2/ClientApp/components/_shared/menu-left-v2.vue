<template>
  <div
    class="kt-aside kt-aside--fixed kt-grid__item kt-grid kt-grid--desktop kt-grid--hor-desktop"
    id="kt_aside"
  >
    <!-- begin:: Aside Menu -->
    <div
      class="kt-aside__brand kt-grid__item"
      id="kt_aside_brand"
    >
      <div class="kt-aside__brand-logo">
        <RouterLink
          :to="`/dashboard/labor-member`"
          v-if="isPermission(['ViewDashboardLaborGeneral'])"
        >{{ appSettings.currentCompany.name }}</RouterLink>
        <RouterLink
          :to="`/dashboard/abroad-member`"
          v-else-if="isPermission(['ViewDashboardAbroadGeneral'])"
        >{{ appSettings.currentCompany.name }}</RouterLink>
        <RouterLink
          :to="`/`"
          v-else
        >{{ appSettings.currentCompany.name }}</RouterLink>
      </div>

      <div class="kt-aside__brand-tools">
        <button
          class="kt-aside__brand-aside-toggler"
          id="kt_aside_toggler"
          @click="togglerMenu()"
        >
          <span>
            <i class="fa fa-bars"></i>
          </span>
          <span>
            <i class="fa fa-bars"></i>
          </span>
        </button>

        <!--<button class="kt-aside__brand-aside-toggler kt-aside__brand-aside-toggler--left" id="kt_aside_toggler"><span></span></button>-->
      </div>
    </div>
    <div
      class="kt-aside-menu-wrapper kt-grid__item kt-grid__item--fluid"
      id="kt_aside_menu_wrapper"
    >
      <!--@mouseover="showMenu"
            @mouseout="hideMenu"-->
      <div
        id="kt_aside_menu"
        class="kt-aside-menu kt-scroll"
        data-ktmenu-vertical="1"
        data-ktmenu-scroll="1"
        data-ktmenu-dropdown-timeout="500"
      >
        <ul class="kt-menu__nav">
          <template v-for="(menu1, menu1Index) in menuList">
            <li
              class="kt-menu__section"
              :key="menu1Index"
              v-if="checkPermission(menu1) && menu1.title"
            >
              <h4 class="kt-menu__section-text">{{ menu1.title }}</h4>
              <i class="kt-menu__section-icon flaticon-more-v2"></i>
            </li>
            <menuSelectUser
              :key="`calendar_container_${menu1Index}`"
              v-if="
                                menu1.name == 'containerCalendar' &&
                                isPermission(['AddCalendarOtherPeople'])
                            "
            />
            <template v-for="(menu2, menu2Index) in menu1.childs">
              <li
                class="kt-menu__item kt-menu__item--submenu"
                :class="{
                                    'kt-menu__item--open': !menu2.open, //&& (menu2.name == 'calendar')
                                }"
                :key="menu1Index + '_' + menu2Index"
                v-if="checkPermission(menu2)"
              >
                <a
                  href="javascript:;"
                  class="kt-menu__link kt-menu__toggle"
                  v-if="
                                   (menu2.childs && menu2.childs.length>
                                    0) ||
                                    menu2.name == 'calendar'
                                    "
                  @click="openMenuSubGroup(menu1Index, menu2Index)"
                >
                  <span class="kt-menu__link-icon">
                    <i :class="`fa fa-${menu2.icon}`" />
                  </span>
                  <span class="kt-menu__link-text">{{ menu2.title }}</span>
                  <i class="kt-menu__ver-arrow la la-angle-right"></i>
                </a>
                <router-link
                  :to="menu2.link"
                  class="kt-menu__link kt-menu__toggle"
                  v-else
                >
                  <span class="kt-menu__link-icon">
                    <i :class="`fa fa-${menu2.icon}`" />
                  </span>
                  <span class="kt-menu__link-text">{{ menu2.title }} </span>
                  <!-- number badge -->
                  <div
                    v-if="menu2.isNewsMenu && badge[menu2.menuName]"
                    class="badge-menu"
                  >
                    <span class="badge bg-primary text-white">{{badge[menu2.menuName]}}</span>
                  </div>
                </router-link>
                <div
                  class="kt-menu__submenu"
                  v-if="menu2.childs && menu2.childs.length > 0"
                >
                  <span class="kt-menu__arrow"></span>
                  <ul class="kt-menu__subnav">
                    <li
                      class="kt-menu__item kt-menu__item--parent"
                      aria-haspopup="true"
                    >
                      <span class="kt-menu__link">
                        <span class="kt-menu__link-text">
                          {{
                                                    menu2.title
                                                    }}
                        </span>
                      </span>
                    </li>
                    <template v-for="(menu3, menu3Index) in menu2.childs">
                      <li
                        class="kt-menu__item"
                        v-if="checkPermission(menu3)"
                        :key="menu1Index + '_' + menu3Index"
                      >
                        <router-link
                          :to="menu3.link"
                          class="kt-menu__link"
                          v-if="menu3.link"
                        >
                          <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                            <span></span>
                          </i>
                          <span class="kt-menu__link-text">
                            {{
                                                        menu3.title
                                                        }}
                          </span>

                        </router-link>
                      </li>
                    </template>
                  </ul>
                </div>

                <div
                  class="kt-menu__submenu"
                  v-else-if="menu2.name == 'calendar'"
                >
                  <span class="kt-menu__arrow"></span>
                  <ul class="kt-menu__subnav">
                    <li
                      class="kt-menu__item kt-menu__item--parent"
                      aria-haspopup="true"
                    >
                      <span class="kt-menu__link">
                        <span class="kt-menu__link-text">
                          {{
                                                    menu2.title
                                                    }}
                        </span>
                      </span>
                    </li>
                    <li class="kt-menu__item">
                      <router-link
                        :to="`${menu2.link}`"
                        class="kt-menu__link"
                      >
                        <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                          <span></span>
                        </i>
                        <span class="kt-menu__link-text">Tất cả</span>
                      </router-link>
                    </li>
                    <template v-for="menu3 in lstCalendarGroup">
                      <li
                        class="kt-menu__item calendar-type-container"
                        :key="menu1Index + '_' + menu3.id"
                      >
                        <router-link
                          :to="`${menu2.link}/${menu3.id}`"
                          class="kt-menu__link"
                        >
                          <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                            <span></span>
                          </i>
                          <span class="kt-menu__link-text">
                            {{
                                                        menu3.name
                                                        }}
                          </span>
                        </router-link>
                        <span
                          class="calendar-type-edit"
                          @click="openAddCalendarGroup(menu3.id)"
                        >
                          <i class="far fa-edit"></i>
                        </span>
                      </li>
                    </template>
                    <li class="kt-menu__item">
                      <a
                        href="javascript:;"
                        class="kt-menu__link"
                        @click="openAddCalendarGroup(0)"
                      >
                        <span
                          class="kt-menu__link-text"
                          style="color: #5867dd"
                        >Thêm loại</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </template>
          </template>
        </ul>
      </div>
      <div
        class="sidebar-footer"
        :class="{ 'is-system': appSettings.currentCompany.isSystem }"
      >
        <a
          href="javascript:;"
          class="link"
          @click="dropDown(1)"
          style="padding-top: 5px"
        >
          <avatar
            :src="currentUser.avatar"
            :username="currentUser.fullName"
            css-class="kt-header__topbar-icon kt-hidden-"
            :size="28"
          />
        </a>
        <a
          href="javascript:;"
          class="link"
          @click="dropDown(2)"
        >
          <span
            class="svg-icon svg-icon-xl svg-icon-primary"
            style="background: rgb(214 238 249); border-radius: 50%; padding: 2px 3px; "
          >
            <!--begin::Svg Icon | path:/metronic/theme/html/demo1/dist/assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="24px"
              height="24px"
              viewBox="0 0 24 28"
              version="1.1"
            >
              <g
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <rect
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                ></rect>
                <rect
                  fill="#000000"
                  x="4"
                  y="4"
                  width="7"
                  height="7"
                  rx="1.5"
                ></rect>
                <path
                  d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z"
                  fill="#000000"
                  opacity="0.3"
                ></path>
              </g>
            </svg>
            <!--end::Svg Icon-->
          </span>
        </a>
        <a
          href="javascript:;"
          class="link"
        >
          <fireBase @show="dropDown(-1)" />
        </a>
        <!--<a href="javascript:;" class="link">
        <fireBase @show="dropDown(-1)" />
    </a>-->

        <a
          href="javascript:;"
          class="link"
          @click="triggerClick('openCompanyPopup')"
          style="padding-top: 5px"
          v-if="appSettings.companies && appSettings.currentCompany.isSystem"
        >
          <avatar
            :src="currentCompany.logo"
            :username="currentCompany.name"
            css-class="kt-badge kt-badge--xl"
            :size="30"
          />
        </a>
        <div
          class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-xl"
          :class="{ show: menuIndex == 1 }"
          @mouseover="menuIndex = 1"
          @mouseout="menuIndex = -1"
        >
          <div
            class="kt-user-card kt-user-card--skin-dark kt-notification-item-padding-x pt-3 pb-3"
            style="background-image: url(/assets/media/misc/bg-1.jpg)"
          >
            <div class="kt-user-card__avatar">
              <avatar
                :src="currentUser.avatar"
                :username="currentUser.fullName"
                css-class="kt-badge kt-badge--lg kt-badge--rounded kt-badge--bold kt-font-success"
                :size="50"
              />
            </div>
            <div class="kt-user-card__name">{{ currentUser.fullName }}</div>
          </div>
          <div class="kt-notification">
            <a
              href="javascript:;"
              class="kt-notification__item"
              @click="triggerClick('openChangePassPopup')"
            >
              <div class="kt-notification__item-icon">
                <i class="flaticon2-lock kt-font-success" />
              </div>
              <div class="kt-notification__item-details">
                <div class="kt-notification__item-title kt-font-bold">
                  Đổi mật khẩu
                </div>
              </div>
            </a>
            <a
              href="javascript:;"
              class="kt-notification__item"
              @click="signOut"
            >
              <div class="kt-notification__item-icon">
                <i class="flaticon2-power kt-font-warning" />
              </div>
              <div class="kt-notification__item-details">
                <div class="kt-notification__item-title kt-font-bold">Thoát</div>
              </div>
            </a>
          </div>
        </div>
        <div
          class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-xl"
          style="width:500px"
          :class="{ show: menuIndex == 2 }"
          @mouseover="menuIndex = 2"
          @mouseout="menuIndex = -1"
        >
          <div
            class="d-flex flex-column flex-center py-10 bgi-size-cover bgi-no-repeat rounded-top"
            style="background-image: url(/assets/media/misc/bg-1.jpg); background-size:cover"
          >
            <h4 class="text-white font-weight-bold">
              O2WORK
            </h4>
          </div>
          <!--end:Header-->
          <!--begin:Nav-->
          <div class="row row-paddingless">
            <!--begin:Item-->
            <template v-for="(b,i) in blocks">
              <div
                class="col-4"
                :key="i"
                :class="{'lock': !b.isAllow}"
              >
                <a
                  href="javascript:;"
                  @click="switchBlock(b)"
                  class="d-block py-10 text-center bg-hover-light border-right border-bottom"
                >
                  <span class="svg-icon svg-icon-3x svg-icon-success">
                    <i
                      :class="`fas fa-${b.icon}`"
                      style="font-size:30px"
                    />
                  </span>
                  <span
                    class="d-block text-dark-75 font-weight-bold font-size-h6 mt-2 mb-1"
                    style="color:#626161"
                  >{{b.title}}</span>
                </a>
              </div>
            </template>
            <!--end:Item-->
          </div>
        </div>
      </div>
    </div>
    <!-- end:: Aside Menu -->
    <calendarGroupUpdate
      :isModalHeader="true"
      :type="1"
      @close="closeAddCalendarGroup"
      v-if="isShowAddCalendarGroup"
      :id="currentCalendarGroupId"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import PermissionMixins from '../../core/mixins/permission';
import { getCookie, setCookie } from '../../core/utils/index';
import fireBase from '../_common/firebase';
export default {
    components: {fireBase },
    mixins: [PermissionMixins],
    props: {
        open: {
            type: Boolean,
            default: true
        },
        docked: {
            type: Boolean,
            default: true
        },
        showMenuMobile: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            menuVal: '#/',
            versions: [],
            menuStates: new Object(),
            isShowMenu: true,
            menuIndex: -1,
            lstCalendarGroup: null,
            isShowAddCalendarGroup: false,
            currentCalendarGroupId: 0,
            isShowChoiceUser: false,
            badge: {}
        };
    },
    computed: {
        ...mapGetters([
            'permissions',
            'userPermissions',
            'menuList',
            'isShowMainMenu',
            'menuData',
            'blocks',
            'blocks'
        ]),
        lang() {
            return Vue.config.lang;
        },
        currentCompany() {
            if (this.appSettings.companies) {
                return _.find(this.appSettings.companies, ['id', this.appSettings.CompanyId]);
            }
            return this.appSettings.currentCompany;
        }
    },
    methods: {
        ...mapActions([
            'showMainMenu',
            'logOut',
            'getListCalendarGroup',
            'showSetMenuByBlock',
            'getCountList',
            'showSetMenuByBlock'
        ]),
        ...mapMutations(['setMenuAllow', 'setMenuList']),
        dropDown(index) {
            if (this.menuIndex == index) this.menuIndex = -1;
            else this.menuIndex = index;
        },
        signOut() {
            let token = localStorage.getItem(this.CONSTANTS.FIREBASE_TOKEN);
            if (token) this.fireBaseRemoveToken(token);
            this.logOut().then(() => {
                this.$router.push(`/login`);
            });
        },
        togglerMenu(isTrue) {
            document.getElementsByTagName('body')[0].classList.remove('kt-aside--minimize-hover');
            this.isShowMenu = isTrue || !this.isShowMenu;
            setCookie('isShowMenu', this.isShowMenu ? 1 : 0, 100);
            if (this.isShowMenu) this.showMenu();
            else this.hideMenu();
        },
        showMenu() {
            document.getElementsByTagName('body')[0].classList.remove('kt-aside--minimize');
            if (!this.isShowMenu)
                document.getElementsByTagName('body')[0].classList.add('kt-aside--minimize-hover');
            this.showMainMenu();
        },
        hideMenu() {
            if (!this.isShowMenu) {
                document.getElementsByTagName('body')[0].classList.add('kt-aside--minimize');
            }
            document.getElementsByTagName('body')[0].classList.remove('kt-aside--minimize-hover');
        },
        openMenuGroup(index) {
            this._.each(this.menuList, (menu, menuIndex) => {
                if (menuIndex != index) this.$set(this.menuList[menuIndex], 'open', false);
            });
            this.$set(this.menuList[index], 'open', !this.menuList[index].open);
        },
        openMenuSubGroup(menu1Index, menu2Index) {
            //this._.each(this.menuList[menu1Index].childs, (menu, menuIndex) => {
            //    if (menuIndex != menu2Index) {
            //        this.$set(this.menuList[menu1Index].childs[menuIndex], 'open', false);
            //    }
            //});

            if (this.isShowMenu)
                this.$set(
                    this.menuList[menu1Index].childs[menu2Index],
                    'open',
                    !this.menuList[menu1Index].childs[menu2Index].open
                );
            else this.togglerMenu(true);
        },
        openAddCalendarGroup(id) {
            this.currentCalendarGroupId = id;
            this.isShowAddCalendarGroup = true;
        },
        closeAddCalendarGroup(isReload) {
            this.isShowAddCalendarGroup = false;
            if (isReload) this.getCalendarGroup();
        },
        getCalendarGroup() {
            let filter = { type: 1, pageIndex: 0 };
            if (this.calendarCurrentUser) filter.currentUserId = this.calendarCurrentUser.id;
            this.getListCalendarGroup(filter).then(data => {
                this.lstCalendarGroup = data;
            });
        },
        initMenu(isWatch) {
            var listMenuAllow = [];
            for (let m of this.menuData) {
                if (this.checkPermission(m)) listMenuAllow.push(m);
            }
            this.setMenuAllow(listMenuAllow);
            if (isWatch || !this.menuList || this.menuList.length === 0) {
                var fullUrl = this.$route.path;
                var url = '';
                var url2 = '';
                if (this.$route.params) {
                    for (let p in this.$route.params) {
                        url = fullUrl.replace(`/${this.$route.params[p]}`, '');
                    }
                    if (url && url.split('/').length > 1) url2 = url.split('/')[1];
                }
                var index = listMenuAllow
                    .map(element => {
                        return {
                            ...element,
                            childs: element.childs.filter(subElement => subElement.link === fullUrl)
                        };
                    })
                    .findIndex(k => k.childs.length > 0);

                if (index === -1)
                    index = listMenuAllow
                        .map(element => {
                            return {
                                ...element,
                                childs: element.childs.filter(
                                    subElement =>
                                        url &&
                                        url !== '/' &&
                                        (subElement.link === url ||
                                            (subElement.link && subElement.link.includes(url2)))
                                )
                            };
                        })
                        .findIndex(k => k.childs.length > 0);

                if (index === -1) index = 1;
                this.setMenuList(listMenuAllow.filter(k => k.block === listMenuAllow[index].block));
            }
        },
        toggleMenu(index) {
            if (index == this.menuIndex) index = -1;
            this.menuIndex = index;
        },
        switchBlock(b) {
            if (!b.isAllow) return;
            this.menuIndex = -1;
            this.showSetMenuByBlock(b.block);
        }
    },
    watch: {
        isShowMainMenu() {
            this.isShowMenu = this.isShowMainMenu;
            if (!this.isShowMainMenu) this.hideMenu();
        },
        calendarCurrentUser() {
            this.getCalendarGroup();
        },
        $route() {
            this.initMenu(true);
        }
    },
    created() {
        var t = getCookie('isShowMenu');
        if (t == '1') {
            this.isShowMenu = true;
            this.showMenu();
        } else if (t == '0') {
            this.isShowMenu = false;
            this.hideMenu();
        } else this.showMenu();

        _.each(this.menuList, (m, index) => {
            _.each(this.menuList[index].childs, (m2, menuIndex) => {
                if (m2.childs) this.$set(this.menuList[index].childs[menuIndex], 'open', true);
            });
        });

        this.getCalendarGroup();
        this.initMenu();

        const permission = this.userPermissions
            .filter(n => n.code == 'Reporter' || n.code == 'Editor' || n.code == 'Secretary')
            .map(n => n.code);
        let zoneIds = this.zoneIdsByPermission(
            permission,
            this.permissionZones,
            this.currentUser.id
        );
        this.getCountList({
            createdBy: this.currentUser.id,
            ZoneIds: zoneIds,
            sendBy: this.currentUser.id,
            receivedBy: this.currentUser.id
        }).then(response => {
            this.badge = response;
        });
    }
};
</script>
<style scoped>
.lock {
    opacity: 0.5;
    cursor: not-allowed !important;
}

.lock a {
    cursor: not-allowed !important;
}
</style>
<style>
#kt_aside_menu {
    height: calc(100vh - 80px);
    overflow: auto;
}

#kt_aside_menu::-webkit-scrollbar {
    width: 6px;
    background: rgba(0, 0, 0, 0);
}

#kt_aside_menu::-webkit-scrollbar-thumb {
    background-color: #d0d6da;
}

.kt-aside-menu
    .kt-menu__nav
    > .kt-menu__item
    > .kt-menu__submenu
    .kt-menu__subnav
    > .kt-menu__item
    > .kt-menu__submenu
    .kt-menu__subnav
    > .kt-menu__item
    > .kt-menu__link {
    padding-right: 30px;
}

.kt-aside__brand-aside-toggler {
    font-size: 20px;
    cursor: pointer;
    color: #9a2937;
}

.kt-aside--minimize .kt-aside__brand-aside-toggler {
    color: #fff !important;
}

.sidebar-footer {
    position: fixed;
    bottom: 0px;
    left: 0px;
    transition: 0.2s ease-out;
    width: 220px;
    background: #fff;
    border-top: 1px solid rgba(120, 130, 140, 0.13);
}

.sidebar-footer > a {
    padding: 8px 10px;
    width: 33.333337%;
    float: left;
    text-align: center;
    font-size: 24px;
}

.is-system > a {
    padding: 8px 10px;
    width: 25%;
    font-size: 24px;
}

.kt-aside--minimize .sidebar-footer {
    width: 70px;
}

.kt-aside--minimize .sidebar-footer a {
    width: 100%;
}

.sidebar-footer a > div {
    display: inline-block;
}

.sidebar-footer > a:last-child {
    padding-top: 5px;
}

.kt-aside--minimize #kt_aside_menu {
    height: calc(100vh - 200px);
}

.sidebar-footer .dropdown-menu {
    position: absolute;
    left: 0;
    bottom: 100%;
    top: unset;
    width: 220px;
    -webkit-animation: scale-up-ver-bottom 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    animation: scale-up-ver-bottom 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}
</style>