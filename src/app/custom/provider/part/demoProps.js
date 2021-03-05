/* eslint-disable */
import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory'
import cmdHelper from 'bpmn-js-properties-panel/lib/helper/CmdHelper'
import {is, getBusinessObject} from 'bpmn-js/lib/util/ModelUtil'

export default function (group, element, translate) {
    // 判断是否是正常的bpmn对象
    var bo = getBusinessObject(element)

    if (!bo) {
        return
    }

    if (is(element, 'bpmn:Process') || is(element, 'bpmn:Participant') && bo.get('processRef')) {
        var versionTagEntry = entryFactory.textField(translate, {
            id: 'customTag',
            label: translate('Custom Tag'),
            modelProperty: 'customTag'
        })

        // in participants we have to change the default behavior of set and get
        if (is(element, 'bpmn:Participant')) {
            versionTagEntry.get = function (element) {
                var processBo = bo.get('processRef')
                // console.log(processBo.get('camunda:customTag'))
                return {
                    customTag: processBo.get('camunda:customTag')
                }
            }

            versionTagEntry.set = function (element, values) {
                var processBo = bo.get('processRef')

                return cmdHelper.updateBusinessObject(element, processBo, {
                    'camunda:customTag': values.customTag || undefined
                })
            }
        }

        group.entries.push(versionTagEntry)

    }
}
