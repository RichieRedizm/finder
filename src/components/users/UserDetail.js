import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Repos from '../repos/Repos'
import Spinner from '../layout/Spinner'

export class UserDetail extends Component {
  componentDidMount() {
    this.props.userDetails(this.props.match.params.login)
    this.props.userRepos(this.props.match.params.login)
  }
  render() {
    const { loading, repos } = this.props
    if (loading) return <Spinner />

    const {
      name,
      company,
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
          </div>
          <div>
            <a href={html_url} className='btn btn-dark my-1'>
              View {login} github profile
            </a>
            <ul>
              <li>
                {bio && (
                  <Fragment>
                    <strong>Bio: </strong>
                    {bio}
                  </Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment>
                    <strong>Blog: </strong>
                    {blog}
                  </Fragment>
                )}
              </li>
              <li>
                {company && (
                  <Fragment>
                    <strong>Company: </strong>
                    {blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className='card text-center'>
          <div className='badge badge-primary'>
            <strong>Followers: </strong>
            {followers}
          </div>
          <div className='badge badge-success'>
            <strong>Following: </strong>
            {following}
          </div>
          <div className='badge badge-light'>
            <strong>Repos: </strong>
            {public_repos}
          </div>
          <div className='badge badge-dark'>
            <strong>Gists: </strong>
            {public_gists}
          </div>
        </div>
        <Repos repos={repos} />
      </Fragment>
    )
  }
}

UserDetail.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object.isRequired,
  userDetails: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  userRepos: PropTypes.func.isRequired
}

export default UserDetail
