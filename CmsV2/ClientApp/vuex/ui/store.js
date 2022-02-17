import * as actions from './actions';
import _ from 'lodash';
import minBy from 'lodash/minBy';

const store = {
    state: {
        isModalOpen: false,
        isShowDoExamNow: false,
        isShowMainMenu: true,
        sidebarModeOpen:false,        
        menuData: [
            {
                title: 'Tổng quan',
                icon: 'flaticon2-protection',
                link: '/',
                permissions: [],
                childs: []
            },
            {
                block: 2,
                icon: 'flaticon2-group',
                childs: [
                    {
                        title: 'Họp trực tuyến',
                        icon: 'users',
                        childs: [
                            {
                                title: 'Phòng họp',
                                link: '/meet-room',
                                icon: 'align-justify',
                                permissions: ['meetRoom']
                            },
                            {
                                title: 'Thiết lập',
                                link: '/meet-setting',
                                icon: 'align-justify',
                                permissions: ['meetSetting']
                            }
                        ]
                    }
                ]
            },
            {
                block: 3,
                title: 'Lịch',
                icon: 'flaticon2-calendar',
                name: 'containerCalendar',
                childs: [
                    {
                        title: 'Toàn bộ',
                        link: '/calendar',
                        icon: 'calendar',
                        permissions: ['calendar']
                    },
                    {
                        title: 'Lịch cá nhân',
                        link: '/private-calendar',
                        icon: 'calendar',
                        permissions: ['calendar'],
                        name: 'calendar'
                    },
                    {
                        title: 'Lịch nhóm',
                        link: '/group-calendar',
                        icon: 'calendar',
                        permissions: ['calendar']
                    },
                    {
                        title: 'Lịch phòng ban',
                        link: '/department-calendar',
                        icon: 'calendar',
                        permissions: ['calendar']
                    },
                    {
                        title: 'Lịch đơn vị',
                        link: '/company-calendar',
                        icon: 'calendar',
                        permissions: ['calendar']
                    },
                    {
                        title: 'Đặt lịch',
                        link: '/calendar-book',
                        icon: 'calendar',
                        permissions: ['calendarBook']
                    },
                    {
                        title: 'Phê duyệt đặt lịch',
                        link: '/calendar-book-mananger',
                        icon: 'calendar',
                        permissions: ['calendarBookMananger']
                    },
                    {
                        title: 'Nhóm',
                        link: '/calendar-group',
                        icon: 'users',
                        permissions: ['calendarGroup']
                    }
                ]
            },
            {
                block: 4,
                title: 'Công việc',
                icon: 'flaticon2-architecture-and-city',
                name: 'task',
                childs: [
                    {
                        title: 'Báo cáo',
                        link: '/project-report',
                        icon: 'pie-chart',
                        permissions: ['projectReport']
                    },
                    {
                        title: 'Báo cáo công việc',
                        link: '/task-report',
                        icon: 'pie-chart',
                        permissions: ['taskReportManager']
                    },
                    {
                        title: 'Mục tiêu',
                        link: '/objective',
                        icon: 'rocket',
                        permissions: ['objective']
                    },
                    // {
                    //     title: 'Nhiệm vụ trọng tâm',
                    //     link: '/main-project',
                    //     icon: 'list',
                    //     permissions: ['project']
                    // },
                    {
                        title: 'Nhiệm vụ',
                        link: '/project',
                        icon: 'list',
                        permissions: ['project']
                    },
                    {
                        title: 'Nhóm nhiệm vụ',
                        link: '/project-group',
                        icon: 'list',
                        permissions: ['projectGroup']
                    },
                    {
                        title: 'Công việc',
                        link: '/task',
                        icon: 'list',
                        permissions: ['task']
                    },
                    {
                        title: 'Thiết lập',
                        link: '/category',
                        icon: 'list',
                        permissions: ['category']
                    }
                ]
            },
            {
                block: 1,
                title: 'Tổ chức',
                icon: 'flaticon2-architecture-and-city',
                childs: [
                    {
                        title: 'Chi nhánh',
                        link: '/branch',
                        icon: 'code-branch',
                        permissions: ['companyBranch']
                    },
                    {
                        title: 'Phòng ban',
                        link: '/department',
                        icon: 'cubes',
                        permissions: ['companyDepartment']
                    }
                ]
            },
            {
                block: 5,
                title: 'Cấu hình tin bài',
                icon: 'flaticon2-architecture-and-city',
                name: 'news',
                childs: [
                    {
                        title: 'Tags',
                        link: '/tag/news',
                        icon: 'tag',
                        permissions: ['tags']
                    },
                    {
                        title: 'Chuyên mục tin',
                        link: '/zone/news',
                        icon: 'list',
                        permissions: ['zone']
                    },
                    {
                        title: 'Dòng sự kiện',
                        link: '/thread',
                        icon: 'code-branch',
                        permissions: ['thread']
                    }
                ]
            },
            {
                block: 7,
                title: 'Cấu hình trang web',
                icon: 'globe',
                name: 'news',
                childs: [
                    {
                        title: 'Banner',
                        link: '/banner',
                        icon: 'shapes',
                        permissions: ['banner']
                    },
                    {
                        title: 'Thăm dò ý kiến',
                        link: '/poll',
                        icon: 'list',
                        permissions: ['poll']
                    },
                    {
                        title: 'Câu hỏi thường gặp',
                        link: '/contact/QUESTION',
                        icon: 'shapes',
                        permissions: ['question']
                    },
                    {
                        title: 'Hỏi đáp',
                        link: '/contact/QA',
                        icon: 'shapes',
                        permissions: ['qa']
                    },
                    {
                        title: 'Liên hệ',
                        link: '/contact/CONTACT',
                        icon: 'shapes',
                        permissions: ['contact']
                    },
                    {
                        title: 'Sản phẩm',
                        link: '/product',
                        icon: 'shapes',
                        permissions: ['product']
                    },
                    {
                        title: 'Dịch vụ',
                        link: '/service',
                        icon: 'shapes',
                        permissions: ['service']
                    }
                ]
            },
            {
                block: 5,
                title: 'Tin bài',
                icon: 'flaticon2-architecture-and-city',
                name: 'news',
                childs: [
                    {
                        title: 'Bài của tôi',
                        link: '/news',
                        icon: 'list',
                        isNewsMenu: true,
                        permissions: ['reporter', 'editor', 'secretary', 'editorialOfficeSecretary']
                    },
                    {
                        title: 'Bài chờ biên tập',
                        link: '/news/status/3',
                        icon: 'list',
                        isNewsMenu: true,
                        permissions: ['reporter', 'editor', 'secretary', 'editorialOfficeSecretary']
                    },
                    {
                        title: 'Bài nhận biên tập',
                        link: '/news/status/4',
                        icon: 'list',
                        isNewsMenu: true,
                        permissions: ['editor', 'secretary', 'editorialOfficeSecretary']
                    },
                    {
                        title: 'Bài chờ xuất bản',
                        link: '/news/status/5',
                        icon: 'list',
                        isNewsMenu: true,
                        permissions: ['editor', 'secretary', 'editorialOfficeSecretary']
                    },
                    {
                        title: 'Bài nhận xuất bản',
                        link: '/news/status/6',
                        icon: 'list',
                        isNewsMenu: true,
                        permissions: ['secretary', 'editorialOfficeSecretary']
                    },
                    {
                        title: 'Bài đã xuất bản',
                        link: '/news/status/7',
                        icon: 'list',
                        isNewsMenu: true,
                        permissions: ['reporter', 'editor', 'secretary', 'editorialOfficeSecretary']
                    },
                    {
                        title: 'Bài từ chối biên tập',
                        link: '/news/status/8',
                        icon: 'list',
                        isNewsMenu: true,
                        permissions: ['editor', 'secretary', 'editorialOfficeSecretary']
                    },
                    {
                        title: 'Bài bị trả lại',
                        link: '/news/status/9',
                        icon: 'list',
                        isNewsMenu: true,
                        permissions: ['reporter', 'secretary', 'editorialOfficeSecretary']
                    },
                    {
                        title: 'Bài bị gỡ',
                        link: '/news/status/10',
                        icon: 'list',
                        isNewsMenu: true,
                        permissions: ['editorialOfficeSecretary']
                    },
                    {
                        title: 'Bài bị xóa',
                        link: '/news/status/11',
                        icon: 'list',
                        isNewsMenu: true,
                        permissions: ['editorialOfficeSecretary']
                    },
                    {
                        title: 'Cài bài nổi bật',
                        link: '/news-position',
                        icon: 'list',
                        permissions: ['newsPosition']
                    },
                ]
            },
            // {
            //     block: 6,
            //     title: 'Tài liệu',
            //     icon: 'flaticon2-architecture-and-city',
            //     name: 'news',
            //     childs: [
            //         {
            //             title: 'Tài liệu',
            //             link: '/document',
            //             icon: 'file',
            //             permissions: ['document']
            //         },
            //         {
            //             title: 'Yêu cầu mượn',
            //             link: '/document-borrow',
            //             icon: 'file',
            //             permissions: ['document']
            //         },
            //         {
            //             title: 'Tags',
            //             link: '/tag/wiki',
            //             icon: 'tag',
            //             permissions: ['tagWiki']
            //         },
            //         {
            //             title: 'Chuyên mục',
            //             link: '/zone/wiki',
            //             icon: 'list',
            //             permissions: ['zoneWiki']
            //         },
            //     ]
            // },
            {
                block: 1,
                title: 'Hệ thống',
                icon: 'flaticon2-analytics-2',
                childs: [
                    {
                        title: 'Cấu hình',
                        link: '/config',
                        icon: 'cogs',
                        permissions: ['configManagement']
                    },
                    {
                        title: 'Vai trò',
                        link: '/role',
                        icon: 'users',
                        permissions: ['roleManagement']
                    },
                    {
                        title: 'Trạng thái Học viên',
                        link: '/member-status',
                        icon: 'user-cog',
                        permissions: ['memberStatus']
                    },
                    {
                        title: 'Người dùng',
                        link: '/user',
                        icon: 'user-tie',
                        permissions: ['userManagement']
                    },
                    {
                        title: 'Lịch sử hành động',
                        link: '/log-action',
                        icon: 'history',
                        permissions: ['systemLogAction']
                    },
                    {
                        title: 'Dữ liệu chung',
                        link: '',
                        icon: 'database',
                        childs: [
                            {
                                title: 'Từ điển',
                                link: '/dictionary-group',
                                permissions: ['managementStaticDictionary']
                            },
                            {
                                title: 'Trường học',
                                link: '/school',
                                permissions: ['school']
                            },
                            {
                                title: 'Danh mục dữ liệu',
                                link: '/category-data',
                                permissions: ['dataDictionaryManagement']
                            },
                            {
                                title: 'Mẫu form hồ sơ',
                                link: '/form-profile-file',
                                permissions: ['managementFormHardProfile']
                            },
                            {
                                title: 'Tỷ giá',
                                link: '/exchange-rate',
                                permissions: ['exchangeRate']
                            }
                        ]
                    },
                    {
                        title: 'Thuộc tính động',
                        link: '/form-design',
                        icon: 'angry',
                        permissions: ['formDesign']
                    },
                    {
                        title: 'Thông báo lỗi',
                        link: '/error-report',
                        icon: 'bug',
                        permissions: ['errorReportManagement']
                    },
                    {
                        title: 'Video hướng dẫn',
                        link: '/video-tutorial',
                        icon: 'video',
                        permissions: ['videoTutorialManagement']
                    }
                ]
            },
            {
                block: 8,
                title: 'Wiki',
                icon: 'flaticon2-architecture-and-city',
                name: 'wiki',
                childs: [
                    {
                        title: 'Trang chủ',
                        link: '/wiki/home',
                        icon: 'home',
                        permissions: ['document','WikiMyDoc']
                    },
                    {
                        title: 'Điểm tin',
                        link: '/wiki/summary',
                        icon: 'home',
                        permissions: ['WikiMyDoc']
                    },
                    {
                        title: 'File tài liệu',
                        link: '/wiki/file',
                        icon: 'home',
                        permissions: ['WikiMyDoc']
                    },
                    {
                        title: 'Câu hỏi và trả lời',
                        link: '/wiki/qa',
                        icon: 'home',
                        permissions: ['WikiMyDoc']
                    },
                    {
                        title: 'Bài tổng hợp',
                        link: '/wiki/genaral',
                        icon: 'home',
                        permissions: ['WikiMyDoc']
                    },
                    {
                        title: 'Tài liệu cá nhân',
                        link: '/wiki/private-document',
                        icon: 'home',
                        permissions: ['WikiMyDoc']
                    },
                    {
                        title: 'Tài liệu đã mượn',
                        link: '/wiki/borrowed-document',
                        icon: 'home',
                        permissions: ['WikiMyDoc']
                    },
                    {
                        title: 'Tài liệu cho mượn',
                        link: '/wiki/confirm-borrow-document',
                        icon: 'file',
                        permissions: ['WikiMyDoc']
                    },
                    {
                        title: 'Tài liệu đã lưu',
                        link: '/wiki/saved-document',
                        icon: 'file',
                        permissions: ['WikiMyDoc']
                    },
                    {
                        title: 'Tài liệu phòng ban',
                        link: '/wiki/department-document',
                        icon: 'file',
                        permissions: ['wikiMyDoc']
                    },
                    {
                        title: 'Tài liệu',
                        link: '/wiki/doc',
                        icon: 'file',
                        permissions: ['document']
                    },
                    {
                        title: 'Yêu cầu mượn',
                        link: '/wiki/borrow',
                        icon: 'file',
                        permissions: ['document']
                    },
                    {
                        title: 'Tags',
                        link: '/wiki/tags',
                        icon: 'tag',
                        permissions: ['wikiTag']
                    },
                    {
                        title: 'Chuyên mục',
                        link: '/wiki/category',
                        icon: 'list',
                        permissions: ['wikiZone']
                    },
                ]
            }
        ],
        menuList: [],
        menuListAllow: [],
        blocks: [
            { branchName:'O2 Config',title: 'Hệ thống', block: 1, icon: 'cogs', thumb:{portal:''},link:'/config',active:{portal:false} },
            { branchName:'O2 Meet', title: 'Họp trực tuyến', block: 2, icon: 'video', thumb:{portal:'/assets-v2/images/thumb-meet.jpg'},link:'/meet-room',active:{portal:true} },
            { branchName:'O2 Calendar',title: 'Lịch', block: 3, icon: 'calendar-alt', thumb:{portal:'/assets-v2/images/thumb-calendar.jpg'},link:'/calendar',active:{portal:true} },
            { branchName:'O2 Task',title: 'Nhiệm vụ công việc', block: 4, icon: 'clipboard-list', thumb:{portal:'/assets-v2/images/thumb-task.jpg'},link:'/task',active:{portal:true} },
            { branchName:'O2 News',title: 'Tòa soạn online', block: 5, icon: 'newspaper', thumb:{portal:''},link:'/news',active:{portal:false} },
            //{ branchName:'O2 Document',title: 'Quản trị tri thức', block: 6, icon: 'file-alt', thumb:{portal:'/assets-v2/images/thumb-wiki.jpg'},link:'/document',active:{portal:false} },
            { branchName:'O2 Wiki',title: 'Quản trị tri thức', block: 8, icon: 'file-alt', thumb:{portal:'/assets-v2/images/thumb-wiki.jpg'},link:'/wiki/home',active:{portal:true} },
            { branchName:'O2 Cms',title: 'Quản trị website', block: 7, icon: 'globe', thumb:{portal:''},link:'/web',active:{portal:false} }
        ],
    },
    mutations: {
        TOGGLE_DO_EXAM_NOW: (state, payload) => {
            state.isShowDoExamNow = !state.isShowDoExamNow;
            state.isModalOpen = state.isShowDoExamNow;
        },
        SHOW_HIDE_MAIN_MENU: (state, payload) => {
            state.isShowMainMenu = payload;
        },
        MENU_DATA: (state, payload) => {
            state.menuData = state.menuData;
        },
        MENU_DATA_BY_BLOCK: (state, block) => {
            state.menuList = state.menuListAllow.filter(k => k.block === block);
        },
        setMenuList: (state, payload) => {
            state.menuList = payload;
        },
        setMenuAllow: (state, payload) => {
            state.menuListAllow = payload;
            if (payload && payload.length > 0) {
                var ids = payload.map(k => k.block);
                for (let b of state.blocks) {
                    b.isAllow = ids.includes(b.block);
                }
                //state.menuList = [payload[0]];
            }
        },
        SIDEBAR_TOGGLE:(state, payload)=>{
            state.sidebarModeOpen=!state.sidebarModeOpen;
        },
        SIDEBAR_SET_MODE:(state,mode)=>{
            state.sidebarModeOpen=mode;
        }

    },

    actions,

    getters: {
        isModalOpen: state => state.isModalOpen,
        isShowDoExamNow: state => state.isShowDoExamNow,
        isShowMainMenu: state => state.isShowMainMenu,
        menuData: state => state.menuData,
        menuList: state => state.menuList,
        blocks: state => state.blocks,
        menuListAllow: state => state.menuListAllow,
        sidebarModeOpen: state => state.sidebarModeOpen
    }
};

export default store;
