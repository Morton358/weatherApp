import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from './share/axios-instance'
import './App.css'
import { AppState, AppProps } from './store/types'
import * as actions from './store/actions/index'
import initSocket from './services/notification'

class App extends Component<AppProps> {
  public componentDidMount() {
    // this.callApi()
    this.props.onGetRequest()
    this.subscribeToCity('3094370')
      .then((resp) => console.log(resp))
      .catch((error) => console.error(error))
    initSocket()
  }

  private subscribeToCity = async (cityID: string) => {
    try {
      const resp = await axios.get(`/server/subscribe/${cityID}`)
      resp
        ? console.log(`Client: You successfully subscribes to cityID: ${cityID}`)
        : console.log(`Client: You do not subscribes to cityID: ${cityID}`)
      return resp
    } catch (error) {
      console.error(error)
      return error
    }
  }

  // callApi = async () => {
  //   try {
  //     const res = await axios.get('/server')
  //     this.setState({ response: res.data })
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // handleSubmit = async (e: React.FormEvent<EventTarget>) => {
  //   e.preventDefault()
  //   try {
  //     const response = await axios.post('/api/world', { post: this.state.post })
  //     this.setState({ responseToPost: response.data })
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  render() {
    let temperatureOfCity = null
    if (this.props.cities.get(3094370) !== undefined) {
      // @ts-ignore
      temperatureOfCity = this.props.cities.get(3094370).temperature
    }
    return (
      <div className="App">
        <header className="App-header" />
        <h3>Hello World</h3>
        <p>{this.props.cities.get(3094370)}</p>
        <p>{ temperatureOfCity }</p>
        {/* <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input type="text" value={this.state} onChange={(e) => this.setState({ post: e.target.value })} />
          <Button type="primary">Submit</Button>
        </form> */}
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    cities: state.cities,
    response: state.response,
    post: state.post,
    responseToPost: state.responseToPost,
    error: state.error,
    errorOccured: state.errorOccured,
    loading: state.loading,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetRequest: () => dispatch(actions.getResponse()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
