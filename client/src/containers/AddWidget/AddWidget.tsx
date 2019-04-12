import React, { Component } from 'react'
import { Input, AutoComplete, message } from 'antd'
import { connect } from 'react-redux'

import './AddWidget.css'
import { RootState, City, AddWidgetProps } from '../../types'
import * as actions from "../../store/actions/index";

const Option = AutoComplete.Option

export class AddWidget extends Component<AddWidgetProps> {
  public state = {
    dataSource: [],
    selectedCityId: null
  }

  private onSelect = (cityID: any) => {
    this.props.selectedCities.size < 4 ? this.props.onAddWidget(cityID) : message.error('You have reached the limit of widgets')
  }

  private handleSearch = (value: any) => {
    this.setState({
      dataSource: value ? this.searchResult(value) : [],
    })
  }

  private renderOption = (city: City) => {
    return <Option key={city.id}>{city.name}</Option>
  }

  private searchResult = (query: any) => {
    const re = new RegExp('^' + query.toString(), 'gmi')
    return this.props.cities.filter((city: City) => re.test(city.name))
  }

  public render() {
    const { dataSource } = this.state
    return (
      <div className="global-search-wrapper">
        <AutoComplete
          className="global-search"
          size="large"
          dataSource={dataSource.map(this.renderOption)}
          onSelect={this.onSelect}
          onSearch={this.handleSearch}
          placeholder="input the city"
          optionLabelProp="text"
        >
          <Input />
        </AutoComplete>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    cities: state.cities,
    selectedCities: state.selectedCities
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAddWidget: (cityId: string) => dispatch(actions.addWidget(cityId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWidget)
