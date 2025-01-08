<template>
    <div class="modal-body">
        <slot name="body">My body is empty :(</slot>
    </div>
</template>

<script>
    export default {
        name: "Body"
    }
</script>