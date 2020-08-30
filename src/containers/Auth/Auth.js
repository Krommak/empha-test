import React, {Component} from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import axios from 'axios'
import { authorizedContext, tokenContext } from '../../App'

class Auth extends Component {

  state = {
    formControls: {
      name: {
        value: '',
        type: 'text',
        label: 'Имя',
        errorMessage: 'Имя не может быть короче одного символа',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 1
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Пароль не может быть короче одного символа',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 1
        }
      }
    }
  }

  loginHandler = async () => {
    
    const AuthToken = {
      username: this.state.formControls.name.value,
      password: this.state.formControls.password.value,
    }
    try {
    const response = await axios.post('http://emphasoft-test-assignment.herokuapp.com/api-token-auth/', AuthToken)
    
    console.log(response.data)  

    this.props.token=response.data.token
    if (this.props.token.length !== 0) {
      this.props.authorized=true
      console.log('Авторизовано')
    }
    console.log('токен', this.state.token, 'авторизация ', this.state.authorized)
    
    } catch (e) {
      console.log(e)
    }
  }
  
  submitHandler = (event) => {
    event.preventDefault()
  }

  validateControl(value, validation) {
    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  onChangeHandler = (event, controlName) => {
    console.log(`${controlName} :`, event.target.value)

    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)
    
    formControls[controlName] = control

    this.setState({
      formControls
    })
  
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  render () {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>
            <form onSubmit={this.submitHandler} className={classes.AuthForm}>
              
              { this.renderInputs() }
            <tokenContext.Consumer>
              <authorizedContext.Consumer>
                <Button type="success" onClick={this.loginHandler}>Войти</Button>
              </authorizedContext.Consumer>
            </tokenContext.Consumer>
            </form>
        </div>
      </div>
    )
  }
}

export default Auth