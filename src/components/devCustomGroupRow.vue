<template>
  <dx-row
    :style="calculateStyle"
    v-bind="$attrs"
    v-on="$listeners"
    :row="row"
  >
    <slot/>
    <td>
      <a href="google.ca"> Send Email </a>
    </td>

  </dx-row>
</template>

  <script>

  import { DxTableGroupRow } from '@devexpress/dx-vue-grid-bootstrap4';

  export default {
    created() {
    },
    inheritAttrs: false,
    components: {
      DxRow: DxTableGroupRow.components.DxRow
    },
    computed: {
      calculateStyle() {
        console.log(this.row)
        return this.row.gender === 'Female' ? {backgroundColor: '#b3e5fc'} : undefined
      }
    },
    props: ['row'],
    methods: {
    }
  }
  </script>

  <style>

  </style>