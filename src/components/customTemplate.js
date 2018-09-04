import merge from 'merge';

export default function (h, modules, classes, slots) {
  var filterId = 'VueTables__search_' + this.id;
  var ddpId = 'VueTables__dropdown-pagination_' + this.id;
  var perpageId = 'VueTables__limit_' + this.id;
  var perpageValues = require('../../node_modules/vue-tables-2/compiled/modules/per-page-values').call(this, h);

  var genericFilter = this.hasGenericFilter ?
    <div class="VueTables__search-field">
      {modules.normalFilter(classes, filterId)}
    </div> : '';

  var perpage = perpageValues.length > 1 ? <div class="VueTables__limit-field">
    <label class={classes.label} for={perpageId}>{this.display('limit')}</label>
    {modules.perPage(perpageValues, classes.select, perpageId)}
  </div> : '';

  var dropdownPagination = this.opts.pagination && this.opts.pagination.dropdown ?
    <div class="VueTables__pagination-wrapper">
      <div class={`${classes.field} ${classes.inline} ${classes.right} VueTables__dropdown-pagination`}
        v-show={this.totalPages > 1}
      >
        <label for={ddpId}>{this.display('page')}</label>
        {modules.dropdownPagination(classes.select, ddpId)}
      </div>
    </div> : '';

  var columnsDropdown = this.opts.columnsDropdown ?
    <div class="VueTables__columns-dropdown-wrapper">
      {modules.columnsDropdown(classes)}
    </div> : '';

  var footerHeadings = this.opts.footerHeadings ?
    <tfoot><tr>{modules.headings(classes.right)}</tr></tfoot> : '';

  var shouldShowTop = genericFilter ||
    perpage ||
    dropdownPagination ||
    columnsDropdown ||
    slots.beforeFilter ||
    slots.afterFilter ||
    slots.beforeLimit ||
    slots.afterLimit;

  var tableTop = <div class={classes.row} v-show={shouldShowTop}>
    <div class={classes.column}>
      <div class={`${classes.field} ${classes.inline} ${classes.left} VueTables__search`}>
        {slots.beforeFilter}
        {genericFilter}
        {slots.afterFilter}
      </div>
      <div class={`${classes.field} ${classes.inline} ${classes.right} VueTables__limit`}>
        {slots.beforeLimit}
        {perpage}
        {slots.afterLimit}
      </div>
      {dropdownPagination}
      {columnsDropdown}
    </div>
  </div>;

  return <div class={"VueTables VueTables--" + this.source}>
    {tableTop}
    {slots.beforeTable}
    <div class="table-responsive">
      <table class={`VueTables__table ${this.opts.skin ? this.opts.skin : classes.table}`}>
        <thead>
          <tr>
            {modules.headings(classes.right)}
          </tr>
          {slots.beforeFilters}
          {modules.columnFilters(classes)}
          {slots.afterFilters}
        </thead>
        {footerHeadings}
        {slots.beforeBody}
        <tbody>
          {slots.prependBody}
          {modules.rows(classes)}
          {slots.appendBody}
        </tbody>
        {slots.afterBody}
      </table>
    </div>
    {slots.afterTable}
    {modules.pagination(merge(classes.pagination, {
      wrapper: `${classes.row} ${classes.column} ${classes.contentCenter}`,
      nav: classes.center,
      count: `${classes.center} ${classes.column}`
    }))}
    {modules.dropdownPaginationCount()}

  </div>
}

// 'use strict';

// var _merge = require('merge');

// var _merge2 = _interopRequireDefault(_merge);

// function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// module.exports = function (h, modules, classes, slots) {

//   var filterId = 'VueTables__search_' + this.id;
//   var ddpId = 'VueTables__dropdown-pagination_' + this.id;
//   var perpageId = 'VueTables__limit_' + this.id;
//   var perpageValues = require('../../node_modules/vue-tables-2/compiled/modules/per-page-values').call(this, h);

//   var genericFilter = this.hasGenericFilter ? h(
//     'div',
//     { 'class': 'VueTables__search-field' },
//     [modules.normalFilter(classes , filterId)]
//   ) : '';

//   {/* <button class="btn btn-primary" @click="doFilter" > Go</button >
//     <button class="btn btn-default" @click="resetFilter" > Reset</button > */}

//   var perpage = perpageValues.length > 1 ? h(
//     'div',
//     { 'class': 'VueTables__limit-field' },
//     [h(
//       'label',
//       {
//         'class': classes.label, attrs: { 'for': perpageId }
//       },
//       [this.display('limit')]
//     ), modules.perPage(perpageValues, classes.select, perpageId)]
//   ) : '';

//   var dropdownPagination = this.opts.pagination && this.opts.pagination.dropdown ? h(
//     'div',
//     { 'class': 'VueTables__pagination-wrapper' },
//     [h(
//       'div',
//       {
//         'class': classes.field + ' ' + classes.inline + ' ' + classes.right + ' VueTables__dropdown-pagination',
//         directives: [{
//           name: 'show',
//           value: this.totalPages > 1
//         }]
//       },
//       [h(
//         'label',
//         {
//           attrs: { 'for': ddpId }
//         },
//         [this.display('page')]
//       ), modules.dropdownPagination(classes.select, ddpId)]
//     )]
//   ) : '';

//   var columnsDropdown = this.opts.columnsDropdown ? h(
//     'div',
//     { 'class': 'VueTables__columns-dropdown-wrapper' },
//     [modules.columnsDropdown(classes)]
//   ) : '';

//   var footerHeadings = this.opts.footerHeadings ? h('tfoot', [h('tr', [modules.headings(classes.right)])]) : '';

//   var shouldShowTop = genericFilter || perpage || dropdownPagination || columnsDropdown || slots.beforeFilter || slots.afterFilter || slots.beforeLimit || slots.afterLimit;

//   var tableTop = h(
//     'div',
//     {
//       'class': classes.row, directives: [{
//         name: 'show',
//         value: shouldShowTop
//       }]
//     },
//     [h(
//       'div',
//       { 'class': classes.column },
//       [h(
//         'div',
//         { 'class': classes.field + ' ' + classes.left + ' VueTables__search' },
//         [slots.beforeFilter, genericFilter, slots.afterFilter]
//       ), h(
//         'div',
//         { 'class': classes.field + ' ' + classes.inline + ' ' + classes.right + ' VueTables__limit' },
//         [slots.beforeLimit, perpage, slots.afterLimit]
//       ), dropdownPagination, columnsDropdown]
//     )]
//   );

//   return h(
//     'div',
//     { 'class': "VueTables VueTables--" + this.source },
//     [tableTop, slots.beforeTable, h(
//       'div',
//       { 'class': 'table-responsive' },
//       [h(
//         'table',
//         { 'class': 'VueTables__table ' + (this.opts.skin ? this.opts.skin : classes.table) },
//         [h('thead', [h('tr', [modules.headings(classes.right)]), slots.beforeFilters, modules.columnFilters(classes), slots.afterFilters]), footerHeadings, slots.beforeBody, h('tbody', [slots.prependBody, modules.rows(classes), slots.appendBody]), slots.afterBody]
//       )]
//     ), slots.afterTable, modules.pagination((0, _merge2.default)(classes.pagination, {
//       wrapper: classes.row + ' ' + classes.column + ' ' + classes.contentCenter,
//       nav: classes.center,
//       count: classes.center + ' ' + classes.column
//     })), modules.dropdownPaginationCount()]
//   );
// };