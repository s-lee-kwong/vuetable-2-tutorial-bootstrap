import moment from 'moment'
import uniq from 'lodash/uniq'
import orderBy from 'lodash/orderBy'
const typeOf = o => Object.prototype.toString.call(o).slice(8, -1).toLowerCase()
const purify = o => JSON.parse(JSON.stringify(o)) // purify data

/**
 * mockData - simulate Ajax request and respond
 * @param   {Object} query
 * @resolve {Object}
 */
export default function filter(query, data) {
  query = purify(query)
  var { limit = 10, offset = 0, sort = '', order = '' } = query

  sort = query["sort"].split("|")[0]
  order = query["sort"].split("|")[1]

  let rows = data;

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

  const res = {
    rows: rows.slice(offset, offset + limit),
    total: rows.length,
    summary: {
      uid: rows.length,
      age: rows.length && ~~(rows.map(({ age }) => age).reduce((sum, cur) => sum + cur) / rows.length), // average age
      country: uniq(rows.map(({ country }) => country)).length
    }
  }

  const consoleGroupName = 'Mock data - ' + moment().format('YYYY-MM-DD HH:mm:ss')
  setTimeout(() => {
    console.group(consoleGroupName)
    console.info('Receive:', query)
    console.info('Respond:', res)
    console.groupEnd(consoleGroupName)
  }, 0)
  // return Promise.resolve(data)
  return rows
}
