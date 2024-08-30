import React from 'react'
import Navbar from '../Components/Navbar'
import { Button, Col, Form } from 'react-bootstrap'

export default class BenefactorProfile extends React.Component {
    state = {
        fields: {
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            address: '',
            description: '',
            gender: '',
            age: '',
            experience: '',
            freeTime: ''
        }
    }

    handleChange(event) {
        const name = event.target.name
        const changeFields = this.state.fields
        changeFields[name] = event.target.value
        this.setState({ fields: changeFields })
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className='bene-container'>
                    <div className='demographic-container' dir='rtl'>
                        <h2 style={{ alignSelf: 'right', marginBottom: '10px' }}>
                            اطلاعات نیکوکار
                        </h2>
                        <Form>
                            <Form.Row>
                                <Col>
                                    <Form.Label>نام</Form.Label>
                                    <Form.Control name='firstname'
                                        placeholder='نام خود را وارد نمایید'
                                        onChange={(event) => this.handleChange(event)} />
                                </Col>
                                <Col>
                                    <Form.Label>نام خانوادگی</Form.Label>
                                    <Form.Control name='lastname'
                                        placeholder='نام خانوادگی خود را وارد نمایید'
                                        onChange={(event) => this.handleChange(event)} />
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Label> جنسیت </Form.Label>
                                    <Form.Control as='select' name='gender'
                                        onChange={(event) => this.handleChange(event)}>
                                        <option value=''></option>
                                        <option value='F'>زن</option>
                                        <option value='M'>مرد</option>
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label> سن </Form.Label>
                                    <Form.Control type='number' name='age'
                                        placeholder='سن خود را وارد نمایید'
                                        onChange={(event) => this.handleChange(event)}
                                    />
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Label>ایمیل</Form.Label>
                                    <Form.Control name='email'
                                        placeholder='ایمیل خود را وارد نمایید'
                                        onChange={(event) => this.handleChange(event)}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label> شماره تماس </Form.Label>
                                    <Form.Control
                                        placeholder=' شماره تماس خود را وارد نمایید'
                                        name='phone'
                                        onChange={(event) => this.handleChange(event)}
                                    />
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Label> آدرس </Form.Label>
                                    <Form.Control name='address'
                                        placeholder='آدرس خود را وارد نمایید'
                                        onChange={(event) => this.handleChange(event)}
                                    />
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Label> تجربه نیکوکاری </Form.Label>
                                    <Form.Control name='experience'
                                        placeholder='نگهداری از سالمندان و کودکان'

                                        onChange={(event) => this.handleChange(event)}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label> زمان آزاد در هفته </Form.Label>
                                    <Form.Control name='freeTime'
                                        type='number'
                                        placeholder='20'
                                        onChange={(event) => this.handleChange(event)}
                                    />
                                </Col>

                            </Form.Row>
                            <Form.Row>
                                <Col sm='12'>
                                    <Form.Group controlId='exampleForm.ControlTextarea1'>
                                        <Form.Label>توضیحات</Form.Label>
                                        <Form.Control as='textarea' rows='3'
                                            name='description'
                                            onChange={(event) => this.handleChange(event)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col sm='5'></Col>
                                <Col>
                                    <Button variant='info'> ثبت اطلاعات </Button>
                                </Col>
                                <Col sm='8'></Col>
                            </Form.Row>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
