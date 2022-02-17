; (function (win, $) {
    'use strict';

    //Active item Left Sidebar
    var activeMenuHeader = function () {
        // when click
        var $itemMenu = $('.side-nav .sidenav-itm>a');

        $itemMenu.click(function () {
            $('.sidenav-itm>a').parent().removeClass("is-active");
            $(this).parent().addClass('is-active');
        });
    };

    // Change title modal-title
    var changeTitleModalTitle = function(){
        // Nhóm quyền
        var $createGroup = $('.js-btnCreate');
        var $editGroup = $('.btn-wrap .btn-edit');

        $createGroup.on('click', function (){
            $(this).parents('body').find('#popEventGroup .modal-title').text('Thêm mới nhóm');
        });
        $editGroup.on('click', function (){
            $(this).parents('body').find('#popEventGroup .modal-title').text('Cập nhật nhóm');
        });

        // Phòng ban
        var $createRoom = $('.box-manage-room .js-btnCreate');
        var $editRoom = $('.box-manage-room .btn-wrap .btn-edit');

        $createRoom.on('click', function (){
            $(this).parents('body').find('#popEventRoom .modal-title').text('Thêm mới phòng ban');
        });
        $editRoom.on('click', function (){
            $(this).parents('body').find('#popEventRoom .modal-title').text('Sửa phòng ban');
        });

        // Chức danh
        var $createRoom = $('.box-manage-position .js-btnCreate');
        var $editRoom = $('.box-manage-position .btn-wrap .btn-edit');

        $createRoom.on('click', function (){
            $(this).parents('body').find('#popEventPosition .modal-title').text('Thêm mới chức danh');
        });
        $editRoom.on('click', function (){
            $(this).parents('body').find('#popEventPosition .modal-title').text('Sửa chức danh');
        });

    };
    
    $(win).on('load', function () {
        activeMenuHeader();
        changeTitleModalTitle();
    });

})(window, window.jQuery);