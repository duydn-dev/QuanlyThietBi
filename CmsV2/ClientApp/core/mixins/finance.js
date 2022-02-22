import Vue from 'vue';
if (!process.env.VUE_ENV) {
    Vue.mixin({
        methods: {
            getFinanceObjects(systemType, type) {
                if (!this.appSettings.configs || !this.appSettings.configs.financeObjectTypes)
                    return []

                let temps = this.appSettings.configs.financeObjectTypes;

                if (systemType)
                    temps = _.filter(temps, o => {
                        return o.lstSystemType && o.lstSystemType.includes(systemType)
                    })

                if (type)
                    temps = _.filter(temps, o => {
                        return o.lstType && o.lstType.includes(type)
                    })

                return temps;
            },
        },
        computed: {
        },
    });
}