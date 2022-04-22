import React, { Component } from 'react'
import WhiteboardCanvasService, { WhiteboardCanvasZoom } from '../../services/Whiteboard/WhiteboardCanvasService'
import { WhiteboardActiveMenu } from '../Whiteboard/Whiteboard.state'
import { WhiteboardBrushColorItemChangeHandle } from '../WhiteboardBrushColorItem/WhiteboardBrushColorItem'
import { WhiteboardBrushSizeChangeHandle } from '../WhiteboardBrushSize/WhiteboardBrushSize'
import WhiteboardMenuItem, { WhiteboardMenuItemName } from '../WhiteboardMenuItem/WhiteboardMenuItem'
import WhiteboardMenuContent from '../WhiteboardMenuContent/WhiteboardMenuContent'
import styles from './WhiteboardMenu.module.scss'

export type WhiteboardActiveMenuHandleClick = (activeMenu: WhiteboardActiveMenu) => void

interface WhiteboardMenuProps {
  activeMenu: WhiteboardActiveMenu
  brushColor: string
  brushSize: string
  handleBrushColorChange: WhiteboardBrushColorItemChangeHandle
  handleBrushSizeChange: WhiteboardBrushSizeChangeHandle
  handleCanvasClearClick: () => void
  handleActiveMenuClick: WhiteboardActiveMenuHandleClick
}

export default class WhiteboardMenu extends Component<WhiteboardMenuProps> {
  whiteboardCanvasService: WhiteboardCanvasService

  static items: WhiteboardMenuItemName[] = ['color', 'size', 'zoomIn', 'zoomOut', 'clear']

  constructor (props: WhiteboardMenuProps) {
    super(props)
    this.whiteboardCanvasService = new WhiteboardCanvasService()
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  get menuItems () {
    return WhiteboardMenu.items.map(item =>
      <WhiteboardMenuItem
        name={item}
        handleClick={this.handleItemClick}
        key={item} />
    )
  }

  clearMenu () {
    this.props.handleActiveMenuClick(null)
  }

  replaceActiveMenu (menuItem: WhiteboardActiveMenu) {
    const isActive = (this.props.activeMenu === menuItem)
    if (isActive) this.clearMenu()
    else this.props.handleActiveMenuClick(menuItem)
  }

  zoomCanvas (type: WhiteboardCanvasZoom) {
    this.whiteboardCanvasService.zoom(type)
    this.clearMenu()
  }

  clearCanvas () {
    this.whiteboardCanvasService.clear()
    this.props.handleCanvasClearClick()
    this.clearMenu()
  }

  handleItemClick (menuItem: WhiteboardMenuItemName) {
    switch (menuItem) {
      case 'color':
        this.replaceActiveMenu('color')
        break
      case 'size':
        this.replaceActiveMenu('size')
        break
      case 'zoomIn':
        this.zoomCanvas('in')
        break
      case 'zoomOut':
        this.zoomCanvas('out')
        break
      case 'clear':
        this.clearCanvas()
        break
    }
  }

  render () {
    return (
      <div className={styles.whiteboardMenu}>
        {this.menuItems}
        <WhiteboardMenuContent
          active={this.props.activeMenu}
          brushColor={this.props.brushColor}
          brushSize={this.props.brushSize}
          handleBrushColorChange={this.props.handleBrushColorChange}
          handleBrushSizeChange={this.props.handleBrushSizeChange} />
      </div>
    )
  }
}
