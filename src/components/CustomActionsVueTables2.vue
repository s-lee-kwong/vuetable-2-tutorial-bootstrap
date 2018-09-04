<template>
  <div class="custom-actions">
    <button class="btn btn-default btn-sm" @click="itemAction('view-item', data, index)"><span class="glyphicon glyphicon-zoom-in"></span></button>
    <button class="btn btn-default btn-sm" @click="itemAction('edit-item', data, index)"><span class="glyphicon glyphicon-pencil"></span></button>
    <button class="btn btn-default btn-sm" @click="itemAction('delete-item', data, index)"><span class="glyphicon glyphicon-remove"></span></button>
  </div>
</template>

  <script>
  export default {
    props: {
      data: {
        type: Object,
        required: true
      },
      index: {
        type: Number
      }
    },
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