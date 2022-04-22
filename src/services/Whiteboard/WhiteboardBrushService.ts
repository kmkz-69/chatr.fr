import WhiteboardCanvasService from './WhiteboardCanvasService';

export default class WhiteboardBrushService {
  protected whiteboardCanvasService: WhiteboardCanvasService;

  constructor() {
    this.whiteboardCanvasService = new WhiteboardCanvasService();
  }

  private get brush() {
    return this.whiteboardCanvasService.getCanvas().freeDrawingBrush;
  }

  setColor(color: string) {
    this.brush.color = color;
  }

  setSize(size: string) {
    this.brush.width = parseInt(size, 10);
  }
}
