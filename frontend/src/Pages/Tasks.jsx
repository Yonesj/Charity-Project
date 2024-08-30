import React from 'react'
import Navbar from '../Components/Navbar'
import {Badge, Button, Card, Col, Form, Modal, Row} from 'react-bootstrap'
import {IoMdSearch} from 'react-icons/io'
import axios from 'axios'

export default class Tasks extends React.Component {
    state = {
        fields: {
            title: '',
            charityName: '',
            gender: '',
            age: '',
            description: ''
        },
        taskslist: [],
        regexp: /^[0-9\b]+$/,
        show: false
    }

    componentDidMount() {
        const getToken = window.localStorage.getItem('token')
        console.log('search', this.props.location.search)
        const params = new URLSearchParams(this.props.location.search)
        params.get('title')
        params.get('charity')
        params.get('gender')
        params.get('age')
        params.get('description')
        let config = {
            headers: {'Authorization': `Token ${getToken}`},
            params: {
                title: params.get('title'),
                charity: params.get('charity'),
                gender: params.get('gender'),
                age: params.get('age'),
                description: params.get('description')
            }
        }

        axios.get('http://localhost:8000/tasks?', config)
            .then((response) => {
                response.data.map((task) => {
                    if (task.gender_limit === 'F') {
                        task.genderName = 'جنسیت: زن'
                    } else if (task.gender_limit === 'M') {
                        task.genderName = 'جنسیت: مرد'
                    } else {
                        task.genderName = 'جنسیت: زن / مرد'
                    }
                })
                this.setState({taskslist: response.data})
            })
            .catch((error) => {
                console.log(error)
                this.setState({show: true})
            })
    }

    handleChange(event) {
        const name = event.target.name
        const changeFields = this.state.fields
        changeFields[name] = event.target.value
        this.setState({fields: changeFields})
    }

    ageChange(e) {
        let age = e.target.value
        if (age === '' || this.state.regexp.test(age)) {
            this.setState({...this.state, fields: {...this.state.fields, age: age}})
        }
    }

    filteredSearch() {
        const getToken = window.localStorage.getItem('token')
        let a = 'http://localhost:8000/tasks?title='
        if (this.state.fields.title) {
            a += this.state.fields.title
        }
        a += '&charity='
        if (this.state.fields.charityName) {
            a += this.state.fields.charityName
        }
        a += '&gender='
        if (this.state.fields.gender) {
            a += this.state.fields.gender
        }
        a += '&age='
        if (this.state.fields.age) {
            a += this.state.fields.age
        }
        a += '&description='
        if (this.state.fields.description) {
            a += this.state.fields.description
        }
        let b = a.slice(21)
        axios.get(a, {
            headers: {
                'Authorization': `Token ${getToken}`
            }
        })
            .then((response) => {
                this.props.history.push(b)
                response.data.map((task) => {
                    if (task.gender_limit === 'F') {
                        task.genderName = 'جنسیت: زن'
                    }
                    if (task.gender_limit === 'M') {
                        task.genderName = 'جنسیت: مرد'
                    }
                    if (task.gender_limit === 'MF') {
                        task.genderName = 'جنسیت: هردو'
                    }
                })
                this.setState({taskslist: response.data})
            })
            .catch((error) => {
                console.log(error)
                this.setState({show: true})
            })
    }

    taskRequest(task) {
        const getToken = window.localStorage.getItem('token')
        let a = 'http://localhost:8000/tasks/'
        a += task.id
        a += '/request/'

        axios.get(a, {
            headers: {
                'Authorization': `Token ${getToken}`
            }
        })
            .then((response) => {
                console.log('taskrequest', response.data)
                task.state = 'W'
                this.setState({task})

            })
            .catch((error) => {
                console.log(error)
                this.setState({show: true})
            })
    }

    handleClose() {
        this.setState({show: false})
    }

