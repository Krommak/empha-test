import React, { Component } from 'react'
import classes from './Filter.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import axios from 'axios'
import Select from '../../components/UI/Select/Select'

class Filter extends Component {

  state = {
    formControls: {
      name: {
        type: 'text',
        value: '',
        label: 'Введите запрос',
        touched: false
      }
  },
  users: [],
  filtratedUsers: [],
  usersList: false
}

  filtrateUsers (value) {
    
    const filtratedUsers = this.state.users.filter((obj) => {
      const userneme = obj.username
      let flag = false

      if(String(userneme).indexOf(value) > -1) {
        return flag = true
      }
      if (flag) return obj

    })
    console.log(filtratedUsers)

    this.setState({
      filtratedUsers
    })

  }

  sortUser = (event) => {
    const to = event.target.value
    if (this.state.formControls.name.touched) {
      let users = this.state.filtratedUsers
      console.log("1", users)
      if (to == 1) {
        users.sort((a, b) => a.id - b.id)
        console.log("11", users)
      } else if (to == 2) {
        users.sort((a, b) => b.id - a.id)
        console.log("111", users)
      }
      console.log("1111", users)
        this.setState({
          filtrateUsers: users
        })
      }

      let users = this.state.users
      console.log("2", users)
      if (to == 1) {
        users.sort((a, b) => a.id - b.id)
        console.log("22", users)
      } else if (to == 2) {
        users.sort((a, b) => b.id - a.id)
      }
      console.log("222", users)
      console.log("2222", users)
        this.setState({
          users: users
        })
      }
    
  changeHandler = (event) => {
    console.log(event.target.value)
    this.setState()
    const formControls = { ...this.state.formControls}
    const control = { ...formControls.name}

    control.touched = true
    control.value = event.target.value
    this.filtrateUsers(control.value)

    formControls.name = control

    this.setState({
      formControls
    })
}

  usersHandler = async () => {

    try {
    const response = await axios.get('http://emphasoft-test-assignment.herokuapp.com/api/v1/users/', {headers: {Authorization: 'Token ' + this.props.token}})

    this.setState({
      users: response.data
    })

    } catch (e) {
      console.log(e)
    }
    if (this.state.users.length !== 0) {
      this.setState({
        usersList: true
      })
    }
  }

  render () {
    const control = this.state.formControls.name
    return (
      <div className={classes.Filter}>
        <div>
          <h1>Фильтрация пользователей</h1>
          <div className={classes.FilterField}>
            <Button type="success" onClick={this.usersHandler}>Получить список пользователей</Button>
            {this.state.usersList ?
              <div className={classes.filterParams}>
                <Input
                  value={control.value}
                  label="Введите значение для фильтрации"
                  onChange={event => this.changeHandler(event)}
                /> 
                <Select
                  label="Сортировать по"
                  onChange={event => this.sortUser(event)}
                  options={[
                    {text: 'возрастанию', value: 1},
                    {text: 'убыванию', value: 2}
                  ]}
                />
              </div>
              : null
              }
              <ul>
                {this.state.formControls.name.touched
                ? this.state.filtratedUsers.map((user) => (<li key={user.id}><span>{"User: "+user.username+", "}</span><span>{"ID: "+user.id+", "}</span><span>{"First name: "+user.first_name+", "}</span><span>{"Last name: "+user.last_name+", "}</span><span>{"Active: "+user.is_active+", "}</span><span>{"Last login: "+user.last_login+", "}</span><span>{"Superuser: "+user.is_active+"."}</span></li>))
                : this.state.users.map((user) => (<li key={user.id}><span>{"User: "+user.username+", "}</span><span>{"ID: "+user.id+", "}</span><span>{"First name: "+user.first_name+", "}</span><span>{"Last name: "+user.last_name+", "}</span><span>{"Active: "+user.is_active+", "}</span><span>{"Last login: "+user.last_login+", "}</span><span>{"Superuser: "+user.is_active+"."}</span></li>))
                }
              </ul>
            </div>
        </div>
      </div>
    )
  }
}

export default Filter