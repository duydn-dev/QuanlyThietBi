import Vue from 'vue';

Vue.mixin({
    methods: {
        getFilter(key) {
            let temp = localStorage.filter;
            if (temp) {
                temp = JSON.parse(temp);
                return temp[key];
            }
            return null;
        },
        saveFilter(key, obj) {
            let temp = localStorage.filter;
            if (!temp)
                temp = {};
            else
                temp = JSON.parse(temp);
            temp[key] = obj;
            localStorage.setItem('filter', JSON.stringify(temp));
        },
        removeFilter(key) {
            if (!key)
                localStorage.setItem('filter', "");
            else {
                var temp = this.getFilter(key);
                if (temp)
                    localStorage.setItem('filter', JSON.stringify(temp));
                else
                    localStorage.setItem('filter', "");
            }
        }
    }
});