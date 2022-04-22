import React, { Component } from 'react'
import { WhiteboardActiveMenu } from '../Whiteboard/Whiteboard.state'
import WhiteboardBrushColor from '../WhiteboardBrushColor/WhiteboardBrushColor'
import { WhiteboardBrushColorItemChangeHandle } from '../WhiteboardBrushColorItem/WhiteboardBrushColorItem'
import WhiteboardBrushSize, { WhiteboardBrushSizeChangeHandle } from '../WhiteboardBrushSize/WhiteboardBrushSize'
import styles from './WhiteboardMenuContent.module.scss'

interface WhiteboardMenuContentProps {
  active: WhiteboardActiveMenu
  brushColor: string
  brushSize: string
  handleBrushColorChange: WhiteboardBrushColorItemChangeHandle
  handleBrushSizeChange: WhiteboardBrushSizeChangeHandle
}

export default class WhiteboardMenuContent extends Component<WhiteboardMenuContentProps> {
  isActive (active: WhiteboardActiveMenu) {
    return (this.props.active === active)
  }

  get className () {
    const brushSizeWrapperClass = this.isActive('size') && styles.brushSizeWrapper
    return `${styles.whiteboardMenuContent} ${brushSizeWrapperClass}`
  }

  get whiteboardBrushColor () {
    return this.isActive('color') &&
      <WhiteboardBrushColor
        color={this.props.brushColor}
        handleChange={this.props.handleBrushColorChange} />
  }

  get whiteboardBrushSize () {
    return this.isActive('size') &&
      <WhiteboardBrushSize
        size={this.props.brushSize}
        handleChange={this.props.handleBrushSizeChange} />
  }

  render () {
    return this.props.active &&
      <div className={this.className}>
        { this.whiteboardBrushColor }
        { this.whiteboardBrushSize }
      </div>
  }
}
