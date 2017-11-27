<template>
  <div class="container">
    <custom-table v-if="!isGrouped" :pageAmount="pageAmount" :hasSearch="true"
          :hasPagination="true" :passedData="localData"
          :fieldsDef="fields" :defaultSortOrder="sortOrder"
          :css="css" :detailComponent="detailComponent">
    </custom-table>

    <custom-table v-if='isGrouped' :pageAmount="pageAmount" :hasSearch="true"
          :hasPagination="true" :passedData="localGroupedData"
          :fieldsDef="fields" :defaultSortOrder="sortOrder"
          :css="css" :detailComponent="detailComponent" :dataGrouped="true">
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
import CustomGroup from './CustomGroup'
import CustomTable from './CustomTable'
import Data from './data.js'
import GroupedData from './groupedData.js'
import lodash from 'lodash';

Object.defineProperty(Vue.prototype, '$lodash', { value: lodash });

Vue.component('my-detail-row', DetailRow)
Vue.component('custom-actions', CustomActions)
Vue.component('custom-group', CustomGroup)

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
      isGrouped: true,
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
      localGroupedData: GroupedData,
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
