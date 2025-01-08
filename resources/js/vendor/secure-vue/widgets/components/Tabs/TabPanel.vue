<template>
    <div v-if="!skip && !disabled" v-show="isActive && !disabled" class="tab-pane" :class="{ active: isActive, hidden: !isActive }">
        <slot></slot>
    </div>
</template>

<script>
import { defineComponent, onBeforeMount, watch, ref, inject, computed } from "vue";

export default defineComponent({
    name: 'TabPanel',
    props: {
        title: {
            type: String,
        },
        icon: {
            type: String,
            required: false,
            default: null,
        },
        skip: {
            type: Boolean,
            required: false,
            default: false,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        tooltip: {
            type: String,
            required: false,
            default: null,
        },
        anchor: {
            type: String,
            required: false,
            default: null,
        },
        error: {
            type: Boolean,
            required: false,
            default: false,
        },
        notice: {
            type: Object,
            required: false,
            default: null
        },
    },
    setup(props) {
        const index = ref(0);
        const isActive = ref(false);
        const tabs = inject('TabsProvider');

        watch(
            () => tabs.selectedIndex,
            () => {
                isActive.value = index.value === tabs.selectedIndex;
            }
        );

        onBeforeMount(() => {
            index.value = tabs.count;
            tabs.count++;
            isActive.value = index.value === tabs.selectedIndex;
        });

        return { index, isActive };
    },
});
</script>