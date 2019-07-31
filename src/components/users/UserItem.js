import React from 'react'
import PropTypes from 'prop-types'

const UserItem = ({ user: { login, html_url, avatar_url } }) => {
  return (
    <div className='card text-center'>
      <img
        src={avatar_url}
        alt='profile'
        className='round-img'
        style={{ width: '60px' }}
      />
      <h3>{login}</h3>
      <a href={html_url} className='btn btn-dark btn-sm my-1'>
        more
      </a>
    </div>
  )
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserItem
