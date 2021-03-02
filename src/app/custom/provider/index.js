import CamundaPropertiesProvider from './CamundaPropertiesProvider'
import defaultProvider from 'bpmn-js-properties-panel/lib/provider/camunda'
// import CamundaPropertiesProvider from 'bpmn-js-properties-panel/lib/provider/camunda/CamundaPropertiesProvider'
delete defaultProvider.propertiesProvider
export default {
    ...defaultProvider,
    propertiesProvider: ['type', CamundaPropertiesProvider]
}
