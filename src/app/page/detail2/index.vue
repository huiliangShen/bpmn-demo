<template>
  <div class="detail">
    <div id="canvas"></div>
    <div class="properties-panel-parent" id="js-properties-panel"></div>
    <div class="detail-tool">
      <div class="detail-tool-preview">
        <input type="file" accept=".bpmn" @change="fileUpload($event)"/>
        从文件打开
      </div>
      <div class="detail-tool-preview" @click="previewXml()">预览</div>
    </div>
    <PreviewXml ref="previewXml"></PreviewXml>
  </div>
</template>

<script>
// import BpmnViewer from 'bpmn-js'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import minimapModule from 'diagram-js-minimap'
import propertiesPanelModule from 'bpmn-js-properties-panel'
// import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import propertiesProviderModule from '../../custom/provider'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json'
import {message} from 'ant-design-vue'
// import demo from '@/app/apply.bpmn'
import demo from '@/app/demo.bpmn'
// import customControlsModule from '@/app/custom/demo'

import PreviewXml from '@/app/components/previewXml'
// import CamundaPropertiesProvider from '../../custom/provider/CamundaPropertiesProvider'

export default {
  name: 'detail',
  data() {
    return {
      xml: '',
      file: null
    }
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
          // customControlsModule,
          propertiesProviderModule
        ],
        moddleExtensions: {
          camunda: camundaModdleDescriptor
        }
      })
      this.importXML(demo)
      console.log('view', this.viewer)
    },
    importXML(text) {
      this.viewer.importXML(text).then((result) => {
        // const {warnings} = result
        // message.success(result)
        this.viewer.get('canvas').zoom('fit-viewport')
        this.viewer.get('minimap').close()
        this.addModelerListener()
      }).catch((err) => {
        // const {warnings, message} = err
        message.error(err.warnings + err.message)
      })
    },
    fileUpload(e) {
      const {target} = e
      if (target.files.length === 0) {
        return false
      }
      const file = target.files[0]
      if (file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) === 'bpmn') {
        this.openBpmn(file)
      } else {
        message.warn('文件格式错误')
      }
    },
    openBpmn(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const xml = e.target.result
        this.importXML(xml)
      }

      reader.readAsText(file)
    },
    previewXml() {
      this.viewer.saveXML()
          .then((result) => {
            this.$refs.previewXml.showModal(result.xml)
          })
          .catch((err) => message.error(err))
    },
    addModelerListener() {
      // 监听 modeler
      const bpmnjs = this.viewer
      const that = this
      const events = ['shape.added', 'shape.move.end', 'shape.removed']
      events.forEach(function (event) {
        that.viewer.on(event, (e) => {
          const elementRegistry = bpmnjs.get('elementRegistry')
          const shape = e.element ? elementRegistry.get(e.element.id) : e.shape
          console.log(shape)
          if (event === 'shape.added') {
            console.log('新增了shape')
          } else if (event === 'shape.move.end') {
            console.log('移动了shape')
          } else if (event === 'shape.removed') {
            console.log('删除了shape')
          }
        })
      })

      this.viewer.on('commandStack.changed', () => {
        this.viewer.saveXML({format: true})
            .then(({xml}) => {
              console.log(xml)
            })
      })
    }
  },
  mounted() {
    this.init()
  },
  created() {
    this.viewer = null
  },
  components: {
    PreviewXml
  }
}
</script>

<style scoped lang="less">
.detail {
  position: relative;
  height: 100%;
  display: flex;

  .detail-tool {
    position: absolute;
    bottom: 20px;
    left: 20px;
    padding: 6px;
    background: #fafafa;
    border: solid 1px #cccccc;
    display: flex;

    .detail-tool-preview {
      position: relative;
      margin-right: 15px;

      input[type="file"] {
        position: absolute;
        width: 70px;
        top: 0;
        left: 0;
        opacity: 0;
        cursor: pointer;
      }
    }

    & > div {
      cursor: pointer;

      &:hover {
        color: cornflowerblue;
      }
    }
  }

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
