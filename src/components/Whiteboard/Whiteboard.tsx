import React, { ChangeEvent, Component } from 'react'
import { connect } from 'react-redux'
import { forEach } from 'lodash'
import { IEvent } from 'fabric/fabric-impl'
import WhiteboardDrawingService from '../../services/Whiteboard/WhiteboardDrawingService'
import WhiteboardBrushService from '../../services/Whiteboard/WhiteboardBrushService'
import {
  selectors,
  actions,
  WhiteboardState,
  WhiteboardActions,
  WhiteboardActiveMenu
} from './Whiteboard.state'
import { MeetingWhiteboardDrawingsState } from '../../pages/Meeting/Meeting.state'
import { WhiteboardBrushColorObject } from '../WhiteboardBrushColor/WhiteboardBrushColor'
import WhiteboardCanvas from '../WhiteboardCanvas/WhiteboardCanvas'
import WhiteboardMenu from '../WhiteboardMenu/WhiteboardMenu'
import styles from './Whiteboard.module.scss'

export type WhiteboardDrawingAddHandle = (event: IEvent) => void

interface WhiteboardProps extends WhiteboardActions, WhiteboardState {
  drawings: MeetingWhiteboardDrawingsState
  handleCanvasClearClick: () => void
  handleDrawingAdd: WhiteboardDrawingAddHandle
}

class Whiteboard extends Component<WhiteboardProps> {
  whiteboardDrawingService: WhiteboardDrawingService
  whiteboardBrushService: WhiteboardBrushService

  constructor (props: WhiteboardProps) {
    super(props)
    this.whiteboardDrawingService = new WhiteboardDrawingService()
    this.whiteboardBrushService = new WhiteboardBrushService()
    this.handleCanvasClick = this.handleCanvasClick.bind(this)
    this.handleActiveMenuClick = this.handleActiveMenuClick.bind(this)
    this.handleBrushColorChange = this.handleBrushColorChange.bind(this)
    this.handleBrushSizeChange = this.handleBrushSizeChange.bind(this)
  }

  handleCanvasClick () {
    this.props.replaceActiveMenu(null)
  }

  handleActiveMenuClick (activeMenu: WhiteboardActiveMenu) {
    this.props.replaceActiveMenu(activeMenu)
  }

  handleAddDrawing () {
    this.whiteboardDrawingService.handleAdd(event => {
      this.props.handleDrawingAdd(event)
    })
  }

  handleBrushColorChange (color: WhiteboardBrushColorObject) {
    this.whiteboardBrushService.setColor(color.hex)
    this.props.replaceColor(color.hex)
  }

  handleBrushSizeChange (event: ChangeEvent) {
    const input = event.target as HTMLInputElement
    const size = input.value
    this.whiteboardBrushService.setSize(size)
    this.props.replaceSize(size)
  }

  syncDrawing () {
    const drawings = this.props.drawings
    forEach(drawings, drawing => {
      const isFromSocket: boolean = !drawing._set
      if (isFromSocket) {
        this.whiteboardDrawingService.parse(drawing, drawings => {
          this.whiteboardDrawingService.add(drawings)
        })
      } else {
        this.whiteboardDrawingService.add([drawing])
      }
    })
  }

  setPresets () {
    this.whiteboardBrushService.setSize(this.props.brushSize)
    this.whiteboardBrushService.setColor(this.props.brushColor)
  }

  componentDidMount () {
    this.handleAddDrawing()
    this.syncDrawing()
    this.setPresets()
  }

  render () {
    return (
      <div className={styles.whiteboard}>
        <WhiteboardCanvas
          handleClick={this.handleCanvasClick} />
        <WhiteboardMenu
          activeMenu={this.props.activeMenu}
          brushColor={this.props.brushColor}
          brushSize={this.props.brushSize}
          handleBrushColorChange={this.handleBrushColorChange}
          handleBrushSizeChange={this.handleBrushSizeChange}
          handleCanvasClearClick={this.props.handleCanvasClearClick}
          handleActiveMenuClick={this.handleActiveMenuClick} />
      </div>
    )
  }
}

export default connect(selectors, actions)(Whiteboard)
