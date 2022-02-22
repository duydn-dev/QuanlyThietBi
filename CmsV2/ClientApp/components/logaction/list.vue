<template>
    <div>
        <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">
            <div id="kt_subheader" class="kt-subheader kt-grid__item">
                <div class="kt-subheader__main">
                    <h3 class="kt-subheader__title">Log hành động</h3>

                    <span class="kt-subheader__separator kt-subheader__separator--v" />
                    <div id="kt_subheader_search" class="kt-subheader__group">
                        <!-- <div class="kt-margin-l-20">
                            <input
                                type="text"
                                placeholder="Từ khóa"
                                class="form-control"
                                v-model="objData.keyword"
                                v-on:keyup.enter="search"
                            />
                        </div>-->
                        <div class="kt-input-icon kt-input-icon--right kt-subheader__search mr-2">
                            <input
                                type="text"
                                class="form-control"
                                v-model="objData.keyword"
                                @keyup.enter="pageChange(1)"
                                placeholder="Từ khóa..."
                            />
                            <span class="kt-input-icon__icon kt-input-icon__icon--right">
                                <span>
                                    <i class="fa fa-search" />
                                </span>
                            </span>
                        </div>

                        <fselect
                            v-model="objData.createdBy"
                            :options="users"
                            v-if="users"
                            placeholder="---Tất cả---"
                            style="    width: 300px;"
                            v-on:change="search"
                        />
                        <!-- <select
                            style="    width: 250px;"
                            class="form-control"
                            v-model="objData.createdBy"
                            v-on:change="search"
                        >
                            <option value>Tài khoản</option>
                            <option value="admin">Admin</option>
                            <template v-for="user in users">
                                <option
                                    :value="user.userName"
                                    v-if="users"
                                    :key="user.id"
                                >{{user.fullName}} ({{user.userName}})</option>
                            </template>
                        </select>-->
                    </div>
                </div>
            </div>
        </div>
        <div id="kt_content" class="kt-content kt-grid__item kt-grid__item--fluid">
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__body kt-portlet__body--fit">
                    <table class="table table-bordered" v-if="logs && logs.length>0">
                        <tr>
                            <th>STT</th>
                            <th>Ngày thao tác</th>
                            <th>Người thao tác</th>
                            <th>Hành động</th>
                            <th>Tác vụ</th>
                        </tr>
                        <tr v-for="(log,index) in logs" :key="log.id">
                            <td>{{index+1}}</td>
                            <td>{{log.createdDate|moment('HH:mm - DD/MM/YYYY')}}</td>
                            <td>{{log.createdBy}}</td>
                            <td>{{log.title}}</td>
                            <td>
                                <button class="btn btn-primary" @click="viewDetail(log.id)">Chi tiết</button>
                            </td>
                        </tr>
                    </table>
                    <alert v-else />
                    <div class="pr-4 pl-4 pb-4">
                        <pager
                            :total="totalRow"
                            :pageIndex="objData.pageIndex"
                            :pageSize="objData.pageSize"
                            @change="pageChange"
                        />
                    </div>
                </div>
            </div>
        </div>

        <detail v-if="itemId" @close="itemId = null" :itemId="itemId" />
    </div>
</template>
<style scoped>
tr:hover td {
    background: #f7f7f7;
}
td {
    padding: 5px 10px;
}
.log-meta {
    font-size: 13px;
    margin-top: 10px;
}
h5 {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
}
.log-item-by-lang {
    padding: 10px;
    border-bottom: solid 1px #f1f1f1;
    position: relative;
}
td .log-item-by-lang:last-child {
    border: 0;
}
.log-item-by-lang .btn {
    float: right;
    position: absolute;
    top: 3px;
    right: 10px;
}
.language-label {
    margin-right: 10px;
    font-size: 11px;
    width: 100px;
}
.new-contact td {
    font-weight: bold;
}
</style>
<script>
import detail from './detail';
export default {
    name: 'log-list',
    components: { detail },
    props: ['objectType'],
    data() {
        return {
            logs: null,
            totalRow: 0,
            objData: {
                keyword: '',
                createdBy: '',
                pageIndex: 1,
                pageSize: 20,
                objectType: this.objectType,
            },
            itemId: 0,
            users: null,
            logDetailData: null,
        };
    },
    computed: {
        
    },
    methods: {
        search() {
            this.objData.pageIndex = 1;
            this.getList();
        },
        getList() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'logaction',
                    fn: 'list',
                    ...this.objData,
                },
            })
                .then((response) => {
                    loading.hide();
                    if (response.success) {
                        this.logs = response.data;
                        this.totalRow = response.totalRow;
                    }
                })
                .catch((err) => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        getListUsers() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'user',
                    fn: 'get_list',
                },
            })
                .then((response) => {
                    loading.hide();
                    if (response.success) {
                        let data = response.data;
                        data = _.map(data, (o) => {
                            return { id: o.userName, name: `${o.fullName} (${o.userName})` };
                        });
                        data.unshift({ id: 'admin', name: 'Admin' });
                        this.users = data;
                    }
                })
                .catch((err) => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        viewDetail(id) {
            this.itemId = id;
        },
        pageChange(pageNum) {
            this.$set(this.objData, 'pageIndex', pageNum);
            this.getList();
        },
        processData(data) {
            try {
                return JSON.parse(data);
            } catch (e) {
                return {};
            }
        },
    },
    created() {
        this.getList();
        this.getListUsers();
    },
};
</script>