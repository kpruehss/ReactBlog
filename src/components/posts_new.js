import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    // es6 destructuring of field.meta.touched and error etc. so we 
    // can drop field.meta for shorter, more readable code
    const { meta : { touched, error } } = field; 

    // assemble form css class for shorter code and controlling color change
    // for validation
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input 
          className='form-control'
          type='text'
          {...field.input}
        />
        <div className='text-help'>
          {/* using destructured properties (=== field.meta.touched) */}
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    // whenever *ANY* type of API call is made in a redux app, make an
    // actionCreator for it
    this.props.createPost(values, () => {
      // handle programmatic navigation back to posts list once form is submitted
      this.props.history.push('/');
    });
  }

  render() {
    // es6 shorthand for const handleSubmit = this.props.handleSubmit
    const { handleSubmit } = this.props;

    return (
      // have to bind this in handleSubmit because its a callback function
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label='Title'
          name='title'
          component={this.renderField}
        />
        <Field
          label='Categories'
          name='categories'
          component={this.renderField}
        />
        <Field
          label='Post Content'
          name='content'
          component={this.renderField}
        />
        <button type='submit' className="btn btn-primary">Submit</button>
        <Link to='/' className='btn btn-danger'>Cancel</Link>
      </form>
    );}
}

function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf';
  const errors = {};

  // Validate input from 'values'
  if (!values.title) {
    errors.title = 'Enter a title!';
  }
  if (!values.categories) {
    errors.categories = 'Enter some categories!';
  }
  if (!values.content) {
    errors.content = 'Enter some content please!';
  }

  // if errors is empty, form is fine to submit
  // if errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})( 
  connect(null, { createPost })( PostsNew )
);