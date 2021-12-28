import React, { Component } from 'react'
import { Table, Dropdown } from 'react-bootstrap'

export class Logs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logs: [],
      addModalShow: false,
      editModalShow: false,
      textDropdown: 'Выберите дату',
    }
  }

  refreshList() {
    fetch(process.env.REACT_APP_API + 'logs')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ logs: data })
      })
  }

  componentDidMount() {
    this.refreshList()
  }

  // componentDidUpdate() {
  //   this.refreshList()
  // }

  render() {
    const { logs } = this.state
    let arr_1 = Array.from(
      new Set(
        logs.map(
          (log) => new Date(log.log_date).toLocaleString().split(',')[0],
        ),
      ),
    )
    let id = this.props.location.hash.split('#')[1]
    function GetLog(log, text) {
      if (id === log) {
        return (
          <tr>
            <td>{log}</td>
            <td>{text}</td>
          </tr>
        )
      }
    }

    return (
      <>
        <div className="mt-4" style = {{background: "rgba(32, 32, 32, 0.5)", padding: "15px", "border-radius": "12px"}}>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {id ? id : 'Выберите дату'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {arr_1.map((log) => (
                <Dropdown.Item
                  onClick={this.handleClick}
                  href={'/logs/#' + log}
                >
                  {log}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Time</th>
              <th>Log</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) =>
              GetLog(
                new Date(log.log_date).toLocaleString().split(',')[0],
                log.log_text,
              ),
            )}
          </tbody>
          {/* 
            {logs.map((log) => (
              <tr>
                <td>{new Date(log.log_date).toLocaleString()}</td>
                <td>{log.log_text}</td>
              </tr>
            ))}
           */}
        </Table>
      </>
    )
  }
}
