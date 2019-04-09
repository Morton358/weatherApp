import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

// import {serverAxios} from './share/axios-instance'
import './App.css'
import { AppProps, RootState } from './types'
import * as actions from './store/actions/index'
import AddWidget from "./containers/AddWidget/AddWidget";
// import initSocket from './services/notification'

class App extends Component<AppProps> {
  public componentDidMount() {
    this.props.onGetCityList()
    this.props.onGetListOfWidgets()
    // this.subscribeToCity('3094370')
    //   .then((resp) => console.log(resp))
    //   .catch((error) => console.error(error))
    // initSocket()
  }

  // private subscribeToCity = async (cityID: string) => {
  //   try {
  //     const resp = await serverAxios.get(`/server/subscribe/${cityID}`)
  //     resp
  //       ? console.log(`Client: You successfully subscribes to cityID: ${cityID}`)
  //       : console.log(`Client: You do not subscribes to cityID: ${cityID}`)
  //     return resp
  //   } catch (error) {
  //     console.error(error)
  //     return error
  //   }
  // }

  render() {
    let temperatureOfCity = null
    if (this.props.selectedCities.get(3094370) !== undefined) {
      // @ts-ignore
      temperatureOfCity = this.props.cities.get(3094370).temperature
    }
    return (
      <div className="App">
        <Row>
          <Col span={24}>
            <AddWidget /> 
            <h3>Hello World</h3>
            <p>{temperatureOfCity}</p>
            <p>{this.props.cities[0] !== undefined ? this.props.cities[0].name : null }</p>
          </Col>
        </Row>
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

const mapStateToProps = (state: RootState) => {
  return {
    cities: state.cities,
    selectedCities: state.selectedCities,
    error: state.error,
    errorOccured: state.errorOccured,
    loading: state.loading,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetCityList: () => dispatch(actions.getCityList()),
    onGetListOfWidgets: () => dispatch(actions.getWidgetList())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
