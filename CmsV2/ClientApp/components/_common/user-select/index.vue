<template>
    <div class="avatar-select-wrapper">
        <template v-if="!isDescription">
            <div v-for="(user, i) in displayUsers" :key="user.id" class="input-group mb-2">
                <div class="input-group-prepend" v-if="user.avatar == '' || user.avatar == null ">
                    <span id="basic-addon2" class="input-group-text">
                        <i class="fa fa-user" aria-hidden="true" />
                    </span>
                </div>
                <div v-else>
                    <avatar :src="user.avatar" :username="user.name" class="avatarMember" />
                </div>
                <input type="text" class="form-control disabled" disabled :value="user" />
                <div class="input-group-append" v-if="!isView">
                    <button
                        class="btn btn-primary btn-icon btn-sm"
                        type="button"
                        @click="edit(listUser, i)"
                        v-if="isSelectOne"
                    >
                        <i class="fa fa-edit" />
                    </button>
                    <button
                        class="btn btn-danger btn-icon btn-sm"
                        type="button"
                        @click="$delete(listUser, i)"
                        v-else
                    >
                        <i class="fa fa-times" />
                    </button>
                </div>
            </div>
        </template>
        <template v-else>
            <div v-for="(item, i) in listUser" :key="item.id" class="input-group mb-2">
                <div class="col-sm-12">
                    <label>Nhân viên</label>
                    <br />
                    <div class="input-group mb-2">
                        <input
                            type="text"
                            class="form-control disabled"
                            disabled
                            :value="item.name"
                        />
                        <div class="input-group-append" v-if="!isView">
                            <button
                                class="btn btn-danger btn-icon btn-sm"
                                type="button"
                                @click="$delete(listUser, i)"
                            >
                                <i class="fa fa-times" />
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12">
                    <div class="form-group">
                        <label>Phụ trách công việc</label>
                        <textarea
                            v-model="item.workPosition"
                            placeholder="Nhập công việc của nhân viên"
                            class="col-sm-12 form-control"
                        />
                    </div>
                </div>
                <div class="col-sm-12">
                    <hr />
                </div>
            </div>
        </template>
        <div class="mb-2" v-if="!(isSelectOne &&  listUser && listUser.length == 1) && !isView">
            <button class="btn custom-file-upload" @click="showUserSelect()">
                <i class="icon-span-filestyle fas fa-plus-circle" />Chọn nhân viên
            </button>
        </div>
        <div slot="outside">
            <user-select
                v-if="isUserSelect"
                :isShowBranch="isShowBranch"
                :isShowDepartment="isShowDepartment"
                @close="hideUserSelect()"
                v-model="userSelected"
                :maxSelected="maxSelected"
            />
        </div>
    </div>
</template>

<script>
import userSelect from './user-select';

export default {
    name: 'ListUserSelect',
    components: { userSelect },
    props: {
        src: null,
        maxSelected: {
            type: Number,
            default: 10000
        },
        isShowBranch: {
            type: Boolean,
            default: false
        },
        isShowDepartment: {
            type: Boolean,
            default: true
        },
        isDescription: {
            type: Boolean,
            default: false
        },
        orderId: {
            type: Number,
            default: 0
        },
        isView: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isUserSelect: false,
            listUser: [],
            listUserWithWork: [],
            userSelected: [],
            isLoad: false
        };
    },
    computed: {
        displayUsers() {
            let _users = [];
            this._.each(this.listUser, o => {
                _users.push(o.name || '');
            });
            return _users;
        },
        isSelectOne() {
            return this.maxSelected == 1;
        }
    },
    watch: {
        userSelected(val) {
            if (this.isSelectOne) {
                this.listUser = [];
                this.listUser.push(val);
            } else if (val && val.length > 0) {
                for (let o of val) {
                    if (!_.find(this.listUser, ['id', o.id])) {
                        if (!this.isDescription) {
                            this.listUser.push(o);
                        } else {
                            o.workPosition = '';
                            o.orderId = this.orderId;
                            o.laborOrderId = this.orderId;
                            o.userId = o.id;
                            this.listUser.push(o);
                        }
                    }
                }
            }

            //let ids = _.map(val, "id");
            //this.$emit('input', ids);
            this.$emit('input', this.listUser);
            this.$emit('close');
        },
        src() {
            this.reloadSource();
        }
    },
    created() {
        this.reloadSource();
    },
    methods: {
        reloadSource() {
            if (this.src) {
                this.listUser = this.src;
            }
        },
        showUserSelect() {
            this.isUserSelect = true;
        },
        hideUserSelect() {
            this.isUserSelect = false;
        },
        edit() {
            this.isUserSelect = true;
        }
    }
};
</script>
<style scoped>
input[type='file'] {
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
}

.custom-file-upload {
    display: inline-block;
    padding: 5px 10px;
    cursor: pointer;
    position: relative;
    text-align: center;
    background: #2196f3;
    color: #fff;
    border: 0;
    overflow: hidden;
}
</style>
