import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap'

export class EditEmpModal extends Component {
  constructor(props) {
    super(props)
    this.state = { deps: [] }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFileSelected = this.handleFileSelected.bind(this)
  }

  photofilename = 'anonymous.png'
  imagesrc = process.env.REACT_APP_PHOTOPATH + this.photofilename

  componentDidMount() {
    fetch(process.env.REACT_APP_API + 'department')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ deps: data })
      })
  }

  handleSubmit(event) {
    event.preventDefault()
    fetch(process.env.REACT_APP_API + 'employee', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employee_id: event.target.employee_id.value,
        employee_name: event.target.employee_name.value,
        department: event.target.department.value,
        date_of_joining: event.target.date_of_joining.value,
        photo_file_name: this.photofilename,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result)
        },
        (error) => {
          alert('Failed')
        },
      )
  }

  handleFileSelected(event) {
    event.preventDefault()
    this.photofilename = event.target.files[0].name
    const formData = new FormData()
    formData.append('myFile', event.target.files[0], event.target.files[0].name)

    fetch(process.env.REACT_APP_API + 'Employee/SaveFile', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.imagesrc = process.env.REACT_APP_PHOTOPATH + result
        },
        (error) => {
          alert('Failed')
        },
      )
  }

  render() {
    return (
      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Employee
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="employee_id">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="employee_id"
                      required
                      placeholder="employee_id"
                      disabled
                      defaultValue={this.props.empid}
                    />
                  </Form.Group>

                  <Form.Group controlId="employee_name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="employee_name"
                      required
                      defaultValue={this.props.empname}
                      placeholder="employee_name"
                    />
                  </Form.Group>

                  <Form.Group controlId="department">
                    <Form.Label>department</Form.Label>
                    <Form.Control as="select" defaultValue={this.props.depmt}>
                      {this.state.deps.map((dep) => (
                        <option key={dep.department_id}>
                          {dep.department_name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="date_of_joining">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="date_of_joining"
                      required
                      disabled
                      placeholder="date_of_joining"
                      defaultValue={this.props.dateofjoining}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Update Employee
                    </Button>
                  </Form.Group>
                </Form>
              </Col>

              <Col sm={6}>
                {this.props.photofilename ? (
                  <Image
                    width="200px"
                    height="200px"
                    src={
                      process.env.REACT_APP_PHOTOPATH + this.props.photofilename
                    }
                  />
                ) : (
                  <Image
                    width="200px"
                    height="200px"
                    src={process.env.REACT_APP_PHOTOPATH + 'anonymous.png'}
                  />
                )}

                <input onChange={this.handleFileSelected} type="File" />
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
