// const EventEmitter = require('events');

// const defaultOptions = {
//     log: false
// };
// jQuery.loadScript = function (url, callback) {
//     jQuery.ajax({
//         url: url,
//         dataType: 'script',
//         success: callback,
//         async: true
//     });
// }

// //class SocketConnection extends EventEmitter {
// //    constructor(connection) {
// //        super();

// //        this.connection = connection;
// //        this.listened = [];
// //        this.socket = false;

// //        this.toSend = [];

// //        this.offline = false;
// //    }

// //    async _initialize(connection = '') {
// //        const con = connection || this.connection;

// //        try {
            
// //            $.connection.hub.url = window.appSettings.ApiUrl + "/signalr";
// //            $.connection.hub.qs = { 'UserId': '35' };
// //            var systemHub = $.connection.systemHub;
// //            systemHub.client.hello = (msg) => {
// //                console.log(msg);
// //            };

// //            const socket = $.connection.hub;

// //            socket.start().done(() => {
// //                console.log('hub connected!');
// //            });
            
// //            this.socket = socket;
// //            this.emit('init');
// //        } catch (error) {
// //            if (this.options.log) console.log('Error, reconnecting...');
// //        }
// //    }

// //     start(options = {}) {
// //        this.options = Object.assign(defaultOptions, options);

// //         this._initialize();
// //    }

// //     authenticate(accessToken, options = {}) {
// //        this.connection = `${this.connection}?authorization=${accessToken}`;

// //         this.start(options);
// //    }

// //    listen(method) {
// //        if (this.offline) return;

// //        if (this.listened.some(v => v === method)) return;
// //        this.listened.push(method);

// //        this.on('init', () => {
// //            this.socket.on(method, (data) => {
// //                if (this.options.log) console.log({ type: 'receive', method, data });

// //                this.emit(method, data);
// //            });
// //        });
// //    }

// //    send(methodName, ...args) {
// //        if (this.options.log) console.log({ type: 'send', methodName, args });
// //        if (this.offline) return;

// //        if (this.socket) {
// //            this.socket.send(methodName, ...args);
// //            return;
// //        }

// //        this.once('init', () => this.socket.send(methodName, ...args));
// //    }

// //    async invoke(methodName, ...args) {
// //        if (this.options.log) console.log({ type: 'invoke', methodName, args });
// //        if (this.offline) return false;

// //        if (this.socket) {
// //            return this.socket.invoke(methodName, ...args);
// //        }

// //        return new Promise(resolve =>
// //            this.once('init', () =>
// //                resolve(this.socket.invoke(methodName, ...args))));
// //    }

// //}


// function install(Vue) {
    
//     var isLoaded = false;
//     var loadHubInterval = null;
//     loadHubInterval = setInterval(() => {
//         if (typeof (window.appSettings !== undefined) && !isLoaded) {
//             isLoaded = true;
//             $.loadScript(window.appSettings.ApiUrl + '/signalr/hubs', () => {
//                 $(() => {

//             $.connection.hub.url = window.appSettings.ApiUrl + "/signalr";
//             $.connection.hub.qs = { 'UserId': '35' };
//             var systemHub = $.connection.systemHub;
//             systemHub.client.hello = (msg) => {
//                 console.log(msg);
//             };

//                     //const Socket = new SocketConnection(window.appSettings.ApiUrl + "/signalr");
//                     //console.log('------------SOCKET', Socket);
//                     Vue.socket = systemHub;

//                     Object.defineProperties(Vue.prototype, {
//                         $socket: {
//                             get() {
//                                 return systemHub;
//                             }
//                         }
//                     });

//                     Vue.mixin({
//                         created() {
//                             if (this.$options.sockets) {
//                                 const methods = Object.getOwnPropertyNames(this.$options.sockets);
//                                 methods.forEach((method) => {
//                                     systemHub.listen(method);
//                                     systemHub.on(method, data =>
//                                         this.$options.sockets[method].call(this, data));
//                                 });
//                             }

//                             if (this.$options.subscribe) {
//                                 systemHub.on('authenticated', () => {
//                                     this.$options.subscribe.forEach((channel) => {
//                                         systemHub.invoke('join', channel);
//                                     });
//                                 });
//                             }
//                         }
//                     });
//                 });
//             });
//         } else {
//             clearInterval(loadHubInterval);
//         }
//     }, 1000);
// }

// export default install;
