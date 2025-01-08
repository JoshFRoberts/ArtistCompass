<template>
    <row>
        <column :xs="16" class="margin-xs-b-0">
            <label class="control-label">
                <slot name="label"></slot>
                <i v-if="required">*</i>
            </label>
        </column>
        <column :xs="8">
            <slot></slot>
            <slot name="error"></slot>
        </column>
    </row>
</template>

<script>

import baseLayout from './baseLayout';

export default {

    extends: baseLayout,

    name: "filterForm",
}
</script>

<style scoped>

</style>
