/* eslint-disable */
import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory'
import cmdHelper from 'bpmn-js-properties-panel/lib/helper/CmdHelper'
import {is, getBusinessObject} from 'bpmn-js/lib/util/ModelUtil'

var DEFAULT_OPTIONS = []

function getVal() {
    return new Promise(resolve => {
        resolve([
            {value: 'class', name: translate('Java Class')},
            {value: 'expression', name: translate('Expression')},
            {value: 'delegateExpression', name: translate('Delegate Expression')},
            {value: ''}
        ])
    })
}

getVal().then(res => DEFAULT_OPTIONS = res)

export default function (group, element, translate) {

    var selectOptions = DEFAULT_OPTIONS.concat([]);
    // 判断是否是正常的bpmn对象
    var bo = getBusinessObject(element)

    if (!bo) {
        return
    }

    if (is(element, 'bpmn:Process') || is(element, 'bpmn:Participant') && bo.get('processRef')) {
        bo.get('processRef')
        var versionTagEntry = entryFactory.selectBox(translate, {
            id: 'customSelectTag',
            label: translate('Custom Select Tag'),
            modelProperty: 'customSelectTag',
            selectOptions: selectOptions,
            get: function (element) {
                // var processBo = bo.get('processRef')
                return {
                    customSelectTag: bo.get('camunda:customSelectTag') || ''
                }
            },
            set: function (element, values) {
                // var processBo = bo.get('processRef')
                return cmdHelper.updateBusinessObject(element, bo, {
                    'camunda:customSelectTag': values.customSelectTag || undefined
                })
            }
        })

        // in participants we have to change the default behavior of set and get
        /*if (is(element, 'bpmn:Participant')) {
            versionTagEntry.get = function (element) {
                var processBo = bo.get('processRef')
                console.error('customSelectTag', processBo.get('camunda:customSelectTag'))
                return {
                    customSelectTag: processBo.get('camunda:customSelectTag') || ''
                }
            }

            versionTagEntry.set = function (element, values) {
                var processBo = bo.get('processRef')

                return cmdHelper.updateBusinessObject(element, processBo, {
                    'camunda:customSelectTag': values.customSelectTag || undefined
                })
            }
        }
*/
        group.entries.push(versionTagEntry)

    }
}
