<template>
    <row :padding="['xs-y']">
        <column :lg="4">
            <label class="control-label">
                <slot name="label"></slot>
                <i v-if="required">*</i>
            </label>
        </column>
        <column :lg="8">
            <slot></slot>
            <slot name="error"></slot>
        </column>
        <column :lg="12" v-if="description">
            <p class="input-description" v-html="description"></p>
        </column>
    </row>
</template>

<script>

    import baseLayout from './baseLayout';

    export default {

        extends: baseLayout,

        name: "defaultForm",
    }
</script>

<style scoped>

</style>
