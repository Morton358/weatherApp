import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Spin, message } from 'antd'

import './App.css'
import { AppProps, RootState } from './types'
import * as actions from './store/actions/index'
import AddWidget from './containers/AddWidget/AddWidget'
import initSocket from './services/notification'
import Widgets from './containers/Widgets/Widgets'

class App extends Component<AppProps> {
  public componentDidMount() {
    this.props.onGetCityList()
    this.props.onGetListOfWidgets()
    initSocket()
  }

  private getWidgetsComponent = () => {
    return <Widgets />
  }

  public render() {
    let displayData = null
    if (this.props.loading) {
      displayData = <Spin className="loading" size="large" />
    } else if (this.props.errorOccured) {
      message.error(this.props.error)
    } else if (
      !this.props.errorOccured &&
      !this.props.loading &&
      this.props.selectedCities.size === 0 &&
      this.props.cities.length === 0
    ) {
      displayData = null
    } else if (
      !this.props.errorOccured &&
      !this.props.loading &&
      this.props.selectedCities.size === 0 &&
      this.props.cities.length !== 0
    ) {
      displayData = (
        <React.Fragment>
          <Row>
            <Col span={24}>
              <AddWidget />
            </Col>
          </Row>
          <Row>
            <Col span={24}>{null}</Col>
          </Row>
        </React.Fragment>
      )
    } else if (
      !this.props.errorOccured &&
      !this.props.loading &&
      this.props.selectedCities.size !== 0 &&
      this.props.cities.length !== 0
    ) {
      displayData = (
        <React.Fragment>
          <Row>
            <Col span={24}>
              <AddWidget />
            </Col>
          </Row>
          <Row>
            <Col span={24}>{this.getWidgetsComponent()}</Col>
          </Row>
        </React.Fragment>
      )
    }
    return <div className="App">{displayData}</div>
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
    onGetListOfWidgets: () => dispatch(actions.getWidgetList()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
