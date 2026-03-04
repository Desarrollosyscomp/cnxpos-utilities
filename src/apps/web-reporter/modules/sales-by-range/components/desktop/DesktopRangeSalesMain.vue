<script setup lang="ts">
// import CenterAndScroll from '../../../../../../components/CenterAndScroll.vue';

</script>

<template>
    <div class="app-plain-background"></div>
    <div class="container">
        <div class="corners left-bar spaces-padding">
            asd
        </div>
        <div class="corners content spaces-padding">content</div>
    </div>
</template>

<style scoped>
@import "../../../../../../styles/backgrounds.css";
.container{
    display: grid;
    grid-template-columns: 20% 1fr;
    width: 100%;
    height: 100%;
}
.corners{
    border-radius: 10px;
}
.left-bar{
    margin: 10px;
    margin-right: 5px;
    display: flex;
    flex-direction: column;
    background-color: var(--color-primary-dark);
}

.content{
    margin: 10px;
    margin-left: 5px;
    background-color: var(--color-primary-dark);
}
.spaces-padding{
    padding: 10px;
}
</style>