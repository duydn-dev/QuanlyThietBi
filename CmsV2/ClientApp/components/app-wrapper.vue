<template>
    <div v-if="done && !error"
         id="app-entry"
         :class="wrapCls" style="height:100%">
        <router-view />
    </div>
    <!-- <div v-else-if="error" class="container-fluid">
        <div class="row">
            <div class="col-lg-4 ml-auto mr-auto kt-mt-100 mb-auto col-sm-10">
                <div class="alert alert-dark" role="alert">
                    <div class="alert-icon">
                        <i class="flaticon-danger" />
                    </div>
                    <div class="alert-text">
                        Hệ thống chưa được kích hoạt! Vui lòng thử lại hoặc liên hệ <a class="font-weight-bold" style="color:#f68332; text-transform:uppercase" target="_blank" href="http://O2Tech.vn/">O2Tech.vn</a>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
    <div class="wrap" v-else-if="error">
    <div class="content-page d-flex align-items-center" style="position:fixed;top:50%;left:50%;width:365px;height:160px;min-height:auto;padding:5px 30px;background-color:#28293B;border-radius:10px;color:#fff;transform:translate(-50%, -50%);">
        <i class="bi bi-exclamation-triangle" style="font-size:40px;"></i>
        <p class="txt-noti" style="margin-left:20px;font-size:18px;">Hệ thống chưa được kích hoạt! Vui lòng thử lại hoặc liên hệ <a href="https://o2tech.vn/" class="d-inline-block" style="font-weight:700;color:#45A0FB;text-transform:uppercase;">O2Tech.VN</a></p>
    </div></div>
</template>
<style scoped>

</style>
<script>
    import { mapActions, mapGetters } from 'vuex';
    export default {
        name: 'AppWrapper',
        data() {
            return { done: false, error: false };
        },
        computed: {
            ...mapGetters(['system']),
            wrapCls(){
                let p=this.$route.path;
                if(p.startsWith('/login'))
                    return 'app-entry-flex';
                if(p === '/')
                    return 'wrap ecosystem-wrap';
                if(p.includes('calendar'))
                    return 'wrap calendar-wrap';
                if(p.startsWith('/wiki'))
                    return 'wrap wiki-wrap wiki-user-wrap theme-blue';
                if(p.startsWith('/management')||p.startsWith('/meet'))
                    return 'wrap general-user-wrap';                  
                if(p.startsWith('/task'))
                    return 'wrap task-wrap theme-blue';                  
                return '';
            }
        },
        methods: {
            ...mapActions(['initSystem', 'updateAppSettings', 'getListCompany', 'updateDict', 'logOut']),
            testSocket() {
                //console.log(this.$socket);
                //this.$socket.invoke('hello', { xxx: 1 });
            }            
        },
        created() {
            let loading = this.$loading.show();
            this.initSystem()
                .then(() => {
                    this.done = true;
                    let tempSettings = this.appSettings;
                    var enumCustomFieldObjects = {};
                    if (this.system.customFieldObjects)
                        for (var i = 0; i < this.system.customFieldObjects.length; i++) {
                            enumCustomFieldObjects[
                                this.system.customFieldObjects[i].name
                            ] = this.system.customFieldObjects[i].id;
                        }
                    tempSettings.enumCustomFieldObjects = enumCustomFieldObjects;
                    tempSettings = Object.assign(tempSettings, this.system);
                    if (this.system.dictionarys)
                        this.updateDict(this.system.dictionarys);
                    this.updateAppSettings(tempSettings);
                    this.CompanyId = this.system.companyId;
                    loading.hide();
                })
                .catch(() => {
                    this.error = true;
                    loading.hide();
                    //this.logOut().then(() => {
                    //    this.$router.push(`/login`);
                    //});
                });
            setTimeout(() => {
                this.testSocket();
            }, 3000);
        },
        sockets: {
            hello(data) {
                alert(data);
            }
        }
    }
</script>
