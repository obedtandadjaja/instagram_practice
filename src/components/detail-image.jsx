import React from 'react';

export default class DetailImage extends React.Component {
  render() {
    console.log(this.props);
    return (
      <img className="img-responsive center-block" />
    );
  }
}

