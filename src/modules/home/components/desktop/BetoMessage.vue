<template>
    <div class="beto-message-container">
        <img :src="BetoImg">
        <div class="bubble bubble-a bubble-left">
            <slot></slot>
            <span class="slot-content"><slot name="content"></slot></span>
        </div>
    </div>
</template>
<script setup>
import BetoImg from "../../../../assets/avatars/beto.svg"

</script>
<style scoped>
@import "../../../../utils/css/dialog-bubble.css";
.beto-message-container{
    display:flex;
    align-items: center;
    gap: 10px;
    padding: 20px;
}
.bubble-a.bubble{
    --border: 1px;
    --border-color: var(--color-contrast);
    --background: var(--color-primary-light);
    --triangle-size: 1;

    color: var(--color-contrast);
    font-size: 12px;

    line-height: 18px;
    text-align: center;
}
.bubble > :nth-child(1){
    font-weight: bold;
    font-size:16px;
    margin-bottom: 10px;
}
.slot-content{
    font-weight: 400 !important;
    font-size: 12px !important;

}
</style>