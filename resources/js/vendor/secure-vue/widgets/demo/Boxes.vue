<template>
    <row>
        <content-col :md="12" :sm="24" padding="xs">
            <h4>Default</h4>
            <hr class="margin-xs-y">
            <p>Code:</p>
        </content-col>
        <content-col :md="12" :sm="24" clickable padding="xs">
            <h4>Hover me!</h4>
            <hr class="margin-xs-y">
            <p>Code:</p>
        </content-col>
    </row>

    <row>
        <content-col :md="12" :sm="24" border padding="xs">
            <h4>Bordered</h4>
            <hr class="margin-xs-y">
            <p>Code:</p>
        </content-col>
        <content-col :md="12" :sm="24" border clickable padding="xs">
            <h4>Hover me!</h4>
            <hr class="margin-xs-y">
            <p>Code:</p>
        </content-col>
    </row>

    <row>
        <content-col :md="12" :sm="24" shadow padding="xs">
            <h4>Shadow</h4>
            <hr class="margin-xs-y">
            <p>Code:</p>
        </content-col>
        <content-col :md="12" :sm="24" shadow clickable padding="xs">
            <h4>Hover me!</h4>
            <hr class="margin-xs-y">
            <p>Code:</p>
        </content-col>
    </row>

    <row>
        <content-col :lg="8" :md="12" :sm="24" border icon="fal fa-user" align-icon="left" icon-bg="indigo" padding="xs">
            <h4>Shadow</h4>
            <hr class="margin-xs-y">
            <p>Code:</p>
        </content-col>
        <content-col :lg="8" :md="12" :sm="24" border icon="fal fa-user" padding="xs">
            <h4>Shadow</h4>
            <hr class="margin-xs-y">
            <p>Code:</p>
        </content-col>
        <content-col :lg="8" :md="12" :sm="24" border icon="fal fa-user" align-icon="right" icon-bg="green" padding="xs">
            <h4>Shadow</h4>
            <hr class="margin-xs-y">
            <p>Code:</p>
        </content-col>
    </row>

    <row>
        <content-col :md="12" :sm="24" border icon="fal fa-user" align-icon-box="left" icon-bg="indigo" padding="xs">
            <h4>Shadow</h4>
            <hr class="margin-xs-y">
            <p>Code:</p>
        </content-col>
        <content-col :md="12" :sm="24" border icon="fal fa-user" align-icon-box="right" icon-bg="green" padding="xs">
            <h4>Shadow</h4>
            <hr class="margin-xs-y">
            <p>Code:</p>
        </content-col>
    </row>

    <row>
        <content-col :lg="8" :md="12" :sm="24" border icon="fal fa-user" align-icon="left" icon-bg="indigo" icon-circle padding="xs">
            <h4>Shadow</h4>
            <hr class="margin-xs-y">
            <p>Code:</p>
        </content-col>
        <content-col :lg="8" :md="12" :sm="24" border icon="fal fa-user" icon-circle padding="xs">
            <h4>Shadow</h4>
            <hr class="margin-xs-y">
            <p>Code:</p>
        </content-col>
        <content-col :lg="8" :md="12" :sm="24" border icon="fal fa-user" align-icon="right" icon-bg="green" icon-circle padding="xs">
            <h4>Shadow</h4>
            <hr class="margin-xs-y">
            <p>Code:</p>
        </content-col>
    </row>

    <content-row :lg="12" :xs="24" icon="fal fa-user" align-icon-box="left" icon-circle icon-bg="indigo" padding="xs">
        <h4>Shadow</h4>
        <hr class="margin-xs-y">
        <p>Code:</p>
    </content-row>
</template>

<script>
export default {
    name: 'DemoBoxes',
    props: {
        fields1: {
            type: [Object, Array]
        },
        fields2: {
            type: [Object, Array]
        },
    },
}
</script>