<template>
  <dx-cell
    :style="calculateStyle"
    v-bind="$attrs"
    v-on="$listeners"
    :row="row"
  >
    <span> Value: {{ value }}</span>
  </dx-cell>
</template>

  <script>

  import {
    DxTable,
  } from '@devexpress/dx-vue-grid-bootstrap4';

  export default {
    inheritAttrs: false,
    components: {
      dxCell: DxTable.components.DxCell
    },
    computed: {
      calculateStyle() {
        return this.column.name === 'gender' ? {backgroundColor: 'red'} : undefined
      }
    },
    props: ['value', 'row'],
    methods: {
    }
  }
  </script>

  <style>

  </style>