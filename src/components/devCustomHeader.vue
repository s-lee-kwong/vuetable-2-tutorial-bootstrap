<template>
  <dx-header
    :style="calculateStyle"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </dx-header>
</template>

  <script>

  import {
    DxTableEditColumn
  } from '@devexpress/dx-vue-grid-bootstrap4';

  export default {
    inheritAttrs: false,
    components: {
      DxHeader: DxTableEditColumn.components.DxHeaderCell,
    },
    computed: {
      calculateStyle() {
        console.log(this.tableColumn)
        console.log(this.tableRow)
        return this.tableColumn.name === 'gender' ? {backgroundColor: 'red'} : undefined
      }
    },
    props: ['tableRow', 'tableColumn', 'colSpan', 'rowSpan'],
    methods: {
    }
  }
  </script>

  <style>

  </style>