; (function (win, $) {
    'use strict';

    var openDropPopHeader = function() {
        $('.topbar-menu .js-btn-drop').on('click', function (){
            $(this).parents('.js-btn-showPopHeader').find('.drop-menu').toggleClass('show');

            var $showed = $(this).parents('.itm-topbar').find('.drop-menu');
            if($showed.hasClass('show')){
                $(this).parents('.itm-topbar').addClass('open');
            } else {
                $('.topbar-menu .lst-topbar-menu').find('.open').removeClass('open');
            }
        });

        // open list system
        $('.topbar-menu .itm-system .js-btn-drop').on('click', function (){
            if(($('.itm-system').hasClass('open'))){
                $(this).parents('.wrap').addClass('bg-overlay');
            } else {
                $('.topbar-menu .itm-system').parents('.wrap').removeClass('bg-overlay');
            }
        });
    };
    
    $(win).on('load', function () {
        openDropPopHeader();
    });

})(window, window.jQuery);