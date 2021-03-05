/* eslint-disable */
import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory'
import cmdHelper from 'bpmn-js-properties-panel/lib/helper/CmdHelper'

import {is, getBusinessObject} from 'bpmn-js/lib/util/ModelUtil'


export default function (group, element, bpmnFactory, translate) {

    var getValue = function (businessObject) {
        return function (element) {
            var documentations = businessObject && businessObject.get('testDocumentation'),
                text = (documentations && documentations.length > 0) ? documentations[0].text : '';

            return {testDocumentation: text};
        };
    };

    var setValue = function (businessObject) {
        return function (element, values) {
            var newObjectList = [];

            if (typeof values.testDocumentation !== 'undefined' && values.testDocumentation !== '') {
                newObjectList.push(bpmnFactory.create('bpmn:testDocumentation', {
                    text: values.testDocumentation
                }));
            }

            return cmdHelper.setList(element, businessObject, 'testDocumentation', newObjectList);
        };
    };

    // Element Documentation
    var elementDocuEntry = entryFactory.textBox(translate, {
        id: 'testDocumentation',
        label: translate('Test Documentation'),
        modelProperty: 'testDocumentation'
    });

    elementDocuEntry.set = setValue(getBusinessObject(element));

    elementDocuEntry.get = getValue(getBusinessObject(element));

    group.entries.push(elementDocuEntry);

/*

    var processRef;

    // Process Documentation when having a Collaboration Diagram
    if (is(element, 'bpmn:Participant')) {

        processRef = getBusinessObject(element).processRef;

        // do not show for collapsed Pools/Participants
        if (processRef) {
            var processDocuEntry = entryFactory.textBox(translate, {
                id: 'process-documentation',
                label: translate('Process Documentation'),
                modelProperty: 'documentation'
            });

            processDocuEntry.set = setValue(processRef);

            processDocuEntry.get = getValue(processRef);

            group.entries.push(processDocuEntry);
        }
    }
*/

};
