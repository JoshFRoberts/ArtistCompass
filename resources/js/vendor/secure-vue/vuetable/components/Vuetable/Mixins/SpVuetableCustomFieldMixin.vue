<script>
export default {
    methods: {
        onCellClicked(e) {
            this.$emit('vuetable:field-event', {
                data: this.rowData,
                event: e,
                index: this.rowIndex,
                field: this.rowField
            })
        },
    }
}
</script>
