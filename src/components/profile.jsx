import React from 'react';
import { getProfiles } from '../action-creators';
import Spinner from './spinner';
import { connect } from 'react-redux';

export default class Profile extends React.Component {
  profile() {
    if (this.props.profileList.length === 0) {
      this.props.getProfiles();
      return '';
    } else {
      const id = this.props.match.params.id;
      return this.props.profileList[id];
    }
  }
  getAvatar() {
    const profile = this.profile();
    if(profile === undefined) return '';
    else {
      try {
        return profile.avatar.url;
      } catch (error) {
        return '';
      }
    }
  }

  render() {
    return(
      this.props.isLoading ?
      <Spinner /> :
      <div className="row user-header p-y-2">
        <div className="col-md-offset-2 col-md-8 p-y-4">
          <div className="media">
            <div className="media-left">
              <a href="#">
                <img
                  className="media-object"
                  src={this.getAvatar()}
                  alt="profile-pic"
                />
              </a>
            </div>
            <div className="media-body p-l-6">
              <h2 className="media-heading m-t-15">{this.profile().name}</h2>
              <h4><strong>{this.profile().name}</strong> {this.profile().bio}</h4>
              <ul className="header-ul">
                <li><strong>{this.profile().posts}</strong> posts</li>
                <li><strong>{this.profile().followers}</strong> followers</li>
                <li><strong>{this.profile().following}</strong> following</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profileList: state.get('profileList').toJS(),
    isLoading: state.getIn(['view', 'isLoading']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProfiles: () => dispatch(getProfiles())
  }
}
export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);
