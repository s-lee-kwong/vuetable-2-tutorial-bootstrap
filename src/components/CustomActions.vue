<template>
    <th v-if="isHeader" class="vuetable-th-salary text-center sortable">
      Custom Actions
    </th>
    <td v-else>
      <button class="btn btn-default btn-sm" @click="itemAction('view-item', rowData, rowIndex)"><span class="glyphicon glyphicon-zoom-in"></span></button>
      <button class="btn btn-default btn-sm" @click="itemAction('edit-item', rowData, rowIndex)"><span class="glyphicon glyphicon-pencil"></span></button>
      <button class="btn btn-default btn-sm" @click="itemAction('delete-item', rowData, rowIndex)"><span class="glyphicon glyphicon-remove"></span></button>
    </td>
  </template>

  <script>
  import VuetableFieldMixin from 'vuetable-2/src/components/VuetableFieldMixin'

  export default {
    mixins: [VuetableFieldMixin],
    methods: {
      itemAction (action, data, index) {
        console.log('custom-actions: ' + action, data.email, index)
      }
    }
  }
  </script>

  <style>
    .custom-actions button.ui.button {
      padding: 8px 8px;
    }
    .custom-actions button.ui.button > i.icon {
      margin: auto !important;
    }
  </style>