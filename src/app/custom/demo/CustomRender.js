import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer'

import {
    append as svgAppend,
    create as svgCreate
} from 'tiny-svg'

export default class CustomRender extends BaseRenderer {
    constructor(eventBus) {
        super(eventBus, 2000)
    }

    canRender(element) {
        // ignore labels
        return !element.labelTarget
    }

    drawShape(parent, shape) {
        // console.log(shape)
        if (shape.type === 'bpmn:Task') {
            // 核心函数就是绘制shape
            const catGfx = svgCreate('image', {
                x: 0,
                y: 0,
                width: shape.width,
                height: shape.height,
                href: 'https://raw.githubusercontent.com/bpmn-io/bpmn-js-nyan/master/docs/cat.gif'
            })

            svgAppend(parent, catGfx)
            return catGfx
        }
       return super.drawShape(parent, shape)
    }

    getShapePath(shape) {
        return super.getShapePath(shape)
    }
}

CustomRender.$inject = ['eventBus']
