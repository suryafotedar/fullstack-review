import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.repos.map(repo => <div><a href={repo.html_url}>{repo.full_name}</a></div>)}
  </div>
)

export default RepoList;