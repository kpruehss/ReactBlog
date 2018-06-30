import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPost();
  }

  render() {
    return (
      <div>
        Posts Index
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}
// { fetchPost } inside connect is identical to creating a seperate
// mapDispatchToProps() to connect the action creator
export default connect(mapStateToProps, { fetchPost })( PostsIndex );