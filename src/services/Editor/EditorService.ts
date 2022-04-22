import Quill from 'quill';

export default class EditorService {
  private static instance: EditorService;
  private static editor: Quill;

  constructor() {
    if (!EditorService.instance) {
      EditorService.instance = this;
    }
    return EditorService.instance;
  }

  private getDelta(content: any) {
    return EditorService.editor.clipboard.convert(content);
  }

  private getContent() {
    return EditorService.editor.root.innerHTML;
  }

  get toolbarOptions() {
    return [
      ['bold', 'italic', 'underline'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link'],
    ];
  }

  get options() {
    return {
      modules: {
        toolbar: this.toolbarOptions,
        clipboard: {
          matchVisual: false,
        },
      },
      theme: 'snow',
    };
  }

  initialize(container: string) {
    EditorService.editor = new Quill(container, this.options);
  }

  setContent(content: string) {
    const delta = this.getDelta(content);
    EditorService.editor.setContents(delta, 'silent');
  }

  onContentChange(callback: (content: string) => void) {
    EditorService.editor.on('text-change', () => {
      const content = this.getContent();
      callback(content);
    });
  }
}
