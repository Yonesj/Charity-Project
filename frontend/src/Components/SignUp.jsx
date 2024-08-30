import React from 'react'
import {IoMdLock, IoMdPerson} from 'react-icons/io'
import axios from 'axios'
import {Alert, Button, Col, Modal, Row} from 'react-bootstrap'
import {withRouter} from 'react-router'

class SignUp extends React.Component {
    state = {
        fields: {
            username: '',
            password: '',
            charityName: '',
            charityReg: ''
        },
        isCharity: false,
        isBenefactor: false,
        show: false,
        alartShow: false
    }

    checkboxChange(event) {
        const checked = event.target.checked
        const name = event.target.name
        console.log(name, event.target.checked)
        this.setState({
            [name]: checked
        })
    }

    handleChange(event) {
        const name = event.target.name
        const changeFields = this.state.fields
        changeFields[name] = event.target.value
        this.setState({fields: changeFields})
    }

    handleClose() {
        this.setState({show: false})
    }

    handleShow() {
        this.setState({show: true})
    }


    charityCheckbox(event) {
        this.setState({charity: event.target.value})
    }

    alertclose() {
        this.setState({alartShow: false})
    }

    signupRequest() {
        axios.post('http://localhost:8000/accounts/register/', {
            username: this.state.fields.username,
            password: this.state.fields.password
        })
            .then((response) => {
                console.log(response.data)
                axios.post('http://localhost:8000/accounts/login/', {
                    username: this.state.fields.username,
                    password: this.state.fields.password
                })
                    .then((response) => {
                        console.log('signup token', response.data.token)
                        window.localStorage.setItem('token', response.data.token)
                        this.setState({show: true})

                    })
                    .catch((error) => {
                        console.log(error)
                        this.setState({alartShow: true})
                    })

            })
            .catch((error) => {
                console.log(error)
                this.setState({alartShow: true})
            })
    }

    sendRegType() {
        console.log('isChar', this.state.isCharity)
        console.log('isben', this.state.isBenefactor)
        const isBenefactor = this.state.isBenefactor
        const ischarity = this.state.isCharity
        var token = window.localStorage.getItem('token')
        if (isBenefactor) {
            axios.post('http://localhost:8000/benefactors/', '', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
                .then((response) => {
                    console.log(response.data)
                    this.props.history.push('/tasks')
                    window.localStorage.setItem('b', isBenefactor)

                })
                .catch((error) => {
                    console.log(error)
                    this.setState({alartShow: true})
                })
        }
        if (ischarity) {
            axios.post('http://localhost:8000/charities/', {
                name: this.state.fields.charityName,
                reg_number: this.state.fields.charityReg
            }, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
                .then((response) => {
                    console.log(response.data)
                    this.props.history.push('/tasks')
                    window.localStorage.setItem('ch', ischarity)
                    window.localStorage.setItem('charityname', response.data.name)
                })
                .catch((error) => {
                    console.log(error)
                    this.setState({alartShow: true})
                })
        }
    }

    render() {
        return (
            <div className='enter-container'>
                <div className='user-icon'>
                    <IoMdPerson className='icon' size='5%' color='white'/>
                    <input type='text' placeholder='نام کاربری'
                           name='username'
                           className='custom-input'
                           onChange={(event) => this.handleChange(event)}
                    />
                </div>
                <div className='user-icon'>
                    <IoMdLock className='icon' size='5%' color='white'/>
                    <input type='password' placeholder='رمز عبور'
                           name='password'
                           className='custom-input'
                           onChange={(event) => this.handleChange(event)}
                    />
                </div>
                <button className='logbtn' onClick={() => this.signupRequest()}>ثبت‌نام
                </button>
                <Alert id='authenalert' show={this.state.alartShow} variant='danger'
                       onClose={() => this.alertclose()} dismissible>
                    <span style={{fontWeight: 'bold'}}> خطایی رخ داده است </span>
                </Alert>
                <Modal show={this.state.show} onHide={() => this.handleClose()}
                       id='signmod'>
                    <Modal.Header id='mods' closeButton>
                        <Modal.Title id='mods'> نحوه همکاری </Modal.Title>
                    </Modal.Header>
                    <Modal.Body id='modbod' dir='rtl'>
                        <div>
                            <p dir='rtl' style={{textAlign: 'right'}}> لطفا نحوه همکاری
                                خود را انتخاب کنید</p>
                            <Row>
                                <Col sm='2'></Col>
                                <Col sm='7'
                                     style={{display: 'flex', justifyContent: 'center'}}>
                                    <input id='isCharity' type='checkbox' name='isCharity'
                                           onChange={(event) => this.checkboxChange(event)}
                                           style={{width: '20px', height: '20px'}}
                                    />
                                    <label for='isCharity'
                                           style={{marginRight: '10px'}}> موسسه
                                        خیریه</label>
                                    <input id='isBenefactor' type='checkbox'
                                           name='isBenefactor'
                                           onChange={(event) => this.checkboxChange(event)}
                                           style={{
                                               marginRight: '40px',
                                               width: '20px',
                                               height: '20px'
                                           }}
                                    />
                                    <label for='isBenefactor'
                                           style={{marginRight: '10px'}}>نیکوکار</label><br/>
                                </Col>
                                <Col sm='3'></Col>
                            </Row>
                            {this.state.isCharity &&
                            <div className='charityreg'>
                                <Row>
                                    <Col sm='3'>
                                        <label style={{fontSize: 'larger'}}> نام
                                            خیریه:</label>
                                    </Col>
                                    <Col sm='4'>
                                        <input type='text' name='charityName'
                                               onChange={(event) => this.handleChange(event)}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{marginTop: '1%'}}>
                                    <Col sm='3'>
                                        <label style={{fontSize: 'larger'}}> شماره
                                            ثبت:</label>
                                    </Col>
                                    <Col sm='4'>
                                        <input type='text' name='charityReg'
                                               onChange={(event) => this.handleChange(event)}
                                        />
                                    </Col>
                                </Row>
                            </div>
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer id='modfo'>
                        <Alert show={this.state.alartShow} variant='danger'
                               onClose={() => this.alertclose()} dismissible>
                            <span style={{fontWeight: 'bold'}}> خطایی رخ داده است </span>
                        </Alert>
                        <Button variant='success' onClick={() => this.sendRegType()}>
                            ثبت
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default withRouter(SignUp)
