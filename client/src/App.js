import './App.css'

import { Home } from './component/Home'
import { Department } from './api/get/GetDepartment'
import { Employee } from './api/get/GetEmployee'
import { Logs } from './api/get/GetLogs'
import { Navigation } from './component/Navigation'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/department" component={Department} />
          <Route path="/employee" component={Employee} />
          <Route path="/logs" component={Logs} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
