import React from 'react'
import { Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import Authentication from './Pages/authentication'
import Tasks from './Pages/Tasks'
import BenefactorProfile from './Pages/BenefactorProfile'
import CharityProfile from './Pages/charityProfile'

export default class App extends React.Component {
  render() {
    return (
      <div >
        <Route exact path='/' component={Authentication} />
        <Route path='/tasks' component={Tasks} />
        <Route exact path='/benefactor' component={BenefactorProfile} />
        <Route exact path='/charity' component={CharityProfile} />
      </div>
    )
  }
}
