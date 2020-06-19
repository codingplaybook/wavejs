import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default function NewPost(props){

  return ( 
    <div className="w-100">
      <Form>
        <FormGroup row>
          <Label for="type" className="pl-0" sm={4}>Post Type</Label>
          <Col sm={8}>
            <Input type="select" name="newPostType" id="newPostType" onChange={props.handleNewPostChange}>
              <option defaultValue value="image" name="image">Image</option>
              <option value="text" name="text">Text</option>
            </Input>
          </Col>
        </FormGroup>
        {props.newPostType === 'image' ?
        <div className="row py-3">
          <div className="col-11 mx-auto mb-1 row">
            {/*<div className="col-6 d-flex justify-content-center">
              <span className="text-center">Click 'Choose File' to Upload New Image</span>
            </div>*/}
            <div className="col-12 d-flex justify-content-center">
              <FormGroup  className="mx-auto">
                <Label for="newPostImg">Upload New Image</Label>
                <Input type="file" name="newPostImage" id="newPostImage" onChange={props.previewPostImage}/>
              </FormGroup>
            </div>
          </div>
          <div id="newPostImg" style={props.newPostImgStyle} />
        </div>
        : null}
        <FormGroup row>
          <Label for="newPostDescription">Description</Label>
          <Input 
          type="textarea" 
          name="newPostDescription" 
          id="newPostDescription"
          value={props.newPostDescription}
          onChange={props.handleNewPostChange}
           />
        </FormGroup>
        <FormGroup row>
          <Button onClick={props.handleNewPostSubmit}>Submit</Button>
        </FormGroup>
      </Form>
    </div>
  );
}