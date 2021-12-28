import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'

export class EditDepModal extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    fetch(process.env.REACT_APP_API + 'department', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        department_id: event.target.department_id.value,
        department_name: event.target.department_name.value,
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
  
  render() {
    console.log(this.props.show)
    return (
      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-loading"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-loading">
              Edit Department
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="department_id">
                    <Form.Label>DepartmentId</Form.Label>
                    <Form.Control
                      type="text"
                      name="department_id"
                      required
                      disabled
                      defaultValue={this.props.depid}
                      placeholder="department_name"
                    />
                  </Form.Group>

                  <Form.Group controlId="department_name">
                    <Form.Label>DepartmentName</Form.Label>
                    <Form.Control
                      type="text"
                      name="DepartmentName"
                      required
                      defaultValue={this.props.depname}
                      placeholder="DepartmentName"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Update Department
                    </Button>
                  </Form.Group>
                </Form>
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