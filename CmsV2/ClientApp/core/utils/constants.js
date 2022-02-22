let mode = 'development';
let suffix = '';
// if (!process.env.VUE_ENV && window && window.appSettings) {
//     mode = window.appSettings.mode;
//     suffix = '_' + mode;
// }
const CONSTANTS = {
    AUTH_TOKEN: 'AUTH_TOKEN' + suffix,
    LANG: 'LANG' + suffix,
    CURRENT_USER: 'CURRENT_USER' + suffix,
    CURRENT_COLLABORATOR: 'CURRENT_COLLABORATOR' + suffix,
    PERMISSIONS: 'PERMISSIONS' + suffix,
    USER_PERMISSIONS: 'USER_PERMISSIONS' + suffix,
    CURRENT_VERSION: 'CURRENT_VERSION' + suffix,
    MENU_MODE: 'MENU_MODE' + suffix,
    CompanyId: 'CompanyId' + suffix,
    FIREBASE_TOKEN: 'fireBaseToken',
    SYSTEM_NAME: 'BOMAS',
    PERMISSION_LEVEL: {
        Unknown: -1,
        Me: 0,
        Branch: 1,
        All: 2
    },
    CRMTYPE: {
        Admissions: 0,
        Marketing: 1,
        Profile: 2
    },
    WORKFLOW_MEMBER_CODE: "QTHV",
    VIEW: {
        SaleMarketing: 'TSHOCVIEN',
        Profile: 'HSHOCVIEN',
        Finance: 'HSTAICHINH',
        School: 'TRUONGHOC',
        SchoolPeriodMember: 'KYTUYENHOCVIEN',
        LaborAdmission: 'LABOR_TSHOCVIEN',
        LaborFinance: 'LABOR_HSTAICHINH',
        LaborProfile: 'LABOR_HSHOCVIEN',
    },
    DEPARTMENT: {
        SaleMarketing: 'TS',
        Finance: 'TC',
        ForeignAffair: 'DN',
        Profile: 'HS',
        Training: 'DT',
    },
    COMMENT_OBJECT_TYPE: {
        objective: 1,
        project: 2,
        task: 3,
        projectNews: 4,
        projectFile: 5
    },
    CALENDAR_TYPE:{
        CA_NHAN:1,
        NHOM:2,
        PHONG_BAN:3,        
        DON_VI:4
    },
    BLOCKS_TYPE:{
        CALENDAR:3,
        MEET:2, 
        WIKI:8, 
        TASK:4, 
        SYSTEM:1,
        NEWS:5,
        DOCUMENT:6 
    },
    PROJECT_STATUS:{
        ProjectStatusNotStartYet: "ProjectStatusNotStartYet",
        ProjectStatusInProcess: "ProjectStatusInProcess",
        ProjectStatusSuccess: "ProjectStatusSuccess",
        ProjectStatusReview: "ProjectStatusReview",
        ProjectStatusStop: "ProjectStatusStop"
    },
    PROCESS_TYPE:{
        REPORT: 1,
        EXTEND: 2,
    },
    REPORT_PROCESS_TYPE:{
        PROCESS: 0,
        RESULT: 1,
    },
    APPROVED_STATUS:{
        Send : 0,
        LeaderApproved : 1,
        LeaderNotApproved : 2,
        ProjectLeaderApproved : 3,
        ProjectLeaderNotApproved : 4,
    },
    TASK_ACTIVITY: {
        AddTask: 'AddTask',
        AddProject: 'AddProject',
        AddUser: 'AddUser',
        SendReport: 'SendReport',
        SendExtend: 'SendExtend',
        Approved: 'Approved',
        Forward: 'Forward',
        Reject: 'Reject'
    },
    TASK_ROLE_NAME:{
        PROJECT_LEADER: "ProjectLeader",
        LEADER: "Leader",
        EXPERT: "Expert",
        FOLLOWER: "Follower",
    },
    TASK_STATUS:{
        Unfulfilled : 1,
        Process : 2,
        Success : 3,
    },
    ZONE_TYPE:{
        WIKI:'WIKI'
    },
    WIKI_ZONE_TYPE:{
        NEWS:'NEWS', //hỏi đáp
        SHORT_NEWS:'SHORT_NEWS',//điểm tin
        GENERAL_NEWS:'GENERAL_NEWS', //tổng hợp
        DOCUMENT:'DOCUMENT' //tài liệu
    },
    EXPORT_PROJECT_TYPE:{
        ASSIGN: 1,
        RELATED: 2
    },
    EXPORT_REPORT_PROCESS_TYPE:{
        MY_REPORT: 1,
        NEED_APPROVED: 2
    },
};
export default CONSTANTS;
