import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

import { Button, ButtonToolbar, Alert } from 'react-bootstrap'
import { AddDepModal } from '../post/PostDepModal'
import { EditDepModal } from '../put/PutDepModal'

export class Department extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deps: [],
      isLoaded: false,
      error: null,
      addModalShow: false,
      editModalShow: false,
    }
  }

  refreshList() {
    fetch(process.env.REACT_APP_API + 'department')
      .then((response) => response.json())
      .then(
        (data) => {
          this.setState({ isLoaded: true, deps: data })
        },
        (error) => {
          this.setState({ isLoaded: true, error })
        },
      )
  }

  componentDidMount() {
    if (this.refreshList()) return
    this.refreshList()
  }

  // componentDidUpdate() {
  //   this.refreshList()
  // }

  deleteDep(depid) {
    if (window.confirm('Are you sure?')) {
      fetch(process.env.REACT_APP_API + 'department/' + depid, {
        method: 'DELETE',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
    }
  }
  render() {
    const { deps, depid, depname, isLoaded, error } = this.state
    let addModalClose = () => this.setState({ addModalShow: false })
    let editModalClose = () => this.setState({ editModalShow: false })

    if (error && isLoaded) {
      return (
        <Alert variant="danger" style={{ margin: '20px' }}>
          <Alert.Heading>💀 Сервер не отвечает 💀</Alert.Heading>
          <p>
            Свяжитесь администратором сервера и попросите полечить сервер, а
            что-то ему очень плохо 🤒
          </p>
        </Alert>
      )
    } else {
      return (
        <div>
          <Table className="mt-4" striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Time Start</th>
                <th>Time End</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {deps.map((dep) => (
                <tr key={dep.id_address}>
                  <td>{dep.id_address}</td>
                  <td>{dep.name_address}</td>
                  <td>{dep.data_work}</td>
                  <td>{dep.data_end}</td>
                  <td>
                    <ButtonToolbar>
                      {/* Edit */}
                      <Button
                        className="mr-2"
                        variant="info"
                        onClick={() =>
                          this.setState({
                            editModalShow: true,
                            depid: dep.id_address,
                            depname: dep.name_address,
                            depstart: dep.data_work,
                            depend: dep.data_end,
                          })
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      </Button>
                      {/* Delete */}
                      <Button
                        className="mr-2"
                        variant="danger"
                        onClick={() => this.deleteDep(dep.department_id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path
                            fill-rule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          />
                        </svg>
                      </Button>

                      <EditDepModal
                        show={this.state.editModalShow}
                        onHide={editModalClose}
                        depid={depid}
                        depname={depname}
                      />
                    </ButtonToolbar>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <ButtonToolbar>
            <Button
              variant="primary"
              onClick={() => this.setState({ addModalShow: true })}
            >
              Add Department
            </Button>

            <AddDepModal
              show={this.state.addModalShow}
              onHide={addModalClose}
            />
          </ButtonToolbar>
        </div>
      )
    }
  }
}
