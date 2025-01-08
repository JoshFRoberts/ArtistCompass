<template>
  <row>
    <content-col :xs="24" shadow padding="xs">
      <h4>Input defaults</h4>
      <hr class="margin-xs-y">
      <text-type id="input-default-text" error="Error" placeholder="Placeholder" layout="default" v-on:input="eventtest"
                 model-value="ZippZopp">
        Text input
      </text-type>
      <hr class="margin-xs-y">
      <select-type id="input-default-select" error="Error" layout="default" :model-value="{label: 'Options 1', value: 1}" @close="eventtest"
                   :options="options">
        Select
      </select-type>
      <hr class="margin-xs-y">
      <select-type id="input-default-select-multiple" error="Error" placeholder="Placeholder" layout="default" :searchable="true" :internal-search="true"
                   @select="eventtest" :options="options" :attributes='{0: "multiple"}' :model-value="[2, 4]" :reduce="item=>item.value">
        Multiselect
      </select-type>
      <hr class="margin-xs-y">
      <radio-group-type name="input-default-radio-group" error="Error" layout="default"
                        :options="{'Option 1': 1, 'Option 2': 2, 'Option 3': 3}" model-value="2">
        Radio button
      </radio-group-type>
      <hr class="margin-xs-y">
      <checkbox-type name="input-default-checkbox" error="Error" layout="default" :options="{'Label': 5}"
                     :model-value="true">
        Checkbox
      </checkbox-type>
      <hr class="margin-xs-y">
      <checkbox-type name="input-default-toggle" error="Error" type="toggle" layout="default" :options="{'Label': 5}"
                     :model-value="true">
        Toggle
      </checkbox-type>
      <hr class="margin-xs-y">
      <range-type name="input-default-range" error="Error" layout="default" :value="3" :attributes="{'min': 0, 'max': 6, 'step': 1}">
        Range
      </range-type>
      <hr class="margin-xs-y">
      <textarea-type name="input-default-textarea" error="Error" layout="default" model-value="Lorme upsim!">
        Textarea
      </textarea-type>
    </content-col>
  </row>

  <row>
    <content-col :xs="24" shadow padding="xs">
      <h4>Input disabled</h4>
      <hr class="margin-xs-y">
      <text-type :attributes="{disabled: true}" id="input-disabled-text" placeholder="Placeholder" layout="default"
                 v-on:input="eventtest" model-value="ZippZopp">
        Text input disabled
      </text-type>
      <hr class="margin-xs-y">
      <select-type :attributes="{disabled: true}" id="input-disabled-select" layout="default" :model-value="3" :reduce="item=>item.value"
                   @close="eventtest" :options="options">
        Select disabled
      </select-type>
      <hr class="margin-xs-y">
      <select-type id="input-disabled-options-select" layout="default" :model-value="3" @close="eventtest" :reduce="item=>item.value"
                   :options="optionsDisabled">
        Select options disabled
      </select-type>
      <hr class="margin-xs-y">
      <select-type id="input-disabled-select-multiple" placeholder="Placeholder" layout="default" @select="eventtest"
                   :options="options" :attributes='{0: "multiple", disabled: true}' :model-value="[2, 4]" :reduce="item=>item.value">
        Multiselect disabled
      </select-type>
      <hr class="margin-xs-y">
      <radio-group-type :attributes="{disabled: true}" name="input-disabled-radio-group" layout="default"
                        :options="{'Option 1': 1, 'Option 2': 2, 'Option 3': 3}" model-value="2">
        Radio button disabled
      </radio-group-type>
      <hr class="margin-xs-y">
      <checkbox-type :attributes="{disabled: true}" name="input-disabled-checkbox" layout="default"
                     :options="{'Label': 5}" :model-value="true">
        Checkbox disabled
      </checkbox-type>
      <hr class="margin-xs-y">
      <checkbox-type :attributes="{disabled: true}" name="input-disabled-toggle" type="toggle" layout="default"
                     :options="{'Label': 5}" :model-value="true">
        Toggle disabled
      </checkbox-type>
      <hr class="margin-xs-y">
      <range-type name="input-disabled-range" layout="default" :value="3" :attributes="{'min': 0, 'max': 6, 'step': 1, 'disabled': true}">
        Range disabled
      </range-type>
      <hr class="margin-xs-y">
      <textarea-type :attributes="{disabled: true}" name="input-disabled-textarea" layout="default"
                     model-value="Lorme upsim!">Textarea
      </textarea-type>
    </content-col>
  </row>

  <row>
    <content-col :xs="24" shadow padding="xs">
      <h4>Input prefix</h4>
      <hr class="margin-xs-y">
      <text-type :attributes="{0:'boing', 'zippZopp': 5}" :dataset="{0:'lala', 'zobblWobbl':5}"
                 id="input-prefix-icon-text" placeholder="Placeholder" layout="prefix" icon="fal fa-fw fa-pencil"
                 name="input-prefix-icon-text"></text-type>
      <hr class="margin-xs-y">
      <text-type id="input-prefix-label1-text" placeholder="Placeholder" layout="prefix"
                 name="input-prefix-label1-text">Textlabel
      </text-type>
      <hr class="margin-xs-y">
      <text-type id="input-prefix-label2-text" placeholder="Placeholder" layout="prefix" :prefix-width="2"
                 name="input-prefix-label2-text">Textlabel
      </text-type>
      <hr class="margin-xs-y">
      <text-type id="input-prefix-label3-text" placeholder="Placeholder" layout="prefix" :prefix-width="3"
                 name="input-prefix-label3-text">Textlabel
      </text-type>
      <hr class="margin-xs-y">
      <select-type id="input-prefix-select" layout="prefix" @select="eventtest" :options="options"  icon="fal fa-fw fa-pencil"
                   :model-value="2" :reduce="item=>item.value">
      </select-type>
      <hr class="margin-xs-y">
      <select-type id="input-prefix-select2" layout="prefix" @select="eventtest" :options="options" :prefix-width="2"
                   :model-value="2" :reduce="item=>item.value">
        Select
      </select-type>
      <hr class="margin-xs-y">
      <select-type id="input-prefix-select3" layout="prefix" @select="eventtest" :options="options" :prefix-width="3"
                   :model-value="2" :reduce="item=>item.value">
        Select
      </select-type>
      <hr class="margin-xs-y">
      <checkbox-type name="input-prefix-checkbox" layout="prefix" :options="{'Label': 5}"
                     :model-value="true">Checkbox
      </checkbox-type>
      <hr class="margin-xs-y">
      <checkbox-type name="input-prefix-toggle" type="toggle" layout="prefix" :options="{'Label': 5}"
                     :model-value="true">Toggle
      </checkbox-type>
      <hr class="margin-xs-y">
      <radio-type name="input-prefix-radio" layout="prefix" :options="{'Eins': 1}" model-value="1">Radio
      </radio-type>
      <radio-type name="input-prefix-radio" layout="prefix" :options="{'Zwei': 2}">Radio</radio-type>
      <hr class="margin-xs-y">
      <range-type name="input-prefix-range" layout="prefix" :value="3" :attributes="{'min': 0, 'max': 6, 'step': 1, 'disabled': true}">
        Range
      </range-type>
      <hr class="margin-xs-y">
      <textarea-type name="input-prefix-textarea" layout="prefix" model-value="Lorme upsim!">Textarea
      </textarea-type>
    </content-col>
  </row>

  <row>
    <content-col :xs="24" shadow padding="xs">
      <h4>Input prefix error</h4>
      <hr class="margin-xs-y">
      <text-type error="Error" :attributes="{0:'boing', 'zippZopp': 5}" :dataset="{0:'lala', 'zobblWobbl':5}"
                 id="input-prefix-error-icon-text" placeholder="Placeholder" layout="prefix" icon="fal fa-fw fa-pencil"
                 name="input-prefix-error-icon-text"></text-type>
      <hr class="margin-xs-y">
      <text-type error="Error" id="input-prefix-error-label1-text" placeholder="Placeholder" layout="prefix"
                 name="input-prefix-error-label1-text">Textlabel
      </text-type>
      <hr class="margin-xs-y">
      <text-type error="Error" id="input-prefix-error-label2-text" placeholder="Placeholder" layout="prefix" :prefix-width="2"
                 name="input-prefix-error-label2-text">Textlabel
      </text-type>
      <hr class="margin-xs-y">
      <text-type error="Error" id="input-prefix-error-label3-text" placeholder="Placeholder" layout="prefix" :prefix-width="3"
                 name="input-prefix-error-label3-text">Textlabel
      </text-type>
      <hr class="margin-xs-y">
      <select-type id="input-prefix-error-select" error="Error" layout="prefix" @select="eventtest" :options="options"
                   :model-value="2" :reduce="item=>item.value">
        Select
      </select-type>
      <hr class="margin-xs-y">
      <checkbox-type error="Error" name="input-prefix-error-checkbox" layout="prefix" :options="{'Label': 5}"
                     :model-value="true">Checkbox
      </checkbox-type>
      <hr class="margin-xs-y">
      <checkbox-type error="Error" name="input-prefix-error-toggle" type="toggle" layout="prefix" :options="{'Label': 5}"
                     :model-value="true">Toggle
      </checkbox-type>
      <hr class="margin-xs-y">
      <radio-type error="Error" name="input-prefix-error-radio" layout="prefix" :options="{'Eins': 1}" model-value="1">Radio
      </radio-type>
      <radio-type error="Error" name="input-prefix-error-radio" layout="prefix" :options="{'Zwei': 2}">Radio</radio-type>
      <hr class="margin-xs-y">
      <range-type error="Error" name="input-prefix-error-range" layout="prefix" :value="3" :attributes="{'min': 0, 'max': 6, 'step': 1, 'disabled': true}">
        Range
      </range-type>
      <hr class="margin-xs-y">
      <textarea-type error="Error" name="input-prefix-error-textarea" layout="prefix" model-value="Lorme upsim!">Textarea
      </textarea-type>
    </content-col>
  </row>

  <row>
    <content-col :xs="24" shadow padding="xs">
      <h4>Default Form</h4>
      <hr class="margin-xs-y">
      <vue-form :fields="fields1">
      </vue-form>
    </content-col>
  </row>

  <row>
    <content-col :xs="24" shadow padding="xs">
      <h4>Input Prefix Form</h4>
      <hr class="margin-xs-y">
      <vue-form :fields="fields2"></vue-form>
    </content-col>
  </row>
  <row>

    <content-col :xs="24" shadow padding="xs">
      <h4>Selects</h4>
      <hr class="margin-xs-y">
      <vue-form>
        <!-- Events cannot be passed via Array definition when not used in JS context yet but one can still add form fields manually-->
        <select-type id="default-form-select" description="Infotext" @select="eventtest"
                     :options="options">
          Select with change event
        </select-type>
        <!-- Events cannot be passed via Array definition when not used in JS context yet but one can still add form fields manually-->
        <hr class="margin-xs-y">
        <select-type id="default-form-select-ajax" description="Infotext" :searchable="true" @search-change="search" @select="eventtest" :options="optionsSearch">
          Select with ajax
        </select-type>
        <hr class="margin-xs-y">
      </vue-form>
    </content-col>
  </row>

</template>
<script>
export default {
  name: 'DemoForms',
  props: {
    fields1: {
      type: [Object, Array]
    },
    fields2: {
      type: [Object, Array]
    },
  },
  data() {
    return {
      options: [
        {label: 'Options 1', value: 1},
        {label: 'Options 2', value: 2},
        {label: 'Options 3', value: 3},
        {label: 'Options 4', value: 4},
      ],
      optionsSearch: [
        {label: 'Options 1', value: 1},
        {label: 'Options 2', value: 2},
      ],
      optionsDisabled: [
        {label: 'Options 1', value: 1, $isDisabled: true},
        {label: 'Options 2', value: 2},
        {label: 'Options 3', value: 3, $isDisabled: true},
        {label: 'Options 4', value: 4, $isDisabled: true},
      ]
    };
  },
  methods: {
    eventtest(e) {
      console.log('event test', e);
    },
    search(e) {
      axios.post('/dev/demo/search',{search: e}).then(response => {
        this.optionsSearch = response.data;
      })
    }
  }
}
</script>
