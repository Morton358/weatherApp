import React, { Component, Dispatch } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import logo from './logo.svg'
import './App.css'
import { AppState } from './store/types'
import * as actions from './store/actions/index'

interface AppProps {
  res: string
  post: string
  resToPost: string
  error: Error | null
  errorOccured: boolean
  loading: boolean
  onGetRequest: any
}
class App extends Component<AppProps> {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  }

  componentDidMount() {
    // this.callApi()
    this.props.onGetRequest()
  }

  callApi = async () => {
    try {
      const res = await axios.get('/api')
      this.setState({ response: res.data })
    } catch (error) {
      console.error(error)
    }
  }

  handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/world', { post: this.state.post })
      this.setState({ responseToPost: response.data })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
        <p>{this.props.res}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input type="text" value={this.state.post} onChange={(e) => this.setState({ post: e.target.value })} />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    res: state.response,
    post: state.post,
    resToPost: state.responseToPost,
    error: state.error,
    errorOccured: state.errorOccured,
    loading: state.loading,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetRequest: (): Dispatch<typeof actions.getResponse> => dispatch(actions.getResponse()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
