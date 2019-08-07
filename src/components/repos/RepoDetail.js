import React from 'react'
import PropTypes from 'prop-types'

const RepoDetail = ({ repo }) => {
  return (
    <div className='card'>
      <h3>{repo.name}</h3>
    </div>
  )
}

RepoDetail.propTypes = {
  repo: PropTypes.object.isRequired
}

export default RepoDetail
