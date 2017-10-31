import moment from 'moment'
import uniq from 'lodash/uniq'
import orderBy from 'lodash/orderBy'
import groupBy from 'lodash/groupBy'
import flattenDeep from 'lodash/flattenDeep'

const typeOf = o => Object.prototype.toString.call(o).slice(8, -1).toLowerCase()
const purify = o => JSON.parse(JSON.stringify(o)) // purify data

/**
 * mockData - simulate Ajax request and respond
 * @param   {Object} query
 * @resolve {Object}
 */
export default function filter(query, data) {
  query = purify(query)
  var { per_page = 10, page = 0, sort = '', order = '', grouped = false } = query

  let sorts = query["sort"].split(",")
  let allSorts = []
  let allOrders = []

  sorts.forEach((sortString) => {
    let sortSplitArray = sortString.split("|")

    allSorts.push(sortSplitArray[0])
    allOrders.push(sortSplitArray[1])
  })

  sort = allSorts
  order = allOrders

  let rows = data;

  if (grouped) {
    rows = flattenDeep(rows.map((object) => { return object.data }))
  }

  // custom query conditions
  let filteredAlready = false;
  let filtered = [];

  Object.keys(rows[0]).forEach(field => {
    if (filteredAlready == false) {
      switch (typeOf(query.filter)) {
        case 'array':
          filtered = rows.filter(row => query.filter.indexOf(row[field]) > -1)
          break
        case 'string':
          filtered = rows.filter(row => row[field].toString().toLowerCase().indexOf(query.filter.toLowerCase()) > -1)
          break
        default:
          // nothing to do
          break
      }

      if (filtered.length > 0) {
        rows = filtered

        filteredAlready = true
      }

    }
  })

  if (sort) {
    rows = orderBy(rows, sort, order)
  }

  let offset = (page - 1) * per_page
  let sliced = rows.slice(offset, offset + per_page)
  let to = offset + per_page

  if (sliced.length != per_page) {
    to = rows.length
  }

  if (grouped) {
    sliced = _.compact(_.chain(sliced).groupBy("grouping").map((v, i) => {
          if (i != "undefined") {
            return {
              groupName: i,
              data: v
            }
          }
        }).value())
  }

  const res = {
    rows: sliced,
    from: offset + 1,
    to: to,
    total: rows.length
  }

  const consoleGroupName = 'Mock data - ' + moment().format('YYYY-MM-DD HH:mm:ss')
  setTimeout(() => {
    console.group(consoleGroupName)
    console.info('Receive:', query)
    console.info('Respond:', res)
    console.groupEnd(consoleGroupName)
  }, 0)
  // return Promise.resolve(data)
  return res
}
