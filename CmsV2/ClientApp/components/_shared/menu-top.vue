<template>
    <div id="kt_header" class="kt-header kt-grid kt-grid--ver kt-header--fixed">
        <!-- begin:: Aside -->
        <!--<div id="kt_header_brand" class="kt-header__brand kt-grid__item">
            <div class="kt-header__brand-logo">
                <a href="/">
                    <img src="/assets/logos/logo_white_2.png" />
                </a>
            </div>
        </div>-->

        <!-- end:: Aside -->
        <!-- begin:: Title -->
        <h3 class="kt-header__title kt-grid__item">{{ currentCompany.name }}</h3>

        <!-- end:: Title -->
        <!-- begin: Header Menu -->
        <button id="kt_header_menu_mobile_close_btn" class="kt-header-menu-wrapper-close">
            <i class="la la-close" />
        </button>
        <div
            id="kt_header_menu_wrapper"
            class="kt-header-menu-wrapper kt-grid__item kt-grid__item--fluid"
        >
            <div
                id="kt_header_menu"
                class="kt-header-menu kt-header-menu-mobile kt-header-menu--layout-default"
            >
                <ul v-if="false" class="kt-menu__nav">
                    <li class="kt-menu__item kt-menu__item--active" aria-haspopup="true">
                        <a href="/" class="kt-menu__link">
                            <span class="kt-menu__link-text">Dashboard</span>
                        </a>
                    </li>
                    <li
                        class="kt-menu__item kt-menu__item--submenu kt-menu__item--rel"
                        data-ktmenu-submenu-toggle="click"
                        aria-haspopup="true"
                    >
                        <a href="javascript:;" class="kt-menu__link kt-menu__toggle">
                            <span class="kt-menu__link-text">Pages</span>
                            <i class="kt-menu__hor-arrow la la-angle-down" />
                            <i class="kt-menu__ver-arrow la la-angle-right" />
                        </a>
                        <div
                            class="kt-menu__submenu kt-menu__submenu--classic kt-menu__submenu--left"
                        >
                            <ul class="kt-menu__subnav">
                                <li class="kt-menu__item" aria-haspopup="true">
                                    <a href="javascript:;" class="kt-menu__link">
                                        <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                            <span />
                                        </i>
                                        <span class="kt-menu__link-text">Create New Post</span>
                                    </a>
                                </li>
                                <li class="kt-menu__item" aria-haspopup="true">
                                    <a href="#" class="kt-menu__link">
                                        <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                            <span />
                                        </i>
                                        <span class="kt-menu__link-text">Generate Reports</span>
                                        <span class="kt-menu__link-badge">
                                            <span class="kt-badge kt-badge--success">2</span>
                                        </span>
                                    </a>
                                </li>
                                <li
                                    class="kt-menu__item kt-menu__item--submenu"
                                    data-ktmenu-submenu-toggle="hover"
                                    aria-haspopup="true"
                                >
                                    <a href="#" class="kt-menu__link kt-menu__toggle">
                                        <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                            <span />
                                        </i>
                                        <span class="kt-menu__link-text">Manage Orders</span>
                                        <i class="kt-menu__hor-arrow la la-angle-right" />
                                        <i class="kt-menu__ver-arrow la la-angle-right" />
                                    </a>
                                    <div
                                        class="kt-menu__submenu kt-menu__submenu--classic kt-menu__submenu--right"
                                    >
                                        <ul class="kt-menu__subnav">
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <span class="kt-menu__link-text">Latest Orders</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <span class="kt-menu__link-text">Pending Orders</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <span
                                                        class="kt-menu__link-text"
                                                    >Processed Orders</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <span
                                                        class="kt-menu__link-text"
                                                    >Delivery Reports</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <span class="kt-menu__link-text">Payments</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <span class="kt-menu__link-text">Customers</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li
                                    class="kt-menu__item kt-menu__item--submenu"
                                    data-ktmenu-submenu-toggle="hover"
                                    aria-haspopup="true"
                                >
                                    <a href="#" class="kt-menu__link kt-menu__toggle">
                                        <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                            <span />
                                        </i>
                                        <span class="kt-menu__link-text">Customer Feedbacks</span>
                                        <i class="kt-menu__hor-arrow la la-angle-right" />
                                        <i class="kt-menu__ver-arrow la la-angle-right" />
                                    </a>
                                    <div
                                        class="kt-menu__submenu kt-menu__submenu--classic kt-menu__submenu--right"
                                    >
                                        <ul class="kt-menu__subnav">
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <span
                                                        class="kt-menu__link-text"
                                                    >Customer Feedbacks</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <span
                                                        class="kt-menu__link-text"
                                                    >Supplier Feedbacks</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <span
                                                        class="kt-menu__link-text"
                                                    >Reviewed Feedbacks</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <span
                                                        class="kt-menu__link-text"
                                                    >Resolved Feedbacks</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <span
                                                        class="kt-menu__link-text"
                                                    >Feedback Reports</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="kt-menu__item" aria-haspopup="true">
                                    <a href="#" class="kt-menu__link">
                                        <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                            <span />
                                        </i>
                                        <span class="kt-menu__link-text">Register Member</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li
                        class="kt-menu__item kt-menu__item--submenu kt-menu__item--rel"
                        data-ktmenu-submenu-toggle="click"
                        aria-haspopup="true"
                    >
                        <a href="javascript:;" class="kt-menu__link kt-menu__toggle">
                            <span class="kt-menu__link-text">Reports</span>
                            <i class="kt-menu__hor-arrow la la-angle-down" />
                            <i class="kt-menu__ver-arrow la la-angle-right" />
                        </a>
                        <div
                            class="kt-menu__submenu kt-menu__submenu--fixed kt-menu__submenu--left"
                            style="width:1000px"
                        >
                            <div class="kt-menu__subnav">
                                <ul class="kt-menu__content">
                                    <li class="kt-menu__item">
                                        <h3 class="kt-menu__heading kt-menu__toggle">
                                            <i
                                                class="kt-menu__link-bullet kt-menu__link-bullet--dot"
                                            >
                                                <span />
                                            </i>
                                            <span class="kt-menu__link-text">Finance Reports</span>
                                            <i class="kt-menu__ver-arrow la la-angle-right" />
                                        </h3>
                                        <ul class="kt-menu__inner">
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i class="kt-menu__link-icon flaticon-map" />
                                                    <span class="kt-menu__link-text">Annual Reports</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i class="kt-menu__link-icon flaticon-user" />
                                                    <span class="kt-menu__link-text">HR Reports</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i
                                                        class="kt-menu__link-icon flaticon-clipboard"
                                                    />
                                                    <span class="kt-menu__link-text">IPO Reports</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i
                                                        class="kt-menu__link-icon flaticon-graphic-1"
                                                    />
                                                    <span class="kt-menu__link-text">Finance Margins</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i
                                                        class="kt-menu__link-icon flaticon-graphic-2"
                                                    />
                                                    <span class="kt-menu__link-text">Revenue Reports</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="kt-menu__item">
                                        <h3 class="kt-menu__heading kt-menu__toggle">
                                            <i
                                                class="kt-menu__link-bullet kt-menu__link-bullet--dot"
                                            >
                                                <span />
                                            </i>
                                            <span class="kt-menu__link-text">Project Reports</span>
                                            <i class="kt-menu__ver-arrow la la-angle-right" />
                                        </h3>
                                        <ul class="kt-menu__inner">
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i
                                                        class="kt-menu__link-bullet kt-menu__link-bullet--line"
                                                    >
                                                        <span />
                                                    </i>
                                                    <span class="kt-menu__link-text">Coca Cola CRM</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i
                                                        class="kt-menu__link-bullet kt-menu__link-bullet--line"
                                                    >
                                                        <span />
                                                    </i>
                                                    <span
                                                        class="kt-menu__link-text"
                                                    >Delta Airlines Booking Site</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i
                                                        class="kt-menu__link-bullet kt-menu__link-bullet--line"
                                                    >
                                                        <span />
                                                    </i>
                                                    <span
                                                        class="kt-menu__link-text"
                                                    >Malibu Accounting</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i
                                                        class="kt-menu__link-bullet kt-menu__link-bullet--line"
                                                    >
                                                        <span />
                                                    </i>
                                                    <span
                                                        class="kt-menu__link-text"
                                                    >Vineseed Website Rewamp</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i
                                                        class="kt-menu__link-bullet kt-menu__link-bullet--line"
                                                    >
                                                        <span />
                                                    </i>
                                                    <span
                                                        class="kt-menu__link-text"
                                                    >Zircon Mobile App</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i
                                                        class="kt-menu__link-bullet kt-menu__link-bullet--line"
                                                    >
                                                        <span />
                                                    </i>
                                                    <span class="kt-menu__link-text">Mercury CMS</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="kt-menu__item">
                                        <h3 class="kt-menu__heading kt-menu__toggle">
                                            <i
                                                class="kt-menu__link-bullet kt-menu__link-bullet--dot"
                                            >
                                                <span />
                                            </i>
                                            <span class="kt-menu__link-text">HR Reports</span>
                                            <i class="kt-menu__ver-arrow la la-angle-right" />
                                        </h3>
                                        <ul class="kt-menu__inner">
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i
                                                        class="kt-menu__link-bullet kt-menu__link-bullet--dot"
                                                    >
                                                        <span />
                                                    </i>
                                                    <span class="kt-menu__link-text">Staff Directory</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i
                                                        class="kt-menu__link-bullet kt-menu__link-bullet--dot"
                                                    >
                                                        <span />
                                                    </i>
                                                    <span
                                                        class="kt-menu__link-text"
                                                    >Client Directory</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i
                                                        class="kt-menu__link-bullet kt-menu__link-bullet--dot"
                                                    >
                                                        <span />
                                                    </i>
                                                    <span class="kt-menu__link-text">Salary Reports</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i
                                                        class="kt-menu__link-bullet kt-menu__link-bullet--dot"
                                                    >
                                                        <span />
                                                    </i>
                                                    <span class="kt-menu__link-text">Staff Payslips</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i
                                                        class="kt-menu__link-bullet kt-menu__link-bullet--dot"
                                                    >
                                                        <span />
                                                    </i>
                                                    <span
                                                        class="kt-menu__link-text"
                                                    >Corporate Expenses</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i
                                                        class="kt-menu__link-bullet kt-menu__link-bullet--dot"
                                                    >
                                                        <span />
                                                    </i>
                                                    <span
                                                        class="kt-menu__link-text"
                                                    >Project Expenses</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="kt-menu__item">
                                        <h3 class="kt-menu__heading kt-menu__toggle">
                                            <i
                                                class="kt-menu__link-bullet kt-menu__link-bullet--dot"
                                            >
                                                <span />
                                            </i>
                                            <span class="kt-menu__link-text">Reporting Apps</span>
                                            <i class="kt-menu__ver-arrow la la-angle-right" />
                                        </h3>
                                        <ul class="kt-menu__inner">
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <span
                                                        class="kt-menu__link-text"
                                                    >Report Adjusments</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <span
                                                        class="kt-menu__link-text"
                                                    >Sources & Mediums</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <span
                                                        class="kt-menu__link-text"
                                                    >Reporting Settings</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <span class="kt-menu__link-text">Conversions</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <span class="kt-menu__link-text">Report Flows</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <span class="kt-menu__link-text">Audit & Logs</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li
                        class="kt-menu__item kt-menu__item--submenu kt-menu__item--rel"
                        data-ktmenu-submenu-toggle="click"
                        aria-haspopup="true"
                    >
                        <a href="javascript:;" class="kt-menu__link kt-menu__toggle">
                            <span class="kt-menu__link-text">Apps</span>
                            <i class="kt-menu__hor-arrow la la-angle-down" />
                            <i class="kt-menu__ver-arrow la la-angle-right" />
                        </a>
                        <div
                            class="kt-menu__submenu kt-menu__submenu--classic kt-menu__submenu--left"
                        >
                            <ul class="kt-menu__subnav">
                                <li class="kt-menu__item" aria-haspopup="true">
                                    <a href="#" class="kt-menu__link">
                                        <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                            <span />
                                        </i>
                                        <span class="kt-menu__link-text">eCommerce</span>
                                    </a>
                                </li>
                                <li
                                    class="kt-menu__item kt-menu__item--submenu"
                                    data-ktmenu-submenu-toggle="hover"
                                    aria-haspopup="true"
                                >
                                    <a href="#" class="kt-menu__link kt-menu__toggle">
                                        <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                            <span />
                                        </i>
                                        <span class="kt-menu__link-text">Audience</span>
                                        <i class="kt-menu__hor-arrow la la-angle-right" />
                                        <i class="kt-menu__ver-arrow la la-angle-right" />
                                    </a>
                                    <div
                                        class="kt-menu__submenu kt-menu__submenu--classic kt-menu__submenu--right"
                                    >
                                        <ul class="kt-menu__subnav">
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i class="kt-menu__link-icon flaticon-users" />
                                                    <span class="kt-menu__link-text">Active Users</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i
                                                        class="kt-menu__link-icon flaticon-interface-1"
                                                    />
                                                    <span class="kt-menu__link-text">User Explorer</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i
                                                        class="kt-menu__link-icon flaticon-lifebuoy"
                                                    />
                                                    <span class="kt-menu__link-text">Users Flows</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i
                                                        class="kt-menu__link-icon flaticon-graphic-1"
                                                    />
                                                    <span class="kt-menu__link-text">Market Segments</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i class="kt-menu__link-icon flaticon-graphic" />
                                                    <span class="kt-menu__link-text">User Reports</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="kt-menu__item" aria-haspopup="true">
                                    <a href="#" class="kt-menu__link">
                                        <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                            <span />
                                        </i>
                                        <span class="kt-menu__link-text">Marketing</span>
                                    </a>
                                </li>
                                <li class="kt-menu__item" aria-haspopup="true">
                                    <a href="#" class="kt-menu__link">
                                        <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                            <span />
                                        </i>
                                        <span class="kt-menu__link-text">Campaigns</span>
                                        <span class="kt-menu__link-badge">
                                            <span class="kt-badge kt-badge--success">3</span>
                                        </span>
                                    </a>
                                </li>
                                <li
                                    class="kt-menu__item kt-menu__item--submenu"
                                    data-ktmenu-submenu-toggle="hover"
                                    aria-haspopup="true"
                                >
                                    <a href="#" class="kt-menu__link kt-menu__toggle">
                                        <i class="kt-menu__link-bullet kt-menu__link-bullet--dot">
                                            <span />
                                        </i>
                                        <span class="kt-menu__link-text">Cloud Manager</span>
                                        <i class="kt-menu__hor-arrow la la-angle-right" />
                                        <i class="kt-menu__ver-arrow la la-angle-right" />
                                    </a>
                                    <div
                                        class="kt-menu__submenu kt-menu__submenu--classic kt-menu__submenu--right"
                                    >
                                        <ul class="kt-menu__subnav">
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i class="kt-menu__link-icon flaticon-add" />
                                                    <span class="kt-menu__link-text">File Upload</span>
                                                    <span class="kt-menu__link-badge">
                                                        <span class="kt-badge kt-badge--danger">3</span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i class="kt-menu__link-icon flaticon-signs-1" />
                                                    <span class="kt-menu__link-text">File Attributes</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i class="kt-menu__link-icon flaticon-folder" />
                                                    <span class="kt-menu__link-text">Folders</span>
                                                </a>
                                            </li>
                                            <li class="kt-menu__item" aria-haspopup="true">
                                                <a href="#" class="kt-menu__link">
                                                    <i
                                                        class="kt-menu__link-icon flaticon-cogwheel-2"
                                                    />
                                                    <span class="kt-menu__link-text">System Settings</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- end: Header Menu -->
        <!-- begin:: Header Topbar -->
        <div class="kt-header__topbar">
            <!--begin: Search -->
            <div
                v-if="false"
                id="kt_quick_search_toggle"
                class="kt-header__topbar-item kt-header__topbar-item--search dropdown"
            >
                <div
                    class="kt-header__topbar-wrapper"
                    data-toggle="dropdown"
                    data-offset="10px,0px"
                >
                    <span class="kt-header__topbar-icon">
                        <i class="flaticon2-search-1" />
                    </span>
                </div>
                <div
                    class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-lg"
                >
                    <div
                        id="kt_quick_search_inline"
                        class="kt-quick-search kt-quick-search--inline"
                    >
                        <form method="get" class="kt-quick-search__form">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">
                                        <i class="flaticon2-search-1" />
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    class="form-control kt-quick-search__input"
                                    placeholder="Search..."
                                />
                                <div class="input-group-append">
                                    <span class="input-group-text">
                                        <i class="la la-close kt-quick-search__close" />
                                    </span>
                                </div>
                            </div>
                        </form>
                        <div
                            class="kt-quick-search__wrapper kt-scroll"
                            data-scroll="true"
                            data-height="300"
                            data-mobile-height="200"
                        />
                    </div>
                </div>
            </div>

            <!--end: Search -->
            <!--begin: Notifications -->
            <div v-if="false" class="kt-header__topbar-item dropdown">
                <div
                    class="kt-header__topbar-wrapper"
                    data-toggle="dropdown"
                    data-offset="10px,0px"
                >
                    <span class="kt-header__topbar-icon kt-header__topbar-icon--success">
                        <i class="flaticon2-bell-alarm-symbol" />
                    </span>
                    <span class="kt-hidden kt-badge kt-badge--danger" />
                </div>
                <div
                    class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-xl"
                >
                    <form>
                        <!--begin: Head -->
                        <div
                            class="kt-head kt-head--skin-dark kt-head--fit-x kt-head--fit-b"
                            style="background-image: url(/assets//media/misc/bg-1.jpg)"
                        >
                            <h3 class="kt-head__title">
                                User Notifications &nbsp;
                                <span
                                    class="btn btn-success btn-sm btn-bold btn-font-md"
                                >23 new</span>
                            </h3>
                            <ul
                                class="nav nav-tabs nav-tabs-line nav-tabs-bold nav-tabs-line-3x nav-tabs-line-success kt-notification-item-padding-x"
                                role="tablist"
                            >
                                <li class="nav-item">
                                    <a
                                        class="nav-link active show"
                                        data-toggle="tab"
                                        href="#topbar_notifications_notifications"
                                        role="tab"
                                        aria-selected="true"
                                    >Alerts</a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        class="nav-link"
                                        data-toggle="tab"
                                        href="#topbar_notifications_events"
                                        role="tab"
                                        aria-selected="false"
                                    >Events</a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        class="nav-link"
                                        data-toggle="tab"
                                        href="#topbar_notifications_logs"
                                        role="tab"
                                        aria-selected="false"
                                    >Logs</a>
                                </li>
                            </ul>
                        </div>

                        <!--end: Head -->
                        <div class="tab-content">
                            <div
                                id="topbar_notifications_notifications"
                                class="tab-pane active show"
                                role="tabpanel"
                            >
                                <div
                                    class="kt-notification kt-margin-t-10 kt-margin-b-10 kt-scroll"
                                    data-scroll="true"
                                    data-height="300"
                                    data-mobile-height="200"
                                >
                                    <a href="#" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon2-line-chart kt-font-success" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >New order has been received</div>
                                            <div class="kt-notification__item-time">2 hrs ago</div>
                                        </div>
                                    </a>
                                    <a href="#" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon2-box-1 kt-font-brand" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >New customer is registered</div>
                                            <div class="kt-notification__item-time">3 hrs ago</div>
                                        </div>
                                    </a>
                                    <a href="#" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon2-chart2 kt-font-danger" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >Application has been approved</div>
                                            <div class="kt-notification__item-time">3 hrs ago</div>
                                        </div>
                                    </a>
                                    <a href="#" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon2-image-file kt-font-warning" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >New file has been uploaded</div>
                                            <div class="kt-notification__item-time">5 hrs ago</div>
                                        </div>
                                    </a>
                                    <a href="#" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon2-bar-chart kt-font-info" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >New user feedback received</div>
                                            <div class="kt-notification__item-time">8 hrs ago</div>
                                        </div>
                                    </a>
                                    <a href="#" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon2-pie-chart-2 kt-font-success" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >System reboot has been successfully completed</div>
                                            <div class="kt-notification__item-time">12 hrs ago</div>
                                        </div>
                                    </a>
                                    <a href="#" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon2-favourite kt-font-danger" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >New order has been placed</div>
                                            <div class="kt-notification__item-time">15 hrs ago</div>
                                        </div>
                                    </a>
                                    <a
                                        href="#"
                                        class="kt-notification__item kt-notification__item--read"
                                    >
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon2-safe kt-font-primary" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >Company meeting canceled</div>
                                            <div class="kt-notification__item-time">19 hrs ago</div>
                                        </div>
                                    </a>
                                    <a href="#" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon2-psd kt-font-success" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >New report has been received</div>
                                            <div class="kt-notification__item-time">23 hrs ago</div>
                                        </div>
                                    </a>
                                    <a href="#" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon-download-1 kt-font-danger" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >Finance report has been generated</div>
                                            <div class="kt-notification__item-time">25 hrs ago</div>
                                        </div>
                                    </a>
                                    <a href="#" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon-security kt-font-warning" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >New customer comment recieved</div>
                                            <div class="kt-notification__item-time">2 days ago</div>
                                        </div>
                                    </a>
                                    <a href="#" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon2-pie-chart kt-font-success" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >New customer is registered</div>
                                            <div class="kt-notification__item-time">3 days ago</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div id="topbar_notifications_events" class="tab-pane" role="tabpanel">
                                <div
                                    class="kt-notification kt-margin-t-10 kt-margin-b-10 kt-scroll"
                                    data-scroll="true"
                                    data-height="300"
                                    data-mobile-height="200"
                                >
                                    <a href="#" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon2-psd kt-font-success" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >New report has been received</div>
                                            <div class="kt-notification__item-time">23 hrs ago</div>
                                        </div>
                                    </a>
                                    <a href="#" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon-download-1 kt-font-danger" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >Finance report has been generated</div>
                                            <div class="kt-notification__item-time">25 hrs ago</div>
                                        </div>
                                    </a>
                                    <a href="#" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon2-line-chart kt-font-success" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >New order has been received</div>
                                            <div class="kt-notification__item-time">2 hrs ago</div>
                                        </div>
                                    </a>
                                    <a href="#" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon2-box-1 kt-font-brand" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >New customer is registered</div>
                                            <div class="kt-notification__item-time">3 hrs ago</div>
                                        </div>
                                    </a>
                                    <a href="#" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon2-chart2 kt-font-danger" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >Application has been approved</div>
                                            <div class="kt-notification__item-time">3 hrs ago</div>
                                        </div>
                                    </a>
                                    <a href="#" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon2-image-file kt-font-warning" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >New file has been uploaded</div>
                                            <div class="kt-notification__item-time">5 hrs ago</div>
                                        </div>
                                    </a>
                                    <a href="#" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon2-bar-chart kt-font-info" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >New user feedback received</div>
                                            <div class="kt-notification__item-time">8 hrs ago</div>
                                        </div>
                                    </a>
                                    <a href="#" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon2-pie-chart-2 kt-font-success" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >System reboot has been successfully completed</div>
                                            <div class="kt-notification__item-time">12 hrs ago</div>
                                        </div>
                                    </a>
                                    <a href="#" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon2-favourite kt-font-brand" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >New order has been placed</div>
                                            <div class="kt-notification__item-time">15 hrs ago</div>
                                        </div>
                                    </a>
                                    <a
                                        href="#"
                                        class="kt-notification__item kt-notification__item--read"
                                    >
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon2-safe kt-font-primary" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >Company meeting canceled</div>
                                            <div class="kt-notification__item-time">19 hrs ago</div>
                                        </div>
                                    </a>
                                    <a href="#" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon2-psd kt-font-success" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >New report has been received</div>
                                            <div class="kt-notification__item-time">23 hrs ago</div>
                                        </div>
                                    </a>
                                    <a href="#" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon-download-1 kt-font-danger" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >Finance report has been generated</div>
                                            <div class="kt-notification__item-time">25 hrs ago</div>
                                        </div>
                                    </a>
                                    <a href="#" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon-security kt-font-warning" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >New customer comment recieved</div>
                                            <div class="kt-notification__item-time">2 days ago</div>
                                        </div>
                                    </a>
                                    <a href="#" class="kt-notification__item">
                                        <div class="kt-notification__item-icon">
                                            <i class="flaticon2-pie-chart kt-font-success" />
                                        </div>
                                        <div class="kt-notification__item-details">
                                            <div
                                                class="kt-notification__item-title"
                                            >New customer is registered</div>
                                            <div class="kt-notification__item-time">3 days ago</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div id="topbar_notifications_logs" class="tab-pane" role="tabpanel">
                                <div class="kt-grid kt-grid--ver" style="min-height: 200px;">
                                    <div
                                        class="kt-grid kt-grid--hor kt-grid__item kt-grid__item--fluid kt-grid__item--middle"
                                    >
                                        <div
                                            class="kt-grid__item kt-grid__item--middle kt-align-center"
                                        >
                                            All caught up!
                                            <br />No new notifications.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <!--end: Notifications -->


            <fireBase />
            <!--begin: Quick actions -->
            <div class="kt-header__topbar-item dropdown">
                <div
                    class="kt-header__topbar-wrapper"
                    data-toggle="dropdown"
                    data-offset="10px,0px"
                    :aria-expanded="false"
                    :class="{ show: helpIndex == true }"
                    style="position:relative"
                    @click="helpIndex = !helpIndex"
                >
                    <span
                        class="kt-header__topbar-icon kt-header__topbar-icon--warning"
                        title="Trung tâm trợ giúp"
                    >
                        <i class="flaticon-information" />
                    </span>
                </div>
                <div
                    class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-xl"
                    :class="{ show: helpIndex == true }"
                    style="position: absolute;left: -100px;top: 70px ;min-width: 200px;width: 250px;"
                    @mouseover="helpIndex = true"
                    @mouseout="helpIndex = false"
                >
                    <form>
                        <div
                            class="kt-head kt-head--skin-dark"
                            style="background-image: url(/img/bg-1.jpg)"
                        >
                            <h3 class="kt-head__title">Trung tâm trợ giúp</h3>
                        </div>
                        <div class="kt-grid-nav kt-grid-nav--skin-light">
                            <div class="kt-grid-nav__row">
                                <a
                                    class="kt-grid-nav__item cursor-pointer"
                                    @click="triggerClick('openSendErrorPopup')"
                                    title="Báo cáo lỗi"
                                >
                                    <span class="kt-grid-nav__icon">
                                        <span
                                            class="flaticon2-telegram-logo"
                                            width="24"
                                            height="24"
                                        ></span>
                                    </span>
                                    <span class="kt-grid-nav__title">Báo cáo lỗi</span>
                                </a>
                                <a
                                    class="kt-grid-nav__item cursor-pointer"
                                    @click="triggerClick('openTutorialPopup')"
                                    title="Xem hướng dẫn"
                                >
                                    <span class="kt-grid-nav__icon">
                                        <span class="flaticon2-analytics-2" width="24" height="24"></span>
                                    </span>
                                    <span class="kt-grid-nav__title">Hướng dẫn</span>
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <!--end: Quick actions -->
            <!--begin: Language bar -->

            <div class="kt-header__topbar-item kt-header__topbar-item--langs">
                <div
                    class="kt-header__topbar-wrapper"
                    data-toggle="dropdown"
                    :class="{ show: langIndex == true }"
                    style="position:relative"
                    @click="langIndex = !langIndex"
                >
                    <span
                        class="kt-header__topbar-icon kt-header__topbar-icon--brand"
                        data-toggle="dropdown"
                        data-offset="10px,0px"
                        aria-expanded="false"
                        v-if="currentLang"
                        :title="currentLang.name"
                    >
                        <img
                            style="width:19px;height:19px;"
                            v-if="currentLang.url"
                            :src="currentLang.url"
                        />
                    </span>
                </div>

                <div
                    class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim"
                    :class="{ show: langIndex == true }"
                    style="position: absolute;left:auto;right:50px; top: 70px ;"
                    @mouseover="langIndex = true"
                    @mouseout="langIndex = false"
                >
                    <LanguageSelect @close="getLang($event)"></LanguageSelect>
                </div>
            </div>

            <!--begin: Cart -->
            <div v-if="false" class="kt-header__topbar-item dropdown">
                <div
                    class="kt-header__topbar-wrapper"
                    data-toggle="dropdown"
                    data-offset="10px,0px"
                >
                    <span class="kt-header__topbar-icon">
                        <i class="flaticon2-shopping-cart-1" />
                    </span>
                </div>
                <div
                    class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-xl"
                >
                    <form>
                        <!-- begin:: Mycart -->
                        <div class="kt-mycart">
                            <div
                                class="kt-mycart__head kt-head"
                                style="background-image: url(/assets//media/misc/bg-1.jpg);"
                            >
                                <div class="kt-mycart__info">
                                    <span class="kt-mycart__icon">
                                        <i class="flaticon2-shopping-cart-1 kt-font-success" />
                                    </span>
                                    <h3 class="kt-mycart__title">My Cart</h3>
                                </div>
                                <div class="kt-mycart__button">
                                    <button
                                        type="button"
                                        class="btn btn-success btn-sm"
                                        style=" "
                                    >2 Items</button>
                                </div>
                            </div>
                            <div
                                class="kt-mycart__body kt-scroll"
                                data-scroll="true"
                                data-height="245"
                                data-mobile-height="200"
                            >
                                <div class="kt-mycart__item">
                                    <div class="kt-mycart__container">
                                        <div class="kt-mycart__info">
                                            <a href="#" class="kt-mycart__title">Samsung</a>
                                            <span class="kt-mycart__desc">Profile info, Timeline etc</span>
                                            <div class="kt-mycart__action">
                                                <span class="kt-mycart__price">$ 450</span>
                                                <span class="kt-mycart__text">for</span>
                                                <span class="kt-mycart__quantity">7</span>
                                                <a
                                                    href="#"
                                                    class="btn btn-label-success btn-icon"
                                                >&minus;</a>
                                                <a
                                                    href="#"
                                                    class="btn btn-label-success btn-icon"
                                                >&#43;</a>
                                            </div>
                                        </div>
                                        <a href="#" class="kt-mycart__pic">
                                            <img src="/assets//media/products/product9.jpg" title />
                                        </a>
                                    </div>
                                </div>
                                <div class="kt-mycart__item">
                                    <div class="kt-mycart__container">
                                        <div class="kt-mycart__info">
                                            <a href="#" class="kt-mycart__title">Panasonic</a>
                                            <span class="kt-mycart__desc">For PHoto & Others</span>
                                            <div class="kt-mycart__action">
                                                <span class="kt-mycart__price">$ 329</span>
                                                <span class="kt-mycart__text">for</span>
                                                <span class="kt-mycart__quantity">1</span>
                                                <a
                                                    href="#"
                                                    class="btn btn-label-success btn-icon"
                                                >&minus;</a>
                                                <a
                                                    href="#"
                                                    class="btn btn-label-success btn-icon"
                                                >&#43;</a>
                                            </div>
                                        </div>
                                        <a href="#" class="kt-mycart__pic">
                                            <img src="/assets//media/products/product13.jpg" title />
                                        </a>
                                    </div>
                                </div>
                                <div class="kt-mycart__item">
                                    <div class="kt-mycart__container">
                                        <div class="kt-mycart__info">
                                            <a href="#" class="kt-mycart__title">Fujifilm</a>
                                            <span class="kt-mycart__desc">Profile info, Timeline etc</span>
                                            <div class="kt-mycart__action">
                                                <span class="kt-mycart__price">$ 520</span>
                                                <span class="kt-mycart__text">for</span>
                                                <span class="kt-mycart__quantity">6</span>
                                                <a
                                                    href="#"
                                                    class="btn btn-label-success btn-icon"
                                                >&minus;</a>
                                                <a
                                                    href="#"
                                                    class="btn btn-label-success btn-icon"
                                                >&#43;</a>
                                            </div>
                                        </div>
                                        <a href="#" class="kt-mycart__pic">
                                            <img src="/assets//media/products/product16.jpg" title />
                                        </a>
                                    </div>
                                </div>
                                <div class="kt-mycart__item">
                                    <div class="kt-mycart__container">
                                        <div class="kt-mycart__info">
                                            <a href="#" class="kt-mycart__title">Candy Machine</a>
                                            <span class="kt-mycart__desc">For PHoto & Others</span>
                                            <div class="kt-mycart__action">
                                                <span class="kt-mycart__price">$ 784</span>
                                                <span class="kt-mycart__text">for</span>
                                                <span class="kt-mycart__quantity">4</span>
                                                <a
                                                    href="#"
                                                    class="btn btn-label-success btn-icon"
                                                >&minus;</a>
                                                <a
                                                    href="#"
                                                    class="btn btn-label-success btn-icon"
                                                >&#43;</a>
                                            </div>
                                        </div>
                                        <a href="#" class="kt-mycart__pic">
                                            <img
                                                src="/assets//media/products/product15.jpg"
                                                title
                                                alt
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="kt-mycart__footer">
                                <div class="kt-mycart__section">
                                    <div class="kt-mycart__subtitel">
                                        <span>Sub Total</span>
                                        <span>Taxes</span>
                                        <span>Total</span>
                                    </div>
                                    <div class="kt-mycart__prices">
                                        <span>$ 840.00</span>
                                        <span>$ 72.00</span>
                                        <span class="kt-font-brand">$ 912.00</span>
                                    </div>
                                </div>
                                <div class="kt-mycart__button kt-align-right">
                                    <button type="button" class="btn btn-primary btn-sm">Place Order</button>
                                </div>
                            </div>
                        </div>

                        <!-- end:: Mycart -->
                    </form>
                </div>
            </div>
            <!--end: Cart-->
            <!--begin: company bar -->
            <div
                v-if="appSettings.companies && appSettings.currentCompany.isSystem"
                class="kt-header__topbar-item kt-header__topbar-item--langs"
            >
                <div
                    class="kt-header__topbar-wrapper"
                    data-toggle="dropdown"
                    data-offset="10px,0px"
                    @click="triggerClick('openCompanyPopup')"
                >
                    <span class="kt-header__topbar-icon kt-header__topbar-icon--brand">
                        <avatar
                            :src="currentCompany.logo"
                            :username="currentCompany.name"
                            css-class="kt-badge kt-badge--xl"
                            :size="30"
                        />
                    </span>
                </div>
            </div>

            <!--end: company bar -->
            <!--begin: User bar -->
            <div
                class="kt-header__topbar-item kt-header__topbar-item--user"
                :class="{ show: menuIndex == 2 }"
                style="position:relative"
                @mouseover="menuIndex = 2"
                @mouseout="menuIndex = -1"
            >
                <div
                    class="kt-header__topbar-wrapper"
                    data-toggle="dropdown"
                    data-offset="10px,0px"
                >
                    <avatar
                        :src="currentUser.avatar"
                        :username="currentUser.fullName"
                        css-class="kt-header__topbar-icon kt-hidden-"
                        :size="40"
                    />
                </div>
                <div
                    class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-xl"
                    :class="{ show: menuIndex == 2 }"
                    style="position: absolute;left: -200px; min-width: 200px;width: 250px;"
                    @mouseover="menuIndex = 2"
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
                            <!--use below badge element instead the user avatar to display username's first letter(remove kt-hidden class to display it) -->
                            <!--<span class="kt-badge kt-badge--lg kt-badge--rounded kt-badge--bold kt-font-success">S</span>-->
                        </div>
                        <div class="kt-user-card__name">{{ currentUser.fullName }}</div>
                    </div>
                    <!--begin: Navigation -->
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
                                <div class="kt-notification__item-title kt-font-bold">Đổi mật khẩu</div>
                            </div>
                        </a>
                        <a href="javascript:;" class="kt-notification__item" @click="signOut">
                            <div class="kt-notification__item-icon">
                                <i class="flaticon2-power kt-font-warning" />
                            </div>
                            <div class="kt-notification__item-details">
                                <div class="kt-notification__item-title kt-font-bold">Thoát</div>
                            </div>
                        </a>
                    </div>

                    <!--end: Navigation -->
                </div>
            </div>

            <!--end: User bar -->
            <!--begin: Quick panel toggler -->
            <div
                v-if="false"
                class="kt-header__topbar-item kt-header__topbar-item--quickpanel"
                data-toggle="kt-tooltip"
                title="Quick panel"
                data-placement="top"
            >
                <div class="kt-header__topbar-wrapper">
                    <span id="kt_quick_panel_toggler_btn" class="kt-header__topbar-icon">
                        <i class="flaticon2-cube-1" />
                    </span>
                </div>
            </div>

            <!--end: Quick panel toggler -->
        </div>

        <!-- end:: Header Topbar -->
    </div>
</template>
<script>
import fireBase from '../_common/firebase'
import { mapGetters, mapActions } from 'vuex';
import LanguageSelect from './language-select';
export default {
    components: { LanguageSelect,fireBase },
    data() {
        return {
            menuIndex: -1,
            helpIndex: false,
            langIndex: false,
            currentLang: null,
            listLang: [
                { id: 1, name: 'English', url: '/img/flag-en.png' },
                { id: 2, name: 'Japan', url: '/img/flag-jp.png' },
                { id: 3, name: 'Viet Nam', url: '/img/flag-vn.png' }
            ]
        };
    },
    computed: {
        ...mapGetters(['system']),
        currentCompany() {
            if (this.appSettings.companies) {
                return _.find(this.appSettings.companies, ['id', this.appSettings.CompanyId]);
            }
            return this.appSettings.currentCompany;
        }
    },
    methods: {
        ...mapActions(['logOut']),
        signOut() {
            let token = localStorage.getItem(this.CONSTANTS.FIREBASE_TOKEN);
            if (token) this.fireBaseRemoveToken(token);
            this.logOut().then(() => {
                this.$router.push(`/login`);
            });
        },
        getLang(val) {
            this.currentLang = val;
        }
    }
};
</script>
