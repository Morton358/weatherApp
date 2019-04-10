import React, { Component } from 'react'
import { Icon, Button, Input, AutoComplete } from 'antd'
import { connect } from 'react-redux'

import './AddWidget.css'
import { RootState, City, AddWidgetProps } from '../../types'
import * as actions from "../../store/actions/index";

const Option = AutoComplete.Option

export class AddWidget extends Component<AddWidgetProps> {
  state = {
    dataSource: [],
    selectedCityId: null
  }

  private onSelect = (cityID: any) => {
    console.log(typeof cityID);
    console.log('onSelect -> cityID', cityID)
    this.props.onAddWidget(cityID)
  }

  private handleSearch = (value: any) => {
    console.log(`I am inside handleSearch, value is: ${value}`)
    this.setState({
      dataSource: value ? this.searchResult(value) : [],
    })
    console.log(`handleSearch -> state after setState is: ${this.state.dataSource}`)
    console.log(this.state.dataSource)
  }

  private renderOption = (city: City) => {
    console.log('I am inside renderOption')
    console.log(typeof city.id)
    return <Option key={city.id}>{city.name}</Option>
  }

  private searchResult = (query: any) => {
    const re = new RegExp('^' + query.toString(), 'gmi')
    return this.props.cities.filter((city: City) => re.test(city.name))
  }

  public render() {
    const { dataSource } = this.state
    return (
      <div className="global-search-wrapper" style={{ width: 300 }}>
        <AutoComplete
          className="global-search"
          size="large"
          style={{ width: '80%' }}
          dataSource={dataSource.map(this.renderOption)}
          onSelect={this.onSelect}
          onSearch={this.handleSearch}
          placeholder="input the city"
          optionLabelProp="text"
        >
          <Input />
        </AutoComplete>
        {/* 
        // @ts-ignore */}
        <Button type="primary" shape="circle" className="btn-add-widget" onClick={this.handleAddWidget}>
          <Icon type="plus-circle" />
        </Button>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    cities: state.cities,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAddWidget: (cityId: string) => dispatch(actions.addWidget(cityId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWidget)
