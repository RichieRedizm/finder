import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import GithubContext from '../../context/github/GithubContext'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'

const Users = () => {
  const githubContext = useContext(GithubContext)
  const { loading, users } = githubContext

  if (loading) {
    return <Spinner />
  }

  return (
    <div style={userStyle}>
      {users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  )
}

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
}

export default Users
