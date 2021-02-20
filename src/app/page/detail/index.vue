<template>
    <div class="detail">
        <div id="canvas"></div>
        <div class="properties-panel-parent" id="js-properties-panel"></div>
    </div>
</template>

<script>
    // import BpmnViewer from 'bpmn-js'
    import BpmnModeler from 'bpmn-js/lib/Modeler'
    import minimapModule from 'diagram-js-minimap'
    import propertiesPanelModule from 'bpmn-js-properties-panel'
    import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
    import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json'
    import {message} from 'ant-design-vue'
    import demo from '@/app/apply.bpmn'
    import {customTranslate} from '@/i18n'

    export default {
        name: 'detail',
        data() {
            return {}
        },
        methods: {
            init() {
                this.viewer = new BpmnModeler({
                    container: '#canvas',
                    propertiesPanel: {
                        parent: '#js-properties-panel'
                    },
                    additionalModules: [
                        minimapModule,
                        propertiesPanelModule,
                        propertiesProviderModule,
                        {
                            translate: ['value', customTranslate]
                        }
                    ],
                    moddleExtensions: {
                        camunda: camundaModdleDescriptor
                    }
                })
                this.viewer.importXML(demo).then((result) => {
                    // const {warnings} = result
                    // message.success(result)
                    // this.viewer.get('canvas').zoom('fit-vie//wport')
                    this.viewer.get('minimap').close()
                    this.hiddenLogo()
                }).catch((err) => {
                    // const {warnings, message} = err
                    message.error(err.warnings + err.message)
                })
            },
            hiddenLogo() {
                const logo = document.querySelector('.bjs-powered-by')
                logo && (logo.style.display = 'none')
            }
        },
        mounted() {
            this.init()
        },
        created() {
            this.viewer = null
        }
    }
</script>

<style scoped lang="less">
    .detail {
        height: 100%;
        display: flex;

        #canvas {
            // height: 100%;
            width: 100%;
            background: #fff;
        }

        .properties-panel-parent {
            overflow: auto;
        }
    }
</style>
