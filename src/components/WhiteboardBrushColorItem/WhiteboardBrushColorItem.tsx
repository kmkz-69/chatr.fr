import React, { Component } from 'react'
import { WhiteboardBrushColorObject } from '../WhiteboardBrushColor/WhiteboardBrushColor'
import styles from './WhiteboardBrushColorItem.module.scss'

export type WhiteboardBrushColorItemChangeHandle = (color: WhiteboardBrushColorObject) => void

interface WhiteboardBrushColorItemProps {
  active: boolean
  color: WhiteboardBrushColorObject
  handleClick: WhiteboardBrushColorItemChangeHandle
}

export default class WhiteboardBrushColorItem extends Component<WhiteboardBrushColorItemProps> {
  constructor (props: WhiteboardBrushColorItemProps) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  get className () {
    const activeClass = this.props.active && styles.active
    return `${styles.whiteboardBrushColorItem} ${activeClass}`
  }

  get style () {
    return { background: this.props.color.hex }
  }

  handleClick () {
    this.props.handleClick(this.props.color)
  }

  render () {
    return (
      <div
        className={this.className}
        style={this.style}
        onClick={this.handleClick} />
    )
  }
}
