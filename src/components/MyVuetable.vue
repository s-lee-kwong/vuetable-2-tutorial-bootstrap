<template>
  <div class="container">
    <!-- <custom-table v-if="!isGrouped" :pageAmount="pageAmount" :hasSearch="true"
          :hasPagination="true" :passedData="localData"
          :fieldsDef="fields" :defaultSortOrder="sortOrder"
          :css="css" :detailComponent="detailComponent">
    </custom-table> -->

    <custom-table v-if='isGrouped' :pageAmount="pageAmount" :hasSearch="true"
          :hasPagination="true" :passedData="localGroupedData"
          :fieldsDef="fields" :groupFieldDef="groupField" :defaultSortOrder="sortOrder"
          :css="css" :detailComponent="detailComponent" :dataGrouped="true">
    </custom-table>

    <!-- <custom-table v-if='showBoth' :pageAmount="pageAmount" :hasSearch="false"
          :hasPagination="false" :passedData="localData"
          :fieldsDef="fields2" :defaultSortOrder="sortOrder2"
          :css="css" :detailComponent="detailComponent" ref="custom-table-2">
    </custom-table>

    <custom-table v-if='showBoth' passRef="custom-table-3" :pageAmount="pageAmount" :hasSearch="false"
          :hasPagination="false" :passedData="localData"
          :fieldsDef="fields2" :defaultSortOrder="sortOrder"
          :css="css" :detailComponent="detailComponent" ref="custom-table-3">
    </custom-table> -->
  </div>
</template>

<script>
import Vue from 'vue'
import FieldDef from './field-def.js'
import FieldDef2 from './field-def-2.js'
import GroupFieldDef from './groupFieldDef.js'
import BootstrapStyle from './bootstrap-css.js'
import DetailRow from './DetailRow'
import CustomActions from './CustomActions'
import CustomActionsVueTables2 from './CustomActionsVueTables2'
import devCustomTable from './devCustomTable'
import devCustomCell from './devCustomCell'
import devCustomRow from './devCustomRow'
import devCustomHeader from './devCustomHeader'
import devCustomGroupRow from './devCustomGroupRow'
import devGroupCell from './devGroupCell'

import {
  DxGrid,
  DxTable,
  DxPagingPanel,
  DxTableHeaderRow,
  DxTableSelection,
  DxTableGroupRow,
  DxGroupingPanel,
  DxToolbar,
  DxTableEditRow,
  DxTableEditColumn,
} from '@devexpress/dx-vue-grid-bootstrap4';

import {
  DxSelectionState,
  DxIntegratedSelection,
  DxPagingState,
  DxIntegratedPaging,
  DxSortingState,
  DxIntegratedSorting,
  DxIntegratedGrouping,
  DxGroupingState,
  DxEditingState
} from '@devexpress/dx-vue-grid';

import CustomGroup from './CustomGroup'
import CustomTable from './CustomTable'
import Data from './data.js'
import GroupedData from './groupedData.js'
import lodash from 'lodash';
import {ServerTable, ClientTable, Event} from 'vue-tables-2'
import customTheme from './customTheme'
import customTemplate from './customTemplate'
import debounce from 'debounce'

Object.defineProperty(Vue.prototype, '$lodash', { value: lodash });

Vue.component('my-detail-row', DetailRow)
Vue.component('vuetable-field-custom-actions', CustomActions)
Vue.component('custom-actions-vue-tables-2', CustomActionsVueTables2)
Vue.component('custom-group', CustomGroup)
Vue.use(ClientTable, {}, false, customTheme, customTemplate);
Vue.use(ServerTable, {}, false, 'bootstrap4');

export default {
  components: {
    CustomActions,
    CustomTable,
    DxGrid,
    DxTable,
    DxPagingPanel,
    DxTableHeaderRow,
    DxSelectionState,
    DxIntegratedSelection,
    DxPagingState,
    DxIntegratedPaging,
    DxTableSelection,
    devCustomTable,
    devCustomCell,
    devCustomRow,
    DxSortingState,
    DxIntegratedSorting,
    DxTableGroupRow,
    DxGroupingPanel,
    DxToolbar,
    DxIntegratedGrouping,
    DxGroupingState,
    DxEditingState,
    DxTableEditRow,
    DxTableEditColumn,
    devCustomHeader,
    devCustomGroupRow,
    devGroupCell
  },
  props: {
  },
  data () {
  	return {
      editingRowIds: [],
      addedRows: [],
      rowChanges: {},
      deletedRowIds: [],
      grouping: [{ columnName: 'email' }],
      expandedGroups: [],
      sorting: [
        { columnName: "gender", direction: 'desc' }
      ],
      sortingStateColumnExtensions: [
        { columnName: "name", sortingEnabled: false }
      ],
      devColumnExtensions: [
        {columnName: 'gender', align: 'right', width: 125}
      ],
      devGroupExtensions: [
        { columnName: 'email', showWhenGrouped: true }
      ],
      selection: [1],
      currentPage: 0,
      pageSize: 6,
      devColumns: [
        {name: 'name', title: 'name'},
        {name: 'email', title: 'email'},
        {name: 'age', title: 'age'},
        {name: 'birthdate', title: 'birthdate'},
        {name: 'nickname', title: 'nickname'},
        {name: 'gender', title: 'gender'},
        {name: 'salary', title: 'salary'}
      ],
      query: '',
      allMarked: false,
      options: {
        templates: { actions: 'custom-actions-vue-tables-2' },
        filterable: ['name', 'email', 'age', 'birthdate',
                  'nickname', 'gender', 'salary'],
        sortable: ['name', 'email', 'age', 'birthdate',
                  'nickname', 'gender', 'salary'],
        columnsDropdown: true,
        pagination: { chunk:20, nav: 'scroll', edge: true},
        perPage: 9999999,
        perPageValues: [],
        groupBy:'gender',
        texts: {
          filter: "CUSTOM FILTER MESSAGE",
          count:"Showing {from} to {to} of {count} records|{count} records|One record",
          first:'First',
          last:'Last',
          filterPlaceholder:"Search query",
          limit:"Records:",
          page:"Page:",
          noResults:"No matching records",
          filterBy:"Filter by {column}",
          loading:'Loading...',
          defaultOption:'Select {column}',
          columns:'Columns'
        },
        groupMeta: [
          {
            value: 'Male',
            data: {
              test: "123"
            }
          },
          {
            value: 'Female',
            data: {
              test: "123"
            }
          }
        ],
        // filterByColumn: true
      },
      columns: ['id', 'name', 'email', 'age', 'birthdate',
                'nickname', 'salary', 'actions', 'slot-actions'],
      showBoth: false,
      css: BootstrapStyle,
      fields: FieldDef,
      fields2: FieldDef2,
      groupField: GroupFieldDef,
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
    getRowId(row) {
      return row.id;
    },
    commitChanges({ added, changed, deleted }) {
      let { localData } = this;
      let rows = localData

      if (added) {
        const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
        rows = [
          ...rows,
          ...added.map((row, index) => ({
            id: startingAddedId + index,
            ...row,
          })),
        ];
      }
      if (changed) {
        rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      }
      if (deleted) {
        const deletedSet = new Set(deleted);
        rows = rows.filter(row => !deletedSet.has(row.id));
      }
      this.rows = rows;
    },
    markAll(test) {
      console.log(test)
    },
    debounceFilter: debounce(function(e) {
      this.$refs.table1.setFilter(this.query)
    }, 500)
  },
}
</script>

<style>

.right {
  float: right;
}
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
