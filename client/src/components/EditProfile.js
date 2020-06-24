import React from 'react';
import { Alert, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function EditProfile(props){

  return (
    <Form className="w-100">
      <h4>Edit Profile</h4>
      <p><b>(username change returns to login)</b></p>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="editEmail" id="editEmail" value={props.editEmail} onChange={props.handleProfileChange} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" name="editUsername" id="editUsername" value={props.editUsername} onChange={props.handleProfileChange} />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="firstname">First Name</Label>
            <Input type="text" name="editFirstname" id="editFirstname" value={props.editFirstname} onChange={props.handleProfileChange} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="lastname">Last Name</Label>
            <Input type="text" name="editLastname" id="editLastname" value={props.editLastname} onChange={props.handleProfileChange} />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="password">New Password</Label>
            <Input type="password" name="editPassword" id="editPassword" value={props.editPassword} onChange={props.handleProfileChange} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="rePassword">Re-enter Password</Label>
            <Input type="password" name="editRePassword" id="editRePassword" value={props.editRePassword} onChange={props.handleProfileChange} />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={12}>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="textarea" name="editDescription" id="editDescription" value={props.editDescription} onChange={props.handleProfileChange} />
        </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <div id="newProfileImg" style={props.newProfileImgStyle} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="newProfileImg">Change Profile Photo</Label>
            <Input type="file" name="newImage" id="newImage" onChange={props.previewProfileImage} />
          </FormGroup>
        </Col>
        { props.isEditError ?
          <Col md={12}>
            <Alert color="danger">{props.showErrors}</Alert>
          </Col>
        : null }
        <Button color="info" onClick={props.handleProfileUpdate}>Submit</Button>                                       
      </Row>
    </Form>
  );
}