/* eslint-disable */
import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory'
import cmdHelper from 'bpmn-js-properties-panel/lib/helper/CmdHelper'
import {is, getBusinessObject} from 'bpmn-js/lib/util/ModelUtil'

module.exports = function (group, element, translate) {
    // 判断是否是正常的bpmn对象
    var bo = getBusinessObject(element)

    if (!bo) {
        return
    }

    if (is(element, 'bpmn:Process') || is(element, 'bpmn:Participant') && bo.get('processRef')) {
        var versionTagEntry = entryFactory.textField(translate, {
            id: 'versionTag',
            label: translate('Version Tag'),
            modelProperty: 'versionTag'
        })

        // in participants we have to change the default behavior of set and get
        if (is(element, 'bpmn:Participant')) {
            versionTagEntry.get = function (element) {
                var processBo = bo.get('processRef')

                return {
                    versionTag: processBo.get('camunda:versionTag')
                }
            }

            versionTagEntry.set = function (element, values) {
                var processBo = bo.get('processRef')

                return cmdHelper.updateBusinessObject(element, processBo, {
                    'camunda:versionTag': values.versionTag || undefined
                })
            }
        }

        group.entries.push(versionTagEntry)

    }
}
