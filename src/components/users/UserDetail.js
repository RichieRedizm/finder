import React, { Fragment, useEffect, useContext } from 'react'
import GithubContext from '../../context/github/githubContext'
import { Link } from 'react-router-dom'
import Repos from '../repos/Repos'
import Spinner from '../layout/Spinner'

const UserDetail = ({ match }) => {
  const githubContext = useContext(GithubContext)
  const { loading, user, userDetails, userRepos, repos } = githubContext

  useEffect(() => {
    userDetails(match.params.login)
    userRepos(match.params.login)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
  } = user

  return (
    <Fragment>
      <Link to={`/`} className='btn btn-light btn-sm my-1'>
        go back to search
      </Link>
      <h1>{name && `${name} - `}User Details</h1>
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
            {bio && (
              <li>
                <strong>Bio: </strong>
                {bio}
              </li>
            )}
            {blog && (
              <li>
                <strong>Blog: </strong>
                {blog}
              </li>
            )}
            {company && (
              <li>
                <strong>Company: </strong>
                {company}
              </li>
            )}
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

export default UserDetail
