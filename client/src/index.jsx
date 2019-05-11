import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    };
    this.search = this.search.bind(this);
  }
  
  componentDidMount () {
    $.get('/repos')
      .done(data => {
        this.setState({
          repos: data
        });
      })
      .fail(err => {
        console.log('Unable to do jack shit');
      });
  }

  search (term) {
    $.post('/repos', { username: `${term}`})
      .done(data => {
        this.setState({
          repos: data
        });
        this.forceUpdate();
      })
      .fail(err => {
        console.log('Unable to send username', err);
      });
  }
  

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));