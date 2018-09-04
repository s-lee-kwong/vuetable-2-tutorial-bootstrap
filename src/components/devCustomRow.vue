<template>
  <dx-row
    :style="calculateStyle"
    v-bind="$attrs"
    v-on="$listeners"
    :row="row"
  >
    <slot />
  </dx-row>
</template>

  <script>

  import {
    DxTable,
  } from '@devexpress/dx-vue-grid-bootstrap4';

  export default {
    inheritAttrs: false,
    components: {
      dxRow: DxTable.components.DxRow
    },
    computed: {
      calculateStyle() {
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