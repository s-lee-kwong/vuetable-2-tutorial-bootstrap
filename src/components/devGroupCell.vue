<template>
  <dx-cell
    :style="calculateStyle"
    v-bind="$attrs"
    v-on="$listeners"
    :row="row"
    :column="column"
    :expanded="expanded"
    :tableRow="tableRow"
    :tableColumn="tableColumn"
    colspan="9"
  >
    <slot />
  </dx-cell>
</template>

  <script>

  import {
    DxTableGroupRow,
  } from '@devexpress/dx-vue-grid-bootstrap4';

  export default {
    inheritAttrs: false,
    components: {
      dxCell: DxTableGroupRow.components.DxCell
    },
    computed: {
      calculateStyle() {
        console.log(this.column)
        return this.column.name === 'gender' ? {backgroundColor: 'red'} : undefined
      }
    },
    props: ['row', 'column', 'tableRow', 'tableColumn', 'expanded'],
    methods: {
    }
  }
  </script>

  <style>

  </style>