import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  onChange (e) {
    e.preventDefault();
    this.setState({
      term: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.term);
    document.getElementById('search').value = null;
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input id='search' value={this.state.terms} onChange={this.onChange}/>       
      <button onClick={this.search}> Add Repos </button>
    </div>) 
  }
}

export default Search;