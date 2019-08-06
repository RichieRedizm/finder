import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'

export class UserDetail extends Component {
  componentDidMount() {
    this.props.userDetails(this.props.match.params.login)
  }
  render() {
    const { loading } = this.props.loading
    if (loading) return <Spinner />

    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable
    } = this.props.user

    return (
      <Fragment>
        <Link to={`/`} className='btn btn-light btn-sm my-1'>
          go back to search
        </Link>
        <h1>{name} - User Details</h1>
        <div className='card grid-2'>
          <div className='all-center'>
            <img
              src={avatar_url}
              alt={login}
              className='round-img'
              style={{ width: '150px' }}
            />
            <p>{login}</p>
            <p>Location: {location}</p>
            <p>
              Hireable:
              {hireable ? (
                <i className='fas fa-check text-success' />
              ) : (
                <i className='fas fa-times-circle text-danger' />
              )}
            </p>

            <p>{html_url}</p>
            <p>{followers}</p>
            <p>{following}</p>
            <p>{public_repos}</p>
            <p>{public_gists}</p>
          </div>
          <div>
            {bio && <Fragment>{bio}</Fragment>}
            {blog && <Fragment>{blog}</Fragment>}
          </div>
        </div>
      </Fragment>
    )
  }
}

UserDetail.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object.isRequired,
  userDetails: PropTypes.func.isRequired
}

export default UserDetail
