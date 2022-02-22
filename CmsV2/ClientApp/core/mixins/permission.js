import Vue from 'vue';

Vue.mixin({
    methods: {
        checkPermission(menuItem) {
            // var allPers = [];
            // if (menuItem.permissions && menuItem.permissions.length > 0)
            //     allPers = allPers.concat(menuItem.permissions);
            // //Nếu có con thì check quyền theo con
            // var childCustomPermission = false;
            // if (menuItem.childs && menuItem.childs.length > 0) {
            //     this._.each(menuItem.childs, (item) => {

            //         if (item.customPermission) {
            //             var cf = item.customPermission.call(this);
            //             if (cf)
            //                 childCustomPermission = cf;
            //         }
            //         if (item.permissions && item.permissions.length > 0)
            //             allPers = allPers.concat(item.permissions);
                        
            //         //Nếu có con cấp nữa thì cấp theo con
            //         if (item.childs && item.childs.length > 0) {
            //             this._.each(item.childs, (k) => {
            //                 if (k.customPermission) {
            //                     var cfk = k.customPermission.call(this);
            //                     if (cfk)
            //                         childCustomPermission = cfk;
            //                 }
            //                 if (k.permissions && k.permissions.length > 0) {
            //                     allPers = allPers.concat(k.permissions);
            //                 }
            //             });
            //         }
            //     });
            // }
            // if (childCustomPermission)
            //     return true;
            // let finishPers = [];
            // this._.each(allPers, (item) => {
            //     if (this.permissions[item]) {
            //         finishPers.push(this.permissions[item]);
            //     }
            // });
            // let hasPermission = false;
            // if (menuItem.customPermission) {
            //     hasPermission = menuItem.customPermission.call(this) && (this.isPermission(finishPers) || finishPers.length == 0);
            // } else {
            //     hasPermission = this.isPermission(finishPers);
            // }
            // return hasPermission;
            return true;
        }
    }
});