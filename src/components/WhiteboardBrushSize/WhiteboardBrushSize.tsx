import React, { ChangeEvent, Component } from 'react'
import WhiteboardBrushService from '../../services/Whiteboard/WhiteboardBrushService'
import styles from './WhiteboardBrushSize.module.scss'

export type WhiteboardBrushSizeChangeHandle = (event: ChangeEvent) => void

interface WhiteboardBrushSizeProps {
  size: string
  handleChange: WhiteboardBrushSizeChangeHandle
}

export default class WhiteboardBrushSize extends Component<WhiteboardBrushSizeProps> {
  whiteboardBrushService: WhiteboardBrushService

  constructor (props: WhiteboardBrushSizeProps) {
    super(props)
    this.whiteboardBrushService = new WhiteboardBrushService()
  }

  get size () {
    return `${this.props.size}x`
  }

  render () {
    return (
      <div className={styles.whiteboardBrushSize}>
        <div className={styles.size}>{this.size}</div>
        <input
          className={styles.sizeInput}
          type="range"
          min="1"
          max="10"
          value={this.props.size}
          onChange={this.props.handleChange} />
      </div>
    )
  }
}
