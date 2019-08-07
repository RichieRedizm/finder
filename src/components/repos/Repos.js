import React from 'react'
import PropTypes from 'prop-types'
import RepoDetail from './RepoDetail'

const Repos = ({ repos }) => {
  return repos.map(repo => <RepoDetail repo={repo} key={repo.id} />)
}

Repos.propTypes = {
  repos: PropTypes.array.isRequired
}

export default Repos
