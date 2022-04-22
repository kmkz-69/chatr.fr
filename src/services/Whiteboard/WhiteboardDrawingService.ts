import { fabric } from 'fabric';
import { findIndex, forEach } from 'lodash';
import {
  MeetingWhiteboardDrawingsState,
  MeetingWhiteboardDrawingState,
} from '../../pages/Meeting/Meeting.state';
import WhiteboardCanvasService from './WhiteboardCanvasService';

type DrawingParseCallback = (drawings: MeetingWhiteboardDrawingsState) => void;
type DrawingHandleAddCallback = (event: fabric.IEvent) => void;

export default class WhiteboardDrawingService {
  protected whiteboardCanvasService: WhiteboardCanvasService;

  constructor() {
    this.whiteboardCanvasService = new WhiteboardCanvasService();
  }

  get canvas() {
    return this.whiteboardCanvasService.getCanvas();
  }

  parse(
    drawing: MeetingWhiteboardDrawingState,
    callback: DrawingParseCallback,
  ) {
    const namespace = '';
    fabric.util.enlivenObjects([drawing], callback, namespace);
  }

  isExists(drawing: MeetingWhiteboardDrawingState) {
    const drawings = JSON.parse(JSON.stringify(this.getDrawings()));
    const isExists = findIndex(drawings, drawing) >= 0;
    return isExists;
  }

  add(drawings: MeetingWhiteboardDrawingsState) {
    forEach(drawings, (drawing) => this.canvas.add(drawing));
  }

  getDrawings(): MeetingWhiteboardDrawingsState {
    return this.canvas.getObjects();
  }

  handleAdd(callback: DrawingHandleAddCallback) {
    this.canvas.on('object:added', callback);
  }
}
