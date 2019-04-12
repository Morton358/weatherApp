import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Icon, Button } from 'antd'

import * as actions from '../../store/actions/index'
import { RootState, WidgetsProps, City } from '../../types'
import './Widgets.css'

export class Widgets extends Component<WidgetsProps> {
  private getArrayOfWidgets = () => {
    return Array.from(this.props.selectedCities)
  }

  public render() {
    const IconFont = Icon.createFromIconfontCN({ scriptUrl: '//at.alicdn.com/t/font_1137269_mr5iom6igoj.js' })
    return (
      <div className="widgets">
        {this.getArrayOfWidgets().map(([cityID, weather]) => {
          return (
            <Card
              key={cityID}
              actions={[(this.props.cities.find((city) => city.id === cityID) as City).name]}
              className="widget"
            >
              {/* 
              // @ts-ignore */}
              <Button
                shape="circle"
                className="btn-refresh"
                onClick={() => this.props.onRefreshWeather(cityID)}
              >
                <IconFont type="icon-Refresh" />
              </Button>
              {/* 
              // @ts-ignore */}
              <Button
                shape="circle"
                type="danger"
                icon="delete"
                className="btn-delete"
                onClick={() => this.props.onRemoveWidget(cityID)}
              />
              <br />
              <br />
              <br />
              <Icon type="cloud" /> &nbsp;
              <span>Cloud percentage: {weather.cloudPercentage}</span> <br />
              <IconFont type="icon-rain" /> &nbsp;
              <span>Rain amount: {weather.rainAmount}</span> <br />
              <IconFont type="icon-temperature" /> &nbsp;
              <span>Temperature: {weather.temperature}</span> <br />
            </Card>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    selectedCities: state.selectedCities,
    cities: state.cities,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onRemoveWidget: (cityID: number) => dispatch(actions.removeWidget(cityID)),
    onRefreshWeather: (cityID: number) => dispatch(actions.getCityWeather(cityID)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Widgets)