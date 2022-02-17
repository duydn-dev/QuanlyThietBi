; (function (win, $) {
    'use strict';

    var lstResult = [];
    
    // Custom calendar
    var customCalendalJs = function () {
        // Add class for custom css
        var $btnGroupCustom = $('.fc-header-toolbar').find('.fc-toolbar-chunk:eq(2)').addClass('btn-selTime');
        $('<div>').addClass('btn-group').appendTo('.fc-header-right').append($btnGroupCustom);

        $('.fc-header-toolbar').find('.fc-today-button').addClass('btn-today-custom');


        // when switch select time
        $('.fc-timeGridDay-button').click(function() {
            $(this).parents('.box').removeClass('calen-gridweek calen-gridmonth calen-lstmonth');
            $(this).parents('.box').addClass('calen-gridday');
        });
        $('.fc-timeGridWeek-button').click(function() {
            $(this).parents('.box').removeClass('calen-gridday calen-gridmonth calen-lstmonth');
            $(this).parents('.box').addClass('calen-gridweek');
        });
        $('.fc-dayGridMonth-button').click(function() {
            $(this).parents('.box').removeClass('calen-gridweek calen-gridday calen-lstmonth');
            $(this).parents('.box').addClass('calen-gridmonth');
        });
    };

    //Right click evt in calendar
    var rightClickEvt = function() {
        var $contextMenu = $('.show-popEvent');

        $('body').on('contextmenu', '.fc-event', function(e){
            var valWidthBox = $contextMenu.width(),
                valPageX = e.pageX + valWidthBox;

            var winWidth = $(window).width();

            $contextMenu.css({
                display: "block",
                top: e.pageY - 30,
                right: 'auto',
                left: 'auto'
            });

            if(valPageX < winWidth){
                $contextMenu.css({
                    left: e.pageX,
                });
            }
            else {
                $contextMenu.css({
                    right: 0,
                });
            }
            return false;
        });
        $('html').click(function() {
            $contextMenu.hide();
       });
    };

    // Custom Datepicker
    var customDatePicker = function() {
        $('.js-datetime').datepicker({
            dateFormat: 'dd/mm/yy',
            dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
            monthNames: ["Tháng 01","Tháng 02","Tháng 03","Tháng 04","Tháng 05","Tháng 06","Tháng 07","Tháng 08","Tháng 09","Tháng 10","Tháng 11","Tháng 12"],
        });
    };

    // Open select dropdown
    var openSelectDrop = function() {
        $('.js-btn-selbox').on('click', function (){
            // $(this).parents('.js-selbox').toggleClass('open');

            if($(this).parents('.js-selbox').hasClass('open')) {
                $(this).parents('.js-selbox').removeClass('open');
            } else {
                $('.popup').find('.open').removeClass('open');
                $(this).parents('.js-selbox').addClass('open');
            }

            if($(this).find('.txt-ipt').is(':disabled')){
                $(this).parents('.js-selbox').removeClass('open');
            }
        });
    };

    // Edit calendar popup
    var editCalendarPop = function() {
        $('.js-btn-editcalen').on('click', function (){
            $(this).parents('body').find('.modal-content .txt-ipt').prop("disabled", false);
            $(this).parents('body').find('#popDetailCalendar .modal-title').text('Sửa lịch');
        });

        $('.fc-event').on('click', function (){
            $(this).parents('body').find('.modal-content .txt-ipt').prop("disabled", true);
            $(this).parents('body').find('#popDetailCalendar .modal-title').text('Xem lịch');
        });
    };

    // Get value 
    var getValueSelBox = function() {
        // Get value default
        $('.js-selbox .sel-value').click(function() {
            $(this).toggleClass('is-selected');
            const label = $(this).text();

            if($(this).hasClass('is-selected')) {
                lstResult.push({ text: label });
                let arrLength = lstResult.length;
                $(this).parents('.js-selbox').find('.js-get-lstsel').append("<li class='item-sel item-" + arrLength + "'><span>"+ label + "</span><button type='button' class='btn-remove'><i class='bi bi-x'></i></button></li>");

            } else {
                const i = lstResult.findIndex(n => n.text == label);
                lstResult.splice(i, 1);
                $(this).parents('.js-selbox').find('.js-get-lstsel .item-' + (i + 1) + '').remove();
            }

            $(this).parents('.js-selbox').find('.js-btn-selbox .txt-ipt').val("");
        });

        // Get value type 2
        $('.js-selbox.type2').find('.selbox-lst .sel-value').click(function () {
            var val = $(this).text();

            $(this).parents('.selbox-lst-area').prev('button').text(val);
            $(this).parents('.selbox').removeClass('open');
        });

        // Search input
        $('.js-btn-selbox .txt-ipt').on('keyup', function() {
            var value = $(this).val().toLowerCase();
            $('.selbox-lst li').filter(function() {
                $(this).show();
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });

        $('.js-btn-selbox .txt-ipt').click(function() {
            $(this).parents('.js-selbox').find('.selbox-lst li').show();
        });
    };

    //remove tagname
    $(document).on('click', '.js-get-lstsel .btn-remove', function () {
        $(this).parent('.item-sel').remove();
    });

    // Active nav menu/ type view
    var activeViewPage = function() {
        $('.nav-menu .txt-tit').click(function () {
            $(this).closest('.nav-menu').find('.txt-tit').removeClass('is-active');
            $(this).parent('li').find('.txt-tit').addClass('is-active');
        });

        $('.nav-child .tit-child').click(function () {
            $(this).closest('.nav-child').find('.tit-child').removeClass('is-active');
            $(this).parent('li').find('.tit-child').addClass('is-active');

            if($('.nav-child .tit-child').hasClass('is-active')) {
                $(this).parents('.nav-itm').find('.txt-tit').addClass('is-active');
            } else {
                $('.nav-itm').find('.txt-tit').removeClass('is-active');
            }
        });

        $('.type-view .btn-view').click(function () {
            $(this).parent('.type-view').find('.btn-view').removeClass('on');
            $(this).addClass('on');
        });
    };

    // Select tab
    var selectTabView = function () {
        $('.tab-lst button').click(function () {
            $(this).closest('.tab-lst').find('button').removeClass('is-active');
            $(this).parent('button').addClass('is-active');
            // $('.js-tab-panel').removeClass('is-active');
            // $(this.id).addClass('is-active');

            if($('.tab-lst .btn-grid').hasClass('on')){
                $(this).parents('.calendar-area').find('.calen-custom .fc-view-harness').show();
                $(this).parents('.calendar-area').find('.tbl-calen-list').hide();
            }
            else if ($('.tab-lst .btn-list').hasClass('on')){
                $(this).parents('.calendar-area').find('.calen-custom .fc-view-harness').hide();
                $(this).parents('.calendar-area').find('.tbl-calen-list').show();
            }
        });

        $('.tab-lst .tab-name').click(function () {
            $(this).parent('.tab-lst').find('.tab-name').removeClass('on');
            $(this).addClass('on');

            if($('.tab-week-lst').hasClass('on')){
                $(this).parents('.box-head').addClass('week-lst');
            } else {
                $('.box-head').removeClass('week-lst');
            }
        });

        $('.btn-selTime .fc-button').click(function () {
            $(this).parents('.calendar-area').find('.tab-lst').show();
            $(this).parents('.calendar-area').find('.btn-selTime .fc-button').removeClass('fc-button-active');
            $(this).addClass('fc-button-active');
            
        });
        $('.fc-timeGridDay-button').click(function () {
            $(this).parents('.calendar-area').find('.tab-lst').hide();

            $(this).parents('.calendar-area').find('.calen-custom .fc-view-harness').hide();
            $(this).parents('.calendar-area').find('.tbl-calen-list').show();
        });
    };

    // Active calendar type
    var activeCalendarType = function() {
        $('.color-store .color-calen').click(function () {
            $(this).closest('.lst-color').find('.color-calen').removeClass('is-active');
            $(this).parent('li').find('.color-calen').addClass('is-active');

            if($('.color-store .personal-calen').hasClass('is-active')) {
                $(this).parents('.content-page').removeClass('content-group content-room content-unit');
                $(this).parents('.content-page').addClass('content-personal');
            } 
            else if($('.color-store .group-calen').hasClass('is-active')){
                $(this).parents('.content-page').removeClass('content-personal content-room content-unit');
                $(this).parents('.content-page').addClass('content-group');
            } 
            else if($('.color-store .room-calen').hasClass('is-active')){
                $(this).parents('.content-page').removeClass('content-personal content-group content-unit');
                $(this).parents('.content-page').addClass('content-room');
            }
            else if($('.color-store .unit-calen').hasClass('is-active')){
                $(this).parents('.content-page').removeClass('content-personal content-group content-room');
                $(this).parents('.content-page').addClass('content-unit');
            }
        });
    };

    // Open drop popup
    var openDropPop = function() {
        $('.js-btn-drop').on('click', function (){
            $(this).parents('.js-btn-showPop').find('.drop-menu').toggleClass('show');

            var $showed = $(this).parents('.noti-remind').find('.drop-menu');
            if($showed.hasClass('show')){
                $(this).parents('.noti-remind').addClass('open');
            } else {
                $('.noti-remind').removeClass('open');
            }
        });
    };

    //Check status Calendar
    var checkStatusCalendar = function() {
        var $this = $('.tbl-calen td a.txt-tit');
        
        $this.on('click', function (){
            $(this).parents('body').find('#popDetailCalendar .modal-title').text('Xem lịch');

            var result = $(this).parents('tr').find('.lbl-status').data("status");
            
            //Check status "Đã duyệt/Chờ duyệt"
            if(result == 1){
                $(this).parents('body').find('#popApprovalDetailCalendar').find('.lst-info .lbl-status').removeClass('lbl-lightgreen').addClass('lbl-green').text('Đã duyệt');
                $(this).parents('body').find('#popApprovalDetailCalendar').find('.modal-footer').hide();
                $(this).parents('body').find('#popApprovalDetailCalendar').find('.modal-body .has-confirm').show();
                $(this).parents('body').find('#popApprovalDetailCalendar').find('.modal-body .waiting-confirm').hide();
                $(this).parents('body').find('#popApprovalDetailCalendar').find('.lst-info .txt-tit em').hide();
            } else {
                $(this).parents('body').find('#popApprovalDetailCalendar').find('.lst-info .lbl-status').removeClass('lbl-green').addClass('lbl-lightgreen').text('Chờ duyệt');
                $(this).parents('body').find('#popApprovalDetailCalendar').find('.modal-footer').show();
                $(this).parents('body').find('#popApprovalDetailCalendar').find('.modal-body .has-confirm').hide();
                $(this).parents('body').find('#popApprovalDetailCalendar').find('.modal-body .waiting-confirm').show();
                $(this).parents('body').find('#popApprovalDetailCalendar').find('.lst-info .txt-tit em').show();
            }

            //Check status "Nháp/Chờ duyệt"
            if(result == 1){
                $(this).parents('body').find('#popDetailCalendar').find('.lst-info .txt-ipt').prop("disabled", false);
                $(this).parents('.lst-calen-book').parents('body').find('#popDetailCalendar').find('.modal-footer').show();
                $(this).parents('body').find('#popDetailCalendar').find('.lst-info .txt-tit em').show();
            } else {
                $(this).parents('body').find('#popDetailCalendar').find('.lst-info .txt-ipt').prop("disabled", true);
                $(this).parents('.lst-calen-book').parents('body').find('#popDetailCalendar').find('.modal-footer').hide();
                $(this).parents('body').find('#popDetailCalendar').find('.lst-info .txt-tit em').hide();
            }
        });
    };

    // Change title modal-title
    var changeTitleModalTitle = function(){
        // Danh sach lich tuan
        var $weekListViewCalen = $('.week-lst-ct .tbl-calen td .txt-tit');
        var $weekListEditCalen = $('.week-lst-ct .btn-calen.btn-edit');

        $weekListViewCalen.on('click', function (){
            $(this).parents('body').find('#popCreateWeekList .modal-title').text('Xem lịch tuần đơn vị');
            $(this).parents('body').find('#popCreateWeekList').find('.lst-info .txt-ipt').prop("disabled", true);
            $(this).parents('body').find('#popCreateWeekList').find('.modal-footer').hide();
        });
        $weekListEditCalen.on('click', function (){
            $(this).parents('body').find('#popCreateWeekList .modal-title').text('Sửa lịch tuần đơn vị');
            $(this).parents('body').find('#popCreateWeekList').find('.lst-info .txt-ipt').prop("disabled", false);
            $(this).parents('body').find('#popCreateWeekList').find('.modal-footer').show();
        });

        $('.btn-add').on('click', function (){
            $(this).parents('body').find('#popCreateWeekList .modal-title').text('Thêm mới lịch tuần đơn vị');
            $(this).parents('body').find('#popCreateWeekList').find('.lst-info .txt-ipt').prop("disabled", false);
            $(this).parents('body').find('#popCreateWeekList').find('.modal-footer').show();
        });

        // Quan ly nhom
        var $createGroup = $('.js-btnCreateGr');
        var $editGroup = $('.btn-calen.btn-edit');

        $createGroup.on('click', function (){
            $(this).parents('body').find('#popCreateGroup .modal-title').text('Thêm mới nhóm');
        });
        $editGroup.on('click', function (){
            $(this).parents('body').find('#popCreateGroup .modal-title').text('Cập nhật nhóm');
        });

    };
    
    //check create calendar type 
    var createCalendarType = function() {
        $('.js-type-calen').on('click', function (){
            var isChecked = $(this).is(":checked");
            if (isChecked) {
                if($(this).parent().hasClass('roomcalendar')){
                    $('.modal-body').addClass('create-room');
                    $(this).parents('.modal-body').removeClass('create-group');
                } 
                else if($(this).parent().hasClass('groupcalendar')){
                    $('.modal-body').addClass('create-group');
                    $(this).parents('.modal-body').removeClass('create-room');
                }
                else {
                    $('.modal-body').removeClass('create-room create-group');
                }
            } else {
                $(this).parents('.modal-body').removeClass('create-room create-group');
            }

            $(this).parents('.modal-body').find('.get-lst-sel li').remove();
            $(this).parents('.modal-body').find('.js-selbox').removeClass('open');
        });
    };

    // close pop
    var evtClosepop = function() {
        $('.modal-header .btn-close').on('click', function (){
            $(this).parents('.modal-dialog').find('.get-lst-sel li').remove();
            $(this).parents('.modal-dialog').find('.js-selbox').removeClass('open');
        });
    };

    var checkNullInput = function() {
        $('.popCreateGroup .btn-save').on('click', function (){
            $(this).parents('.modal-content').find('.name-group').toggleClass('show');
        });
    };
    
    $(win).on('load', function () {
        customCalendalJs();
        openSelectDrop();
        editCalendarPop();
        getValueSelBox();
        activeViewPage();
        selectTabView();
        activeCalendarType();
        openDropPop();
        checkStatusCalendar();
        createCalendarType();
        customDatePicker();
        rightClickEvt();
        changeTitleModalTitle();
        evtClosepop();
    });

})(window, window.jQuery);