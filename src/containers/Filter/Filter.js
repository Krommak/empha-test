import React, {Component} from 'react'
import classes from './Filter.module.css'

export default class Filter extends Component {
  render () {
    return (
      <div className={classes.Filter}>
        <div>
          <h1>Фильтрация пользователей</h1>
        </div>
      </div>
    )
  }
}