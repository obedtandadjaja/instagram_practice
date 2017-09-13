import React from 'react';
import { Route } from 'react-router-dom';
import Spinner from './spinner';
import Image from './image';
import { connect } from 'react-redux';
import { getImages } from '../action-creators';

export class Detail extends React.Component {
  imageUrl() {
    if (this.props.imageList.length === 0) {
      this.props.getImages();
      return '';
    } else {
      const id = this.props.match.params.id;
      return this.props.imageList[id].url;
    }
  }
  render() {
    console.log(this.props.match);
    return (
      <div>
        {
          this.props.isLoading ?
            <Spinner /> :
            <div className="row m-t-4">
              <div className="col-md-12">
                <Image key={this.props.match.params.id} url={this.imageUrl()} />
              </div>
            </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    imageList: state.get('imageList').toJS(),
    isLoading: state.getIn(['view', 'isLoading']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getImages: () => dispatch(getImages())
  }
}
export const DetailContainer = connect(mapStateToProps, mapDispatchToProps)(Detail);
