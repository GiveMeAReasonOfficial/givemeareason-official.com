import React, { Component, createElement } from 'react'
import Icon from './Icon'

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

const Cell = ({ content }) => {
	if (typeof content === 'object') {
		if (content.url !== null) {
			return (
				<td>
					<a href={content.url} target="_blank">
						{content.name} <Icon fas="link" />
					</a>
				</td>
			)
		} else {
			return <td>{content.name}</td>
		}
	} else {
		return (
			<td>
				<p>{content}</p>
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

const Row = ({ children, index }) => (
	<tr key={index}>
		<DateCell>{children.date}</DateCell>
		<Cell content={children} />
		<Cell content={children.location} />
	</tr>
)

const Rows = (contents, index, desc) => {
	let temp = [
		<tr className="Year" key="y">
			<td colSpan="3">
				<h4>{index}</h4>
			</td>
		</tr>
	]
	sortBy(contents, {
		desc
	}).map((date, index) =>
		temp.push(
			<Row key={index} index={index}>
				{date}
			</Row>
		)
	)

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
	const year = date.date.getFullYear()
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

const Alt = ({ upcoming, altText }) => {
	if (Object.keys(upcoming.dates).length !== 0) {
		return upcoming.map({ prop: 'dates', desc: false }, Rows)
	} else {
		return (
			<tr>
				<td colSpan="3">
					<p>{altText}</p>
				</td>
			</tr>
		)
	}
}

export default class Calendar extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		let props = { ...this.props }
		//let className = ''
		//if (typeof this.props.className !== 'undefined') {
		//	className = this.props.className
		//}
		let rows = this.props.events.event.map(event => {
			event.date = getDate(event.date)
			return event
		})

		rows = sortBy(rows, {
			prop: 0,
			desc: true
		})
		const now = new Date(Date.now()).removeDays(1)

		let upcoming = { dates: {}, pushDate, map }
		let past = { dates: {}, pushDate, map }

		rows.map(event => {
			if (event.date > now) {
				upcoming.pushDate(event)
			} else {
				past.pushDate(event)
			}
		})

		//return createElement(Table, { rows, ...props })
		return (
			<div>
				<table>
					<tbody>
						<tr className="TableHeader">
							<td colSpan="3">
								<h2>upcoming</h2>
							</td>
						</tr>
						<Alt upcoming={upcoming} altText={this.props.events.altText} />
						<tr className="TableHeader">
							<td colSpan="3">
								<h2>past</h2>
							</td>
						</tr>
						{past.map({ prop: 'dates', desc: true }, Rows)}
					</tbody>
				</table>
			</div>
		)
	}
}
