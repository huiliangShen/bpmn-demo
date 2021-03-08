/* eslint-disable */
import ImplementationTypeHelper from 'bpmn-js-properties-panel/lib/helper/ImplementationTypeHelper'
import InputOutputHelper from 'bpmn-js-properties-panel/lib/helper/InputOutputHelper'
import {escapeHTML, triggerClickEvent} from 'bpmn-js-properties-panel/lib/Utils'

import implementationType from './implementationType'
import external from './extrnal'
import delegate from 'bpmn-js-properties-panel/lib/provider/camunda/parts/implementation/Delegate'
// import external from 'bpmn-js-properties-panel/lib/provider/camunda/parts/implementation/External'
import callable from 'bpmn-js-properties-panel/lib/provider/camunda/parts/implementation/Callable'
import resultVariable from 'bpmn-js-properties-panel/lib/provider/camunda/parts/implementation/ResultVariable'

import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory'

import {query as domQuery, closest as domClosest, classes as domClasses} from 'min-dom'

function getImplementationType(element) {
    return ImplementationTypeHelper.getImplementationType(element);
}

function getBusinessObject(element) {
    return ImplementationTypeHelper.getServiceTaskLikeBusinessObject(element);
}

function isDmnCapable(element) {
    return ImplementationTypeHelper.isDmnCapable(element);
}

function isExternalCapable(element) {
    return ImplementationTypeHelper.isExternalCapable(element);
}

function isServiceTaskLike(element) {
    return ImplementationTypeHelper.isServiceTaskLike(element);
}

export default function (group, element, bpmnFactory, translate) {

    if (!isServiceTaskLike(getBusinessObject(element))) {
        return;
    }

    var hasDmnSupport = isDmnCapable(element);
    var hasExternalSupport = isExternalCapable(getBusinessObject(element));

    // implementation type ////////////////////////////////////

    group.entries = group.entries.concat(implementationType(element, bpmnFactory, {
        getBusinessObject: getBusinessObject,
        getImplementationType: getImplementationType,
        hasDmnSupport: hasDmnSupport,
        hasExternalSupport: hasExternalSupport,
        hasServiceTaskLikeSupport: true
    }, translate));


    // delegate (class, expression, delegateExpression) //////////

    group.entries = group.entries.concat(delegate(element, bpmnFactory, {
        getBusinessObject: getBusinessObject,
        getImplementationType: getImplementationType
    }, translate));


    // result variable /////////////////////////////////////////

    group.entries = group.entries.concat(resultVariable(element, bpmnFactory, {
        getBusinessObject: getBusinessObject,
        getImplementationType: getImplementationType,
        hideResultVariable: function (element, node) {
            return getImplementationType(element) !== 'expression';
        }
    }, translate));

    // external //////////////////////////////////////////////////

    if (hasExternalSupport) {
        group.entries = group.entries.concat(external(element, bpmnFactory, {
            getBusinessObject: getBusinessObject,
            getImplementationType: getImplementationType
        }, translate));
    }


    // dmn ////////////////////////////////////////////////////////

    if (hasDmnSupport) {
        group.entries = group.entries.concat(callable(element, bpmnFactory, {
            getCallableType: getImplementationType
        }, translate));
    }


    // connector ////////////////////////////////////////////////

    var isConnector = function (element) {
        return getImplementationType(element) === 'connector';
    };

    group.entries.push(entryFactory.link(translate, {
        id: 'configureConnectorLink',
        buttonLabel: translate('Configure Connector'),
        handleClick: function (element, node, event) {

            var connectorTabEl = getTabNode(node, 'connector');

            if (connectorTabEl) {
                triggerClickEvent(connectorTabEl);
            }

            // suppress actual link click
            return false;
        },
        showLink: function (element, node) {
            var link = domQuery('a', node);
            link.textContent = '';

            domClasses(link).remove('bpp-error-message');

            if (isConnector(element)) {
                var connectorId = InputOutputHelper.getConnector(element).get('connectorId');
                if (connectorId) {
                    link.textContent = translate('Configure Connector');
                } else {
                    link.innerHTML = '<span class="bpp-icon-warning"></span> ' + escapeHTML(translate('Must configure Connector'));
                    domClasses(link).add('bpp-error-message');
                }

                return true;
            }

            return false;
        }
    }));

};


// helpers ///////////////////////////

function getTabNode(el, id) {
    var containerEl = domClosest(el, '.bpp-properties-panel');

    return domQuery('a[data-tab-target="' + id + '"]', containerEl);
}
