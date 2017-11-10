import React, { Component } from 'react';
import { Image } from 'react-native';

export default class ImageWrapper extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { uri, width, height } = this.props;
    return (
      <Image source={{ uri }} style={{ width, height }}/>
    )
  }
}
