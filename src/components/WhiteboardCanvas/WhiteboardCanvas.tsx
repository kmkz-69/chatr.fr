import { isPlatform } from '@ionic/react'
import React, { Component } from 'react'
import WhiteboardCanvasService from '../../services/Whiteboard/WhiteboardCanvasService'

interface WhiteboardCanvasProps {
  handleClick: () => void
}

export default class WhiteboardCanvas extends Component<WhiteboardCanvasProps> {
  whiteboardCanvasService: WhiteboardCanvasService

  constructor (props: WhiteboardCanvasProps) {
    super(props)
    this.whiteboardCanvasService = new WhiteboardCanvasService()
  }

  setDimensions () {
    const width = window.innerWidth
    const mobileHeight = (width / (16 / 9))
    const desktopHeight = window.innerHeight
    const height = isPlatform('mobile') ? mobileHeight : desktopHeight
    this.whiteboardCanvasService.setDimensions(width, height)
  }

  componentDidMount () {
    this.whiteboardCanvasService.initialize()
    this.setDimensions()
  }

  render () {
    return (
      <div
        onMouseDown={this.props.handleClick}
        onTouchStart={this.props.handleClick}>
        <canvas id="whiteboardCanvas" />
      </div>
    )
  }
}