    render() {
        return (
            <div className='taskPage' dir='rtl'>
                <Navbar/>
                <div className='search-task'>
                    <div className='searchBar'>
                        <Card className='text-right' style={{position: 'sticky', top: '90px'}}>
                            <Card.Header as='h4' id='searchHead'>
                                جستجو
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Label> موضوع </Form.Label>
                                            <Form.Control type='text' name='title'
                                                          placeholder='توانایی نگهداری از سالمندان و کودکان'
                                                          onChange={(event) => this.handleChange(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Label> موسسه خیریه </Form.Label>
                                            <Form.Control type='text' name='charityName'
                                                          placeholder=' خیریه امام علی (ع)'
                                                          onChange={(event) => this.handleChange(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Label> جنسیت </Form.Label>
                                            <Form.Control as='select' name='gender'
                                                          onChange={(event) => this.handleChange(event)}>
                                                <option value='MF'>تفاوتی ندارد</option>
                                                <option value='F'>زن</option>
                                                <option value='M'>مرد</option>
                                            </Form.Control>
                                        </Col>
                                        <Col>
                                            <Form.Label> سن </Form.Label>
                                            <Form.Control type='number' name='age'
                                                          placeholder='21'
                                                          value={this.state.fields.age}
                                                          onChange={(e) => this.ageChange(e)}/>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Label>توضیحات</Form.Label>
                                            <Form.Control as='textarea' rows='2'
                                                          type='text'
                                                          name='description'
                                                          placeholder='محدودیت مکانی یا ...'
                                                          onChange={(event) => this.handleChange(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}>
                                            <Button style={{fontWeight: 'bold'}}
                                                    variant='outline-success'
                                                    onClick={() => this.filteredSearch()}>
                                                <IoMdSearch/> جستجو کن
                                            </Button>
                                        </Col>
                                    </Row>

                                </Form>

                            </Card.Body>
                        </Card>
                    </div>
                    <div className='taskContainer'>
                        { (this.state.taskslist.length > 0 &&
                            this.state.taskslist.map((task, index) => {
                                return (
                                    <div key={index}>
                                        <Card className='text-right' id='taskCard'>
                                            <Card.Header as='h4'>
                                                <Row>
                                                    {task.title}
                                                    {
                                                        (task.state === 'W' &&
                                                            <Badge variant='warning'>در
                                                                حال بررسی</Badge>)
                                                    }
                                                    {
                                                        (task.state === 'P' &&
                                                            <Badge variant='info'>قابل
                                                                انتخاب</Badge>)
                                                    }
                                                    {
                                                        (task.state === 'A' &&
                                                            <Badge variant='success'>تائید
                                                                شده</Badge>)
                                                    }
                                                    {
                                                        (task.state === 'D' &&
                                                            <Badge variant='dark'>انجام
                                                                شده</Badge>)
                                                    }
                                                </Row>
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Title> موسسه
                                                    خیریه: {task.charity.name}</Card.Title>
                                                <p> {task.genderName} </p>
                                                <p> {task.description} </p>
                                                <div className='applyed'>
                                                    {
                                                        (task.state === 'P' &&
                                                            <Button variant='success'
                                                                    className='applybtn'
                                                                    onClick={() => this.taskRequest(task)}>
                                                                اعلام آمادگی
                                                            </Button>)
                                                    }
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            })) ||
                            <div>
                                <Card className='text-center' id='taskCard'>
                                    <Card.Body>
                                        <span style={{color: '#bbb'}}>هیچ پروژه‌ای موجود نیست</span>
                                    </Card.Body>
                                </Card>
                            </div>
                        }
                    </div>
                </div>
                <Modal show={this.state.show} onHide={() => this.handleClose()} size='sm'
                       id='taskError'>
                    <Modal.Header closeButton id='taskerrorHead'>
                        <Modal.Body id='taskerrorBody'>
                            <span style={{fontWeight: 'bold'}}> خطایی رخ داده است </span>
                        </Modal.Body>
                    </Modal.Header>
                </Modal>
            </div>
        )
    }
}
