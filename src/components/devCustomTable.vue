<template>
  <dx-table
    class="table-striped"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </dx-table>
</template>

  <script>

  import {
    DxTable,
  } from '@devexpress/dx-vue-grid-bootstrap4';

  export default {
    inheritAttrs: false,
    components: {
      DxTable: DxTable.components.DxTable
    },
    props: {
    },
    methods: {
    }
  }
  </script>

  <style>

  </style>