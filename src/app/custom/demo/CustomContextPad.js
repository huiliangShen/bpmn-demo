export default class CustomContextPad {
    constructor(config, contextPad, create, elementFactory, injector, translate) {
        this.create = create
        this.elementFactory = elementFactory
        this.translate = translate

        if (config.autoPlace !== false) {
            this.autoPlace = injector.get('autoPlace', false)
        }

        contextPad.registerProvider(this)
    }

    getContextPadEntries(element) {
        const {
            autoPlace,
            create,
            elementFactory,
            translate
        } = this

        function appendServiceTask(event, element) {
            if (autoPlace) {
                const shape = elementFactory.createShape({type: 'bpmn:Task'})

                autoPlace.append(element, shape)
            } else {
                appendServiceTaskStart(event, element)
            }
        }

        function appendServiceTaskStart(event) {
            const shape = elementFactory.createShape({type: 'bpmn:Task'})

            create.start(event, shape, element)
        }

        return {
            'append.cute-task': {
                group: 'model',
                className: 'bpmn-icon-cute-task cute',
                title: translate('Append CuteTask'),
                action: {
                    click: appendServiceTask,
                    dragstart: appendServiceTaskStart
                }
            }
        }
    }
}

CustomContextPad.$inject = [
    'config',
    'contextPad',
    'create',
    'elementFactory',
    'injector',
    'translate'
]
