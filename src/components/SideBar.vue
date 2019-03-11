<template>
<div class="side-bar">
<brand></brand>
<ul class="nav-items">
     <li class="current-page">Home</li>
     <li>Downloads</li>
     <li>Settings</li>
     <li>Help</li>
 </ul>
 </div>
</template>
<script>
import Brand from '@/components/Brand.vue'
export default {
  name: 'SideBar',
  components: {
    Brand
  }
}
</script>
<style lang="scss" scoped>
.side-bar {
    background-color: #B64926;
    color: rgb(87, 28, 8);
        display: grid;
        list-style-type: none;
        grid-template-rows: 1fr 4fr;
        grid-template-columns: 1fr;
        justify-content: center;
        align-items: center;
        justify-items: center;
        @import '@/scss/elements/_brand.scss';
        .nav-items {
            display: grid;
            list-style-type: none;
            margin: 0;
            padding: 0;
            width: 100%;
            li {
                text-transform: lowercase;
                font-family:  'Open Sans', sans-serif;
                font-size: 0.9em;
                font-weight: 400;
                padding: 1.5em;
                cursor: pointer;

            }
            .current-page {
                border-left-width: 0.3em;
                border-left-color: #131313;
                border-left-style: solid;
                font-weight: 600;
            }
        }
    }
</style>
