<template>
    <wrapperv2>
        <template slot="header-search">
            <slot name="header-search">

            </slot>
        </template>
        <template slot="side-bar">
            <menu-left :key="appSettings.CompanyId" />      
        </template>
        <div class="content-page d-flex">
            <div class="main-ct">
                <slot></slot>
            </div>
        </div>     
    
    </wrapperv2>
</template>

<style scoped>
@import '/assets-v2/general-user-info/css/general-user-info.css';

</style>
<script>

 import menuLeft from './management-menu-left.vue';
 

export default {  
    components: {
        menuLeft        
    }    
};
</script>
