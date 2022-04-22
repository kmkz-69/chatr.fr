import React, { Component } from 'react'
import WhiteboardBrushService from '../../services/Whiteboard/WhiteboardBrushService'
import WhiteboardBrushColorItem, { WhiteboardBrushColorItemChangeHandle } from '../WhiteboardBrushColorItem/WhiteboardBrushColorItem'
import styles from './WhiteboardBrushColor.module.scss'

export interface WhiteboardBrushColorObject {
  name: string
  hex: string
}

interface WhiteboardBrushColorProps {
  color: string
  handleChange: WhiteboardBrushColorItemChangeHandle
}

export default class WhiteboardBrushColor extends Component<WhiteboardBrushColorProps> {
  static colors: WhiteboardBrushColorObject[] = [
    { name: 'black', hex: '#000000' },
    { name: 'brown', hex: '#795548' },
    { name: 'red', hex: '#D0021B' },
    { name: 'purple', hex: '#E040FB' },
    { name: 'blue', hex: '#03A9F4' },
    { name: 'green', hex: '#009688' },
    { name: 'lime', hex: '#8BC34A' },
    { name: 'yellow', hex: '#FFC107' },
    { name: 'gray', hex: '#9E9E9E' }
  ]

  whiteboardBrushService: WhiteboardBrushService

  constructor (props: WhiteboardBrushColorProps) {
    super(props)
    this.whiteboardBrushService = new WhiteboardBrushService()
  }

  isActiveColor (color: WhiteboardBrushColorObject) {
    return (color.hex === this.props.color)
  }

  get colors () {
    return WhiteboardBrushColor.colors.map(color =>
      <WhiteboardBrushColorItem
        color={color}
        active={this.isActiveColor(color)}
        handleClick={this.props.handleChange}
        key={color.name} />
    )
  }

  render () {
    return (
      <div className={styles.whiteboardBrushColor}>
        {this.colors}
      </div>
    )
  }
}
