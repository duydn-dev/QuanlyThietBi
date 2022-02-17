<template>
    <div :class="[cssClass, cClass]" :style="style" class="badge">
        <b>{{ val }}</b>
    </div>
</template>

<script>
export default {
    name: 'Avatar',
    props: {
        size: {
            type: Number,
            default: 40
        },
        radius: {
            type: null,
            default: '50%'
        },
        background: {
            type: String
        },
        cClass: {
            type: String
        },
        val: null
    },

    data() {
        return {
            backgroundColors: [
                'badge-danger',
                'badge-dark',
                'badge-info',
                'badge-primary',
                'badge-secondary',
                'badge-success',
                'badge-warning'
            ]
        };
    },
    computed: {
        cssClass() {
            if (this.cClass && this.cClass != '') return this.cClass;
            //let index = Math.floor(Math.random() * this.backgroundColors.length)
            return 'badge-secondary'; // this.backgroundColors[index];
        },
        style() {
            const style = {
                width: `${this.size}px`,
                height: `${this.size}px`,
                borderRadius: this.radius,
                textAlign: 'center',
                verticalAlign: 'middle',
                backgroundColor: this.background || ''
            };

            const initialBackgroundAndFontStyle = {
                font: Math.floor(this.size / 3) + 'px/100px',
                fontWeight: 'normal',
                lineHeight: `${this.size - 12 + Math.floor(this.size / 20)}px`
            };

            Object.assign(style, initialBackgroundAndFontStyle);

            return style;
        }
    }
};
</script>
