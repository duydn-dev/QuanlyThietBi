<template>
    <modal :title="title" :width="1000" @close="closePopup()" :zIndex="1051">
        <div slot="body" id="printContainer">
            <slot name="containerPrint">Các element cần in</slot>
        </div>
        <div slot="footer">
            <button class="btn btn-primary" secondary @click="print()">
                <i class="fa fa-print" />
                In
            </button>
            <button class="btn btn-danger" @click="closePopup()">
                <span>Thoát</span>
            </button>
        </div>
    </modal>
</template>

<script>
export default {
    props: {
        elementPrintId: {
            type: String,
            default: 'printContainer'
        },
        title: {
            type: String,
            default: 'In'
        }
        //classes,
    },
    data() {
        return {};
    },
    methods: {
        closePopup() {
            this.$emit('close');
        },

        appendFile() {
            _.forEach(this.classes, o => {
                let file = document.createElement('link');
                file.rel = 'stylesheet';
                file.href = o;
                document.head.appendChild(file);
            });
        },
        print() {
            let self = this;
            this.$print(
                this.elementPrintId,
                {
                    styles: [
                        this.appSettings.baseUrl + '/form-profile-file-template/base.css',
                        this.appSettings.baseUrl + '/bill/base.css'
                    ]
                },
                function() {
                    //self.itemPrint = null;
                    self.$emit('close');
                }
            );

          
        }
        // mounted() {
        //     this.appendFile();
        // }
    }
};
</script>

<style scoped>
</style>