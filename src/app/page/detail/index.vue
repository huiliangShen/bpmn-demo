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
      <div class="detail-tool-publish" @click="publish()">发布</div>
    </div>
    <PreviewXml ref="previewXml"></PreviewXml>
    <Publish ref="publish"></Publish>
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
// import demo from '@/app/apply.bpmn'
import demo from '@/app/demo.bpmn'
import {customTranslate} from '@/i18n'
// import customControlsModule from '@/app/custom/demo'

import PreviewXml from '@/app/components/previewXml'
import Publish from '@/app/components/publish'

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
          propertiesProviderModule,
          {
            translate: ['value', customTranslate]
          },
          // customControlsModule
        ],
        moddleExtensions: {
          camunda: camundaModdleDescriptor
        }
      })
      this.importXML(demo)
    },
    importXML(text) {
      this.viewer.importXML(text).then((result) => {
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
    publish() {
      this.viewer.saveXML({format: true})
          .then((result) => {
            this.xml = result.xml
            this.$refs.publish.showModal(result.xml)
          })
          .catch((err) => message.error(err))
    },
    publishProcess() {
      // createTask()
    }
  },
  mounted() {
    this.init()
  },
  created() {
    this.viewer = null
  },
  components: {
    PreviewXml,
    Publish
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
