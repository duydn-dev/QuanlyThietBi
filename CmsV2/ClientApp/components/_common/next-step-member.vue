<template>
    <div v-if="totalButton >0" :style="displayInline ? 'display:inline-block':''">
        <b-dropdown
            id="dropdown-action"
            text="Chuyển học viên"
            variant="primary"
            v-if="totalButton > 1"
            :disabled="!isValid()"
        >
            <b-dropdown-item
                v-for="[key, value] of Object.entries(this.objButton)"
                :key="key"
                @click="nextMemberStep(key)"
                :disabled="!value.isValid"
            >
                <span
                    v-for="(department, index) in value"
                    :key="department.stepId"
                >{{department.department }}{{(value.length - 1 > index) ? ',&nbsp;' : ''}}</span>
            </b-dropdown-item>
        </b-dropdown>
        <button
            class="btn btn-primary"
            v-for="[key, value] of Object.entries(this.objButton)"
            :key="key"
            @click="nextMemberStep(key)"
            :disabled="!isValid()"
            v-else
        >
            Chuyển&nbsp;
            <span
                v-for="(department, index) in value"
                :key="department.stepId"
            >{{department.department }}{{(value.length - 1 > index) ? ',&nbsp;' : ''}}</span>
        </button>

        <guardianDebt
            v-if="nextStepFinance"
            :members="members"
            @close="nextStepFinance = 0"
            @save="nextStepWithDebt"
            :systemTypeId="systemTypeId"
        />
    </div>
</template>

<script>
import guardianDebt from './guardian-debt';
export default {
    props: ['members', 'departmentCode', 'displayInline', 'systemTypeId', 'checkDebt'],
    components: { guardianDebt },
    data() {
        return {
            objButton: {},
            nextStepFinance: 0,
        };
    },
    computed: {
        memberIds() {
            if (this.members) return this.members.map((c) => c.id);
            return null;
        },
        totalButton() {
            return Object.entries(this.objButton).length;
        },
    },
    methods: {
        nextMemberStep(step) {
            if (!this.checkDebt) {
                this.saveNextStep(step);
            } else {
                this.nextStepFinance = step;
            }
        },
        saveNextStep(step, lstDebt, enterPriseBranchId) {
            if (this.memberIds && this.memberIds.length > 0 && this.departmentCode) {
                this.$confirm('Bạn có chắc chắn muốn chuyển học viên').then(() => {
                    if (enterPriseBranchId) this.sendToEnterprise(lstDebt, enterPriseBranchId);

                    let loading = this.$loading.show();
                    let temp = this.objButton[step];
                    temp = temp.map((c) => c.stepId);
                    let stepIds = temp ? JSON.stringify(temp) : '';
                    let debts = '';
                    if (lstDebt) debts = JSON.stringify(lstDebt);
                    this.$http({
                        data: {
                            m: 'Workflow',
                            fn: 'next_step',
                            memberIds: JSON.stringify(this.memberIds),
                            departmentCode: this.departmentCode,
                            workFlowCode: this.CONSTANTS.WORKFLOW_MEMBER_CODE,
                            currentStepId: step,
                            stepIds: stepIds,
                            systemTypeId: this.systemTypeId,
                            debts: debts,
                        },
                    })
                        .then(() => {
                            loading.hide();
                            this.$message('Chuyển thành công');
                            this.$emit('updateSuccess');
                            this.resetIsValid();
                            this.nextStepFinance = 0;
                        })
                        .catch((err) => {
                            loading.hide();
                            return this.$message(err.message, 'error');
                        });
                });
            } else this.$error('Chọn học viên chuyển');
        },
        nextStepWithDebt(lstMember, enterPriseBranchId) {
            this.saveNextStep(this.nextStepFinance, lstMember, enterPriseBranchId);
        },
        sendToEnterprise(lstMember, branchId) {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'laborMember',
                    fn: 'send-to-enterprise',
                    memberIds: JSON.stringify(lstMember.map((c) => c.objectId)),
                    branchId: branchId,
                },
            })
                .then(() => {
                    loading.hide();
                })
                .catch((err) => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        getListButton() {
            this.$http({
                data: {
                    m: 'Workflow',
                    fn: 'next_step_department',
                    departmentCode: this.departmentCode,
                    workFlowCode: this.CONSTANTS.WORKFLOW_MEMBER_CODE,
                    systemTypeId: this.systemTypeId,
                },
            })
                .then((response) => {
                    this.objButton = response.data;
                })
                .catch((err) => {
                    return this.$message(err.message, 'error');
                });
        },
        isValid() {
            if (!this.members) return false;
            // check member cùng step
            const set = new Set(this.members.map((c) => c.workflowCurrentStep));
            let steps = [...set];
            let isValid = steps.length == 1;

            if (!isValid) return isValid;
            let step = steps[0];
            if (this.objButton[step]) {
                this.objButton[step].isValid = true;
            }
            return Object.values(this.objButton).filter((c) => c.isValid).length > 0;
        },
        resetIsValid() {
            for (let item of Object.values(this.objButton)) {
                item.isValid = false;
            }
        },
    },
    created() {
        this.getListButton();
    },
};
</script>

<style>
</style>