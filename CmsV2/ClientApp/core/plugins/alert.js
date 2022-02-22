import Vue from 'vue';
import alert from 'sweetalert2';

alert.setDefaults({
    width: '400px'
});

Vue.prototype.$alert = alert;

Vue.prototype.$confirm = (msg, okLabel, cancelLabel, isShowCancel) => {
    return new Promise((resolve) => {
        alert({
            title: 'Xác nhận',
            html: msg,
            type: "warning",
            showCancelButton: isShowCancel != false ?  true: false ,
            confirmButtonColor: '#4cae4c',
            confirmButtonText: okLabel || 'Ok',
            cancelButtonText: cancelLabel || 'Hủy',
        }).then((res) => {
            if (res.value) {
                return resolve();
            }
        });
    });
}
Vue.prototype.$confirmC = (msg, okLabel, cancelLabel) => {
    return new Promise((resolve) => {
        alert({
            title: 'Xác nhận',
            text: msg,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#4cae4c',
            confirmButtonText: okLabel || 'Ok',
            cancelButtonText: cancelLabel || 'Hủy',
        }).then((res) => {
            let ok = res.value || false;
            return resolve(ok);
        });
    });
}
//Vue.prototype.$alert = (msg, okLabel) => {
//    return new Promise((resolve, reject) => {
//        alert({
//            title: 'Cảnh báo',
//            html: msg,
//            type: "warning",
//            showCancelButton: false,
//            confirmButtonColor: '#4cae4c',
//            confirmButtonText: okLabel || 'OK',
//        }).then((res) => {
//            if (res.value) {
//                return resolve();
//            }
//        });
//    });
//}
Vue.prototype.$message = (msg, type) => {
    return new Promise(() => {
        alert({
            type: type || 'success',
            title: msg || '',
            showConfirmButton: false,
            timer: 1500
        });
    });
}


Vue.prototype.$success = (msg) => {
    return new Promise(() => {
        alert({
            type: 'success',
            title: msg || '',
            showConfirmButton: false,
            timer: 1500
        });
    });
}

Vue.prototype.$error = (msg, showConfirm) => {
    return new Promise(() => {
        alert({
            type: 'error',
            html: msg || '',
            showConfirmButton: showConfirm || false,
            timer: showConfirm ? 15000 : 1500
        });
    });
}

Vue.prototype.$info = (msg) => {
    return new Promise(() => {
        alert({
            type: 'info',
            title: msg || '',
            showConfirmButton: false,
            timer: 1500
        });
    });
}
Vue.prototype.$warning = (msg) => {
    return new Promise(() => {
        alert({
            type: 'warning',
            title: msg || '',
            showConfirmButton: false,
            timer: 1500
        });
    });
}