import React from 'react'
import {IoMdLock, IoMdPerson} from 'react-icons/io'
import axios from 'axios'
import {withRouter} from 'react-router'
import {Alert} from 'react-bootstrap'

class Login extends React.Component {
  state = {
    fields: {
      username: '',
      password: ''
    },
    show: false
  }

  handleChange(event) {
    const name = event.target.name
    const changeFields = this.state.fields
    changeFields[name] = event.target.value
    this.setState({ fields: changeFields })
  }

  handleRequest() {
    axios.post('http://localhost:8000/accounts/login/', {
      username: this.state.fields.username,
      password: this.state.fields.password
    })
      .then((response) => {
        console.log(response.data.token)
        window.localStorage.setItem('token', response.data.token)
        this.props.history.push('/tasks')
      })
      .catch((error) => {
        console.log(error)
        this.setState({ show: true })
      })
  }

  handleClose() {
    this.setState({ show: false })
  }

  render() {
    return (
      <div className='enter-container'>
        <div className='user-icon'>
          <IoMdPerson className='icon' size='5%' color='white' />
          <input type='text' placeholder='نام کاربری'
            name='username'
            className='custom-input'
            onChange={(event) => this.handleChange(event)}
          />
        </div>
        <div className='user-icon'>
          <IoMdLock className='icon' size='5%' color='white' />
          <input type='password' placeholder='رمز عبور'
            name='password'
            className='custom-input'
            onChange={(event) => this.handleChange(event)}
          />
        </div>
        <button className='logbtn' onClick={() => this.handleRequest()} >ورود</button>
        <Alert id='authenalert' show={this.state.show} variant='danger' onClose={() => this.handleClose()} dismissible >
            <span style={{ fontWeight: 'bold' }}> خطایی رخ داده است </span>
        </Alert>
      </div>
    )
  }
}
export default withRouter(Login)
