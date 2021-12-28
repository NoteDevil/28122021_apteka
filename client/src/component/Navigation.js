import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { LoginIn } from '../modal/login'

export class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editModalShow: false,
    }
  }
  render() {
    const editModalClose = () => this.setState({ editModalShow: false })

    return (
      <Navbar bg="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <NavLink className="d-inline p-2 bg-dark text-white" to="/">
              Главная
            </NavLink>
            <NavLink
              className="d-inline p-2 bg-dark text-white"
              to="/department"
            >
              Аптеки
            </NavLink>
            <NavLink className="d-inline p-2 bg-dark text-white" to="/employee">
              Препораты
            </NavLink>
            <NavLink className="d-inline p-2 bg-dark text-white" to="/logs">
              Логи
            </NavLink>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Button
              variant="success"
              onClick={() =>
                this.setState({
                  editModalShow: true,
                })
              }
            >
              Login In
              <LoginIn
                show={this.state.editModalShow}
                onHide={editModalClose}
              />
              {console.log(this.state.editModalShow)}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
