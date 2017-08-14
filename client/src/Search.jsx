import React from 'react';
import ReactDOM from 'react-dom';
import * as rb from 'react-bootstrap';


class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchterm: '',
      isLoading: false //TODO
    }
  }

  handleChange(e) {
    this.setState({
      searchterm: e.target.value
    })
  }

  search(e) {
    this.props.onSearch(e.target.value);
  }

  render() {
    return (
      <div>
        <rb.Grid>
          <rb.Row>
            <rb.Col md={8}>
            <rb.Form inline>
              <rb.FormControl
                type="text"
                value={this.state.value}
                placeholder="Where to go?"
                onChange={this.handleChange.bind(this)}>
              </rb.FormControl>
              <rb.Button 
                type="submit" 
                onClick={this.search.bind(this)}
                bsStyle="info">
                Search
              </rb.Button>
            </rb.Form>
            </rb.Col>
          </rb.Row>
        </rb.Grid>
      </div>
    )
  }
}


export default Search;
