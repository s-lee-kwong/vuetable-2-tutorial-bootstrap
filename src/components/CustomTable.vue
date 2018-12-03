<template>
  <div class="container">
    <filter-bar v-if="hasSearch"></filter-bar>
    <vuetable :ref="passRef"
      :fields="fieldsDef"
      :css="css"
      pagination-path="pagination"
      :data-manager="dataManager"
      :per-page="getPageAmount"
      :multi-sort="multiSort"
      multi-sort-key="shift"
      :sort-order="defaultSortOrder"
      :detail-row-component="detailComponent"
      :append-params="moreParams"
      :render-icon="renderIcon"
      @vuetable:cell-clicked="onCellClicked"
      @vuetable:pagination-data="onPaginationData"
      :api-mode="false"
      :grouped="dataGrouped"
      :groupField="groupFieldDef"
    >
      <template slot="actions" slot-scope="props">
        <div class="custom-actions">
          <button class="btn btn-default btn-sm"
            @click="onAction('view-item', props.rowData, props.rowIndex)">
            <span class="glyphicon glyphicon-zoom-in"></span>
          </button>
          <button class="btn btn-default btn-sm"
            @click="onAction('edit-item', props.rowData, props.rowIndex)">
            <span class="glyphicon glyphicon-pencil"></span>
          </button>
          <button class="btn btn-default btn-sm"
            @click="onAction('delete-item', props.rowData, props.rowIndex)">
            <span class="glyphicon glyphicon-remove"></span>
          </button>
        </div>
      </template>
    </vuetable>
    <div>
      <vuetable-pagination-info v-if="hasPagination"
        ref="paginationInfo"
        :css="css.pagination"
        info-class="pull-left"
      ></vuetable-pagination-info>
      <vuetable-pagination v-if="hasPagination"
        ref="pagination"
        :css="css.pagination"
        @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>
    </div>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import accounting from 'accounting'
import moment from 'moment'
import filter from './filter.js'
import Vue from 'vue'
import BootstrapStyle from './bootstrap-css.js'
import FilterBar from './FilterBar'
import VueEvents from 'vue-events'
Vue.use(VueEvents)

export default {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo,
    FilterBar
  },
  props: {
    groupFieldDef: {
      type: Object
    },
    passRef : {
      type: String,
      default: "vuetable"
    },
    pageAmount: {
      type: Number,
      default: 2
    },
    hasSearch: {
      type: Boolean,
      default: true
    },
    hasPagination: {
      type: Boolean,
      default: true
    },
    passedData: {
      type: Array
    },
    fieldsDef: {
      type: Array
    },
    defaultSortOrder: {
      type: Array
    },
    css: {
      type: Object,
      default: BootstrapStyle
    },
    detailComponent: {
      type: String,
      default: ""
    },
    multiSort: {
      type: Boolean,
      default: true
    },
    dataGrouped: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      moreParams: {},
      localData: [],
      filteredData: {},
      slotShown: true
    }
  },
  created () {
    this.localData = this.passedData

    if (this.hasSearch) {
      this.$events.listen('filter-set', filterText => this.onFilterSet(filterText))
      this.$events.listen('filter-reset', () => this.onFilterReset())
    }
  },
  computed: {
    getPageAmount() {
      if (this.hasPagination) {
        return this.pageAmount
      } else {
        return this.localData.length
      }
    }
  },
  methods: {
    loaded () {
      // let vuetableRef = this.$refs[this.passRef]

      // let queryParams = vuetableRef.getAllQueryParams()

      // queryParams.filter = this.moreParams.filter
      // queryParams.grouped = this.dataGrouped

      // let primeQuery = queryParams["sort"].split("|")[0]

      // this.filteredData = filter(queryParams, this.localData)

      // vuetableRef.tablePagination = {
      //       total: this.filteredData.total,
      //       per_page: this.pageAmount,
      //       current_page: vuetableRef.currentPage,
      //       last_page: Math.ceil(this.filteredData.total / this.pageAmount),
      //       from: this.filteredData.from,
      //       to: this.filteredData.to
      // }

      // vuetableRef.fireEvent('pagination-data', vuetableRef.tablePagination)

      // vuetableRef.tableData = this.filteredData.rows

      // var stuff = this.$refs.vuetable.tableFields.filter((object) =>{
      //   return object.name == "__slot:actions"
      // })

      // stuff[0].visible = false
    },
    dataManager(sortOrder, pagination) {
      console.log(this.$refs)
      let vuetableRef = this.$refs[this.passRef]

      let queryParams = vuetableRef.getAllQueryParams()

      queryParams.filter = this.moreParams.filter
      queryParams.grouped = this.dataGrouped

      this.filteredData = filter(queryParams, this.localData)

      // vuetableRef.tablePagination = {
      //       total: this.filteredData.total,
      //       per_page: this.pageAmount,
      //       current_page: vuetableRef.currentPage,
      //       last_page: Math.ceil(this.filteredData.total / this.pageAmount),
      //       from: this.filteredData.from,
      //       to: this.filteredData.to
      // }

      // vuetableRef.fireEvent('pagination-data', vuetableRef.tablePagination)

      pagination = vuetableRef.makePagination(
        this.localData.length,
        this.pageAmount
      );

      return {
        pagination: {
              total: this.filteredData.total,
              per_page: this.pageAmount,
              current_page: vuetableRef.currentPage,
              last_page: Math.ceil(this.filteredData.total / this.pageAmount),
              from: this.filteredData.from,
              to: this.filteredData.to
        },
        data: this.filteredData.rows
      }

      // vuetableRef.tableData = this.filteredData.rows
    },
    renderIcon (classes, options) {
      return `<span class="${classes.join(' ')}"></span>`
    },
    allcap (value) {
      return value.toUpperCase()
    },
    genderLabel (value) {
      return value === 'M'
        ? '<span class="label label-warning"><span class="glyphicon glyphicon-star"></span> Male</span>'
        : '<span class="label label-info"><span class="glyphicon glyphicon-heart"></span> Female</span>'
    },
    formatNumber (value) {
      return accounting.formatNumber(value, 2)
    },
    formatDate (value, fmt = 'D MMM YYYY') {
      return (value == null)
        ? ''
        : moment(value, 'YYYY-MM-DD').format(fmt)
    },
    onPaginationData (paginationData) {
      if (this.hasPagination) {
        this.$refs.pagination.setPaginationData(paginationData)
        this.$refs.paginationInfo.setPaginationData(paginationData)
      }
    },
    onChangePage (page) {
      this.$refs[this.passRef].changePage(page)
    },
    onCellClicked (data, field, event) {
      this.$refs[this.passRef].toggleDetailRow(data.id)
    },
    onAction (action, data, index) {
      console.log('slot-actions: ' + action, data.name, index)
    },
    onFilterSet (filterText) {
      let vuetableRef = this.$refs[this.passRef]

      this.moreParams = {
        'filter': filterText
      }

      vuetableRef.callDataManager()
    },
    onFilterReset () {
      let vuetableRef = this.$refs[this.passRef]

      this.moreParams = {}
      vuetableRef.refresh()
      vuetableRef.callDataManager()
    }
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