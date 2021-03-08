/* eslint-disable */
import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory'
import cmdHelper from 'bpmn-js-properties-panel/lib/helper/CmdHelper'

export default function (element, bpmnFactory, options, translate) {

    var getImplementationType = options.getImplementationType,
        getBusinessObject = options.getBusinessObject;

    function isExternal(element) {
        return getImplementationType(element) === 'external';
    }

    const selectOptions = [
        {value: '1', name: translate('Class')},
        {value: '2', name: translate('Expression')},
        {value: '3', name: translate('Delegate')},
        {value: ''}
    ]

    var topicEntry = entryFactory.selectBox(translate, {
        id: 'externalTopic',
        label: translate('Topic'),
        selectOptions: selectOptions,
        modelProperty: 'externalTopic',

        get: function (element, node) {
            var bo = getBusinessObject(element);
            return {externalTopic: bo.get('camunda:topic')};
        },

        set: function (element, values, node) {
            var bo = getBusinessObject(element);
            return cmdHelper.updateBusinessObject(element, bo, {
                'camunda:topic': values.externalTopic
            });
        },

        validate: function (element, values, node) {
            return isExternal(element) && !values.externalTopic ? {externalTopic: translate('Must provide a value')} : {};
        },

        hidden: function (element, node) {
            return !isExternal(element);
        }

    });

    return [topicEntry];

};
