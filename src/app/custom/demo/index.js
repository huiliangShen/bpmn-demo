import CustomContextPad from './CustomContextPad'
import CustomPalette from './CustomPalette'
import CustomRender from './CustomRender'

export default {
    __init__: ['customContextPad', 'customPalette', 'customRenderer'],
    customContextPad: ['type', CustomContextPad],
    customPalette: ['type', CustomPalette],
    customRenderer: ['type', CustomRender]
}
