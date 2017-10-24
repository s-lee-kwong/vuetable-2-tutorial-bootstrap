<template>
  <div class="container">
    <filter-bar></filter-bar>
    <vuetable ref="vuetable"
      :fields="fields"
      :css="css"
      pagination-path=""
      :per-page="pageAmount"
      :multi-sort="true"
      multi-sort-key="shift"
      :sort-order="sortOrder"
      detail-row-component="my-detail-row"
      :append-params="moreParams"
      :render-icon="renderIcon"
      @vuetable:loaded="loaded"
      @vuetable:cell-clicked="onCellClicked"
      @vuetable:pagination-data="onPaginationData"
    >
      <template slot="actions" scope="props">
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
      <vuetable-pagination-info ref="paginationInfo"
        :css="css.pagination"
        info-class="pull-left"
      ></vuetable-pagination-info>
      <vuetable-pagination ref="pagination"
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
import FieldDef from './field-def.js'
import BootstrapStyle from './bootstrap-css.js'
import CustomActions from './CustomActions'
import DetailRow from './DetailRow'
import FilterBar from './FilterBar'
import VueEvents from 'vue-events'
Vue.use(VueEvents)

Vue.component('custom-actions', CustomActions)
Vue.component('my-detail-row', DetailRow)

export default {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo,
    FilterBar
  },
  props: {
    pageAmount: {
      type: Number,
      default: 2
    }
  },
  data () {
  	return {
      css: BootstrapStyle,
      fields: FieldDef,
      sortOrder: [
        {
          field: 'email',
          sortField: 'email',
          direction: 'asc'
        }
      ],
      moreParams: {},
      localData: [
        {id: 1, name: "Test", email: "Test1", age: 25, birthdate: "09-09-1991", nickname: "Blah", gender: "M", salary: "343434"},
        {id: 2, name: "Test", email: "Test2", age: 25, birthdate: "09-09-1991", nickname: "Blah", gender: "M", salary: "343434"},
        {id: 3, name: "Test", email: "Test5", age: 25, birthdate: "09-09-1991", nickname: "Blah", gender: "M", salary: "343434"},
        {id: 4, name: "Test", email: "Test4", age: 25, birthdate: "09-09-1991", nickname: "Blah", gender: "M", salary: "343434"},
        {id: 5, name: "Test", email: "Test3", age: 25, birthdate: "09-09-1991", nickname: "Blah", gender: "F", salary: "343434"},
        {id: 6, name: "Test", email: "Test0", age: 25, birthdate: "09-09-1991", nickname: "Blah", gender: "F", salary: "343434"},
        {id: 7, name: "Test", email: "Test9", age: 25, birthdate: "09-09-1991", nickname: "Blah", gender: "F", salary: "343434"},
        {id: 8, name: "Test", email: "Test8", age: 25, birthdate: "09-09-1991", nickname: "Blah", gender: "F", salary: "343431114"},
      ],
      filteredData: []
  	}
  },
  mounted () {
    this.$events.listen('filter-set', filterText => this.onFilterSet(filterText))
    this.$events.listen('filter-reset', () => this.onFilterReset())
  },
  methods: {
    loaded () {
      let queryParams = this.$refs.vuetable.getAllQueryParams()

      queryParams.filter = this.moreParams.filter

      let primeQuery = queryParams["sort"].split("|")[0]

      this.filteredData = filter(queryParams, this.localData)

      this.$refs.vuetable.tablePagination = {
            total: this.filteredData.total,
            per_page: this.pageAmount,
            current_page: this.$refs.vuetable.currentPage,
            last_page: Math.ceil(this.filteredData.total / this.pageAmount),
            from: this.filteredData.from,
            to: this.filteredData.to
      }

      this.$refs.vuetable.fireEvent('pagination-data', this.$refs.vuetable.tablePagination)
      this.$refs.vuetable.tableData = this.filteredData.rows
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
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    onCellClicked (data, field, event) {
      this.$refs.vuetable.toggleDetailRow(data.id)
    },
    onAction (action, data, index) {
      console.log('slot-actions: ' + action, data.name, index)
    },
    onFilterSet (filterText) {
      this.moreParams = {
        'filter': filterText
      }

      this.loaded()
    },
    onFilterReset () {
      this.moreParams = {}
      this.$refs.vuetable.refresh()

      this.loaded()
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
