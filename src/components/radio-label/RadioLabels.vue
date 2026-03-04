<template>
    <div class="radio-labels-container">
        <RadioLabel
            v-for="(option, i) in options"
            :key="option.title"
            :title="option.title"
            :subtitle="option.subtitle"
            :meta="option.meta" @on-select="(meta) => onSelect(i, meta)"
            :checked="selected === i"
            :disabled="is_disabled"
        />
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue-demi";
import RadioLabel from "./RadioLabel.vue";

export type TOptionsType = {
    title: string,
    subtitle: string,
    meta: any,
}


const props = defineProps({
    options: {
        type: Array<TOptionsType>,
        required: true
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false
    }
})


const emit = defineEmits(['checked-option'])

let selected = ref<number | null>(null)
let is_disabled = ref<boolean>(false)
watch(()=>props.disabled, () => {
    is_disabled.value = props.disabled
})

    
const onSelect = (i: number, meta: any) => {

    selected.value = i
    emit('checked-option', meta)

}

onMounted(() => {
    is_disabled.value = props.disabled
})


</script>
<style scoped>
.radio-labels-container{
    display: flex;
    flex-direction: column;
    gap: 15px;
}
</style>