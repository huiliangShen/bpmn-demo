/* eslint-disable */
import {some} from 'min-dash'

/**
 * Is an element of the given BPMN type?
 *
 * @param  {djs.model.Base|ModdleElement} element
 * @param  {string} type
 *
 * @return {boolean}
 */
export function is(element, type) {
    var bo = (element && element.businessObject) || element

    return bo && (typeof bo.$instanceOf === 'function') && bo.$instanceOf(type)
}

export function isExpanded(element) {
    if (is(element, 'bpmn:CallActivity')) {
        return false
    }

    if (is(element, 'bpmn:SubProcess')) {
        return getBusinessObject(element).di && !!getBusinessObject(element).di.isExpanded
    }

    if (is(element, 'bpmn:Participant')) {
        return !!getBusinessObject(element).processRef
    }

    return true
}

export function isEventSubProcess(element) {
    return element && !!getBusinessObject(element).triggeredByEvent
}

/**
 * Return true if element has any of the given types.
 *
 * @param {djs.model.Base} element
 * @param {Array<string>} types
 *
 * @return {boolean}
 */
export function isAny(element, types) {
    return some(types, function (t) {
        return is(element, t)
    });
}

/**
 * Return the lane children of the given element.
 *
 * @param {djs.model.Shape} shape
 *
 * @return {Array<djs.model.Shape>}
 */
export function getChildLanes(shape) {
    return shape.children.filter(function (c) {
        return is(c, 'bpmn:Lane')
    });
}


/**
 * Return the business object for a given element.
 *
 * @param  {djs.model.Base|ModdleElement} element
 *
 * @return {ModdleElement}
 */
export function getBusinessObject(element) {
    return (element && element.businessObject) || element
}

/**
 * Returns true, if an element is from a different type
 * than a target definition. Takes into account the type,
 * event definition type and triggeredByEvent property.
 *
 * @param {djs.model.Base} element
 *
 * @return {boolean}
 */
export function isDifferentType(element) {

    return function(entry) {
        var target = entry.target;

        var businessObject = getBusinessObject(element),
            eventDefinition = businessObject.eventDefinitions && businessObject.eventDefinitions[0];

        var isTypeEqual = businessObject.$type === target.type;

        var isEventDefinitionEqual = (
            (eventDefinition && eventDefinition.$type) === target.eventDefinitionType
        );

        var isTriggeredByEventEqual = (
            businessObject.triggeredByEvent === target.triggeredByEvent
        );

        var isExpandedEqual = (
            target.isExpanded === undefined ||
            target.isExpanded === isExpanded(businessObject)
        );

        return !isTypeEqual || !isEventDefinitionEqual || !isTriggeredByEventEqual || !isExpandedEqual;
    };
}
