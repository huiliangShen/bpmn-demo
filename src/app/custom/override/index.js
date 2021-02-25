import ContextPadProvider from './CustomContextPad'
import paletteProvider from './CustomPalette'
import ReplaceMenuProvider from './CustomBpmnReplace'

export default {
    contextPadProvider: ['type', ContextPadProvider],
    paletteProvider: ['type', paletteProvider],
    replaceMenuProvider: ['type', ReplaceMenuProvider]
}
