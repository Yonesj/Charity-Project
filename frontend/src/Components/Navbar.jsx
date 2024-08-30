import React from 'react'
import {Button, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import axios from 'axios'
import {withRouter} from 'react-router'

class MyNavbar extends React.Component {
    state = {
        isBenefactor: false,
        isCharity: false
    }

    componentDidMount() {
        let b = window.localStorage.getItem('b')
        let ch = window.localStorage.getItem('ch')
        if (b) {
            this.setState({isBenefactor: true})
        }
        if (ch) {
            this.setState({isCharity: true})
        }
    }

    logOut() {
        const token = window.localStorage.getItem('token')
        axios.post('http://localhost:8000/accounts/logout/', '', {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((response) => {
                this.props.history.push('/')
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        return (
            <div className='divNav'>
                <Navbar bg='dark' variant="dark" expand='lg' dir='rtl' style={{width: '63%'}}>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className="ml-auto">
                            <Nav.Link href='/tasks'>نیکوکاری‌ها </Nav.Link>
                            <NavDropdown title='پروفایل '>
                                {
                                    (this.state.isBenefactor &&
                                        <NavDropdown.Item
                                            href='/benefactor'>نیکوکار</NavDropdown.Item>) ||
                                    <NavDropdown.Item href='/benefactor'
                                                      disabled>نیکوکار</NavDropdown.Item>
                                }

                                {
                                    (this.state.isCharity &&
                                        <NavDropdown.Item href='/charity'>موسسه خیریه
                                        </NavDropdown.Item>) ||
                                    <NavDropdown.Item href='/charity' disabled>
                                        موسسه خیریه</NavDropdown.Item>
                                }
                            </NavDropdown>
                            <Nav.Link href='http://localhost:8000/about-us/'>درباره‌ما</Nav.Link>
                        </Nav>
                        <nav className='mr-auto'>
                            <Button variant='danger'
                                    onClick={() => this.logOut()}>
                                خروج
                            </Button>
                        </nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default withRouter(MyNavbar)
