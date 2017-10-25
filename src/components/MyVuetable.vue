<template>
  <div class="container">
    <custom-table :pageAmount="pageAmount" :hasSearch="true"
          :hasPagination="true" :passedData="localData"
          :fieldsDef="fields" :defaultSortOrder="sortOrder"
          :css="css" :detailComponent="detailComponent">
    </custom-table>

    <custom-table v-if='showBoth' passRef="custom-table-2" :pageAmount="pageAmount" :hasSearch="false"
          :hasPagination="false" :passedData="localData"
          :fieldsDef="fields2" :defaultSortOrder="sortOrder2"
          :css="css" :detailComponent="detailComponent">
    </custom-table>
  </div>
</template>

<script>
import Vue from 'vue'
import FieldDef from './field-def.js'
import FieldDef2 from './field-def-2.js'
import BootstrapStyle from './bootstrap-css.js'
import DetailRow from './DetailRow'
import CustomActions from './CustomActions'
import CustomTable from './CustomTable'
import Data from './data.js'

Vue.component('my-detail-row', DetailRow)
Vue.component('custom-actions', CustomActions)

export default {
  components: {
    CustomTable
  },
  props: {
  },
  data () {
  	return {
      showBoth: false,
      css: BootstrapStyle,
      fields: FieldDef,
      fields2: FieldDef2,
      sortOrder: [
        {
          field: 'email',
          sortField: 'email',
          direction: 'asc'
        }
      ],
      sortOrder2: [
        {
          field: 'name',
          sortField: 'name',
          direction: 'asc'
        }
      ],
      pageAmount: 6,
      localData: Data,
      filteredData: {},
      detailComponent: 'my-detail-row'
  	}
  },
  mounted () {
  },
  methods: {
  },
}
</script>
<style>
.pagination {
  margin-top: 0;
}
.btn.btn-border {
  border: 1px solid;
  margin-right: 2px;
}
.vuetable-pagination-info {
  margin-top: 8px !important;
}
span.sort-icon {
  float: right;
  color: #ff9100;
}
</style>
