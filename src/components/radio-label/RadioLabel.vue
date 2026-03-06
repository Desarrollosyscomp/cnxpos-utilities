<template>
    <div class="radio-label" :class="{ 'disabled': disabled }">
        <div class="content">
            <div class="title">{{ title }}</div>
            <div class="subtitle">{{ subtitle }}</div>
        </div>
        <div :class="['radio', is_checked && !is_disabled ? 'checked' : '']" @click="emit('on-select', meta)">
            {{is_checked && !is_disabled ? '✓' : ''}}
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue-demi';


const props = defineProps({
    title: {
        type: String,
        required: true,
        default: '[[title required]]'
    },
    subtitle: {
        type: String,
        required: false,
    },
    checked: {
        type: Boolean,
        required: false,
        default: false
    },
    meta: {
        type: Object,
        required: false,
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false
    }
})

let is_checked = ref(false)
let is_disabled = ref(false)
watch(()=>props.checked, () => {
    is_checked.value = props.checked
})
watch(()=>props.disabled, () => {
    is_disabled.value = props.disabled
})

const emit = defineEmits(['on-select'])

</script>
<style scoped>

.radio-label {
    border: 1px solid var(--color-contrast);
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
}
.content{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.title{
    color: var(--color-contrast);
    font-weight: 800;
    font-size: 14px;
}
.subtitle{
    color: var(--color-contrast);
    font-size: 14px;
}

.radio{
    border: 3px solid var(--color-contrast);
    border-radius: 50%;
    padding: 2px;
    width: 16px;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
}

.radio.checked{
    background-color: var(--color-contrast);
    color: var(--color-primary-dark-2);
}

.radio-label.disabled{
    opacity: 0.5;
    cursor: not-allowed;
}

@media (max-width: 320px) {
    .radio{
        width: 12px;
        aspect-ratio: 1/1;
    }
    .radio-label {
        padding: 8px;
    }
}
</style>