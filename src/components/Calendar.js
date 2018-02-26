import React, { Component, createElement } from 'react'

// sort date
var sortBy = (function() {
	//cached privated objects
	var _toString = Object.prototype.toString,
		//the default parser function
		_parser = function(x) {
			return x
		},
		//gets the item to be sorted
		_getItem = function(x) {
			return this.parser((x !== null && typeof x === 'object' && x[this.prop]) || x)
		}

	// Creates a method for sorting the Array
	// @array: the Array of elements
	// @o.prop: property name (if it is an Array of objects)
	// @o.desc: determines whether the sort is descending
	// @o.parser: function to parse the items to expected type
	return function(array, o) {
		if (!(array instanceof Array) || !array.length) return []
		if (_toString.call(o) !== '[object Object]') o = {}
		if (typeof o.parser !== 'function') o.parser = _parser
		o.desc = !!o.desc ? -1 : 1
		return array.sort(function(a, b) {
			a = _getItem.call(o, a)
			b = _getItem.call(o, b)
			return o.desc * (a < b ? -1 : +(a > b))
		})
	}
})()

Date.prototype.removeDays = function(days) {
	var dat = new Date(this.valueOf())
	dat.setDate(dat.getDate() - days)
	return dat
}

const Cell = ({ children }) => {
	if (Array.isArray(children)) {
		return (
			<td>
				<a href={children[1]} target="_blank">
					{children[0]}
				</a>
			</td>
		)
	} else {
		return (
			<td>
				<p>{children}</p>
			</td>
		)
	}
}

const DateCell = ({ children }) => (
	<td>
		<p>{getDay(children) + getMonth(children)}</p>
	</td>
)

const month = [
	'Jan',
	'Feb',
	'März',
	'Apr',
	'Mai',
	'Juni',
	'Juli',
	'Aug',
	'Sept',
	'Okt',
	'Nov',
	'Dez'
]

const getMonth = date => month[date.getMonth()]

const getDay = date => date.getDate() + '. '

const getDate = dateStr => {
	if (typeof dateStr === 'string') {
		var parts = dateStr.split('.')
		return new Date(parts[2], parts[1] - 1, parts[0])
	} else {
		return dateStr
	}
}

const Row = ({ children }) => (
	<tr>
		{children.map((content, index) => {
			if (index === 0) {
				return <DateCell key={index}>{content}</DateCell>
			} else {
				return <Cell key={index}>{content}</Cell>
			}
		})}
	</tr>
)

const Rows = (contents, index, desc) => {
	let temp = [
		<tr className="Year">
			<td colSpan="3">
				<h4>{index}</h4>
			</td>
		</tr>
	]
	sortBy(contents, {
		prop: 0,
		desc
	}).map((content, index) => temp.push(<Row key={index}>{content}</Row>))

	return temp
}

var dates = [
	['13.3.2017', 'test', ['info', '#bla']],
	['12.3.2017', 'test', 'info'],
	['12.3.2018', 'test', 'info'],
	['12.3.2016', 'test', 'info'],
	['13.3.2018', 'test', 'info'],
	['30.1.2018', 'test', 'info']
]

const pushDate = function(date) {
	const year = date[0].getFullYear()

	if (typeof this.dates[year] !== 'undefined') {
		this.dates[year].push(date)
	} else {
		this.dates[year] = [date]
	}
}

const map = function({ prop, desc }, fun) {
	let arr = []
	sortBy(Object.keys(this[prop]), {
		desc
	}).forEach(key => arr.push(fun(this[prop][key], key, desc)))
	return arr
}

const Table = ({ rows }) => {
	return <table>{rows.map((content, index) => <Row key={index}>{content}</Row>)}</table>
}

export default class Calendar extends Component {
	render() {
		let props = { ...this.props }
		//let className = ''
		//if (typeof this.props.className !== 'undefined') {
		//	className = this.props.className
		//}
		let rows = dates.map(date => {
			date[0] = getDate(date[0])
			return date
		})

		rows = sortBy(rows, {
			prop: 0,
			desc: true
		})
		const now = new Date(Date.now()).removeDays(1)

		let upcoming = { dates: {}, pushDate, map }
		let past = { dates: {}, pushDate, map }

		rows.map(date => {
			if (date[0] > now) {
				upcoming.pushDate(date)
			} else {
				past.pushDate(date)
			}
		})

		//return createElement(Table, { rows, ...props })
		return (
			<div>
				<table>
					<tr className="TableHeader">
						<td colSpan="3">
							<h3>upcomming</h3>
						</td>
					</tr>
					{upcoming.map({ prop: 'dates', desc: false }, Rows)}
					<tr className="TableHeader">
						<td colSpan="3">
							<h3>past</h3>
						</td>
					</tr>
					{past.map({ prop: 'dates', desc: true }, Rows)}
				</table>
			</div>
		)
	}
}
