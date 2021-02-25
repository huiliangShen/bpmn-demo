export default class CustomPalette {
    constructor(create, elementFactory, palette, translate) {
        console.log('侧栏', arguments)
        this.create = create
        this.elementFactory = elementFactory
        this.translate = translate
        // this.palette = palette
        // this.paltteList = Object.keys(palette._entries)

        palette.registerProvider(this)
    }

    getPaletteEntries(element) {
        const {
            create,
            elementFactory,
            translate
        } = this

        function createServiceTask(event) {
            const shape = elementFactory.createShape({type: 'bpmn:ServiceTask'})

            create.start(event, shape)
        }

        return {
             'create.cute-task': {
                group: 'activity',
                className: 'bpmn-icon-cute-task cute',
                title: translate('Create CuteTask'),
                action: {
                    dragstart: createServiceTask,
                    click: createServiceTask
                }
            }
        }
    }
}

CustomPalette.$inject = [
    'create',
    'elementFactory',
    'palette',
    'translate'
]
