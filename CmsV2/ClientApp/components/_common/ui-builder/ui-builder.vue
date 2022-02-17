<template>
    <div class="container-fluid ui-builder-wrapper" v-if="mode=='edit'">
        <div class="row">
            <div class="ui-builder-toolbar">
                <div class="mt-2 kt-mb-10">
                    <button type="button" class="btn btn-success" @click="addBlock"><i class="fa fa-plus"></i>Thêm nội dung</button>
                    <button type="button" class="btn btn-danger" @click="removeBlock"><i class="fa fa-times"></i>Xóa nội dung</button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="ui-builder-design-area col-6">
                <vue-resizable :minWidth="100" :minHeight="30" @resize:end="resizeParentEnd" :width="wrapperWidth" :height="wrapperHeight" v-if="loaded">
                    <div style="position: relative;" class="resizable-content">
                        <ui-item-wrapper :w="blocks[i].w" :h="blocks[i].h" :x="blocks[i].x" :y="blocks[i].y" @dragstop="onDragStop" @resizestop="onResizeStop" @activated="onActived(i)" @deactivated="onDeActived" :parent="false" v-for="(block,i) in blocks" :key="block.id">
                            <input type="text" style="width:100%; height:100%" v-model="blocks[i].text" />
                        </ui-item-wrapper>
                    </div>
                </vue-resizable>
            </div>
            <div class="col-6" id="preview-stamp">
                <div :style="previewStyle" class="resizable-content" :key="'p'+previewKey">
                    <input type="text" v-for="(block,i) in blocks" :key="'preview'+block.id" disabled="disabled" :value="blocks[i].text" :style="blockStyles[i]" />
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="mode=='preview' && this.blocks && this.blocks.length>0" class="stamp-preview-wrapper">
        <div :style="previewStyle" class="resizable-content" :key="'p'+previewKey">
            <input type="text" v-for="(block,i) in blocks" :key="'preview'+block.id" disabled="disabled" :value="blocks[i].text" :style="blockStyles[i]" />
        </div>
    </div>
    <div v-else-if="mode=='edit-content' && this.blocks && this.blocks.length>0">
        <div :style="previewStyle" class="resizable-content" :key="'p'+previewKey">
            <input type="text" v-for="(block,i) in blocks" :key="'preview'+block.id" v-model="blocks[i].text" :style="blockStyles[i]" />
        </div>
    </div>
</template>
<style>
    .ui-builder-wrapper { padding: 20px; }
    .ui-builder-design-area input { border: dashed 1px #ccc; resize: none; outline: none; background: transparent; color: red; font-weight: bold; }
    .resizable-content { height: 100%; width: 100%; border: solid 3px red; }
    #preview-stamp input, .stamp-preview-wrapper input { border: 0; background: transparent; outline: none; color: red; font-weight: bold; }
</style>
<script>
    import VueResizable from 'vue-resizable'
    export default {
        name: 'ui-builder',
        components: { VueResizable },
        props: {
            templateData: null,
            widgets: {
                type: Array,
                default() {
                    return ['text'];
                }
            },
            mode: {
                type: String,
                default() {
                    return 'edit';
                }
            }
        },
        data: function () {
            return {
                blocks: [],
                activeBlockIndex: 0,
                wrapperWidth: 200,
                wrapperHeight: 200,
                previewKey: 0,
                loaded: false
            }
        },
        computed: {
            previewStyle() {
                return `position: relative;width:${this.wrapperWidth}px;height:${this.wrapperHeight}px`;
            },
            blockStyles() {
                return this._.map(this.blocks, (item) => {
                    return {
                        position: 'absolute',
                        top: item.y + 'px',
                        left: item.x + 'px',
                        width: item.w + 'px',
                        height: item.h + 'px'
                    };
                })
            }
        },
        methods: {
            onResizeStop: function (x, y, width, height) {
                this.blocks[this.activeBlockIndex].x = x;
                this.blocks[this.activeBlockIndex].y = y;
                this.blocks[this.activeBlockIndex].w = width;
                this.blocks[this.activeBlockIndex].h = height;
                this.previewKey++;
            },
            onDragStop: function (x, y) {
                this.blocks[this.activeBlockIndex].x = x;
                this.blocks[this.activeBlockIndex].y = y;
                this.previewKey++;
            },
            onActived(i) {
                this.activeBlockIndex = i;
            },
            onDeActived() {

            },
            addBlock() {
                this.blocks.push({
                    id: 'item' + new Date().getTime(),
                    w: 100,
                    h: 30,
                    x: 0,
                    y: 0,
                    text: ''
                });
                this.previewKey++;
            },
            removeBlock() {
                this.blocks.splice(this.activeBlockIndex, 1);
            },
            resizeParentEnd(x) {
                this.wrapperWidth = x.width;
                this.wrapperHeight = x.height;
                this.previewKey++;
            },
            getData() {
                let _data = {
                    wrapperWidth: this.wrapperWidth,
                    wrapperHeight: this.wrapperHeight,
                    blocks: this.blocks
                }
                return _data;
            }
        },
        created() {
            if (this.templateData) {
                let _data = this.templateData;
                if (typeof (_data) == 'string')
                    _data = JSON.parse(_data);
                this.wrapperWidth = _data.wrapperWidth;
                this.wrapperHeight = _data.wrapperHeight;
                this.blocks = _data.blocks;
            }
            else if (this.blocks.length == 0)
                this.addBlock();
            this.loaded = true;
        }
    };
</script>
