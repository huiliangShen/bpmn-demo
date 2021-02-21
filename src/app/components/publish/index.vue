<template>
  <Modal v-model="visible" title="Publish" :width="500">
    <template slot="footer">
      <a-button key="back" @click="handleCancel" :loading="loading">
        关闭
      </a-button>
      <a-button key="confirm" type="primary" @click="handleConfirm" :loading="loading">
        发布
      </a-button>
    </template>
    <a-form :form="form">
      <a-form-item label="name">
        <Input placeholder="deployment name"
               v-decorator="['deployment-name', { rules: [{ required: true, message: 'Please input deployment name!' }] }]"/>
      </a-form-item>
      <a-form-item label="">
        <Checkbox v-decorator="['enable-duplicate-filtering', {initialValue: 'Unchecked'}]">
          enable-duplicate-filtering
        </Checkbox>
        <tooltip placement="top">
          <template slot="title">
            <span>A flag indicating whether the process engine should perform duplicate checking for the deployment or not. This allows you to check if a deployment with the same name and the same resouces already exists and if true, not create a new deployment but instead return the existing deployment. The default value is false.</span>
          </template>
          <a-button size="small" shape="circle" icon="question"/>
        </tooltip>
      </a-form-item>
      <a-form-item label="tenant id">
        <Input placeholder="tenant id" v-decorator="['tenant-id']"/>
      </a-form-item>
      <a-form-item label="source">
        <Input placeholder="deployment-source" v-decorator="['deployment-source']"
               style="width: 85%;margin-right: 20px;"/>
        <tooltip placement="top">
          <template slot="title">
            <span>The source for the deployment to be created.</span>
          </template>
          <a-button size="small" shape="circle" icon="question"/>
        </tooltip>
      </a-form-item>
    </a-form>
  </Modal>
</template>

<script>
import {Modal, Input, Checkbox, Tooltip, message} from 'ant-design-vue'
import {createTask} from '@/service'

export default {
  name: 'index',
  data() {
    return {
      visible: false,
      xml: '',
      form: this.$form.createForm(this, {name: 'rule'}),
      loading: false
    }
  },
  methods: {
    showModal(str) {
      this.xml = str
      this.visible = true
      this.$nextTick(() => {
        this.form.resetFields()
        this.form.setFieldsValue({
          'enable-duplicate-filtering': false
        })
      })
    },
    handleCancel() {
      this.visible = false
    },
    handleConfirm() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          const formData = new FormData()
          Object.keys(values).forEach((key) => typeof values[key] !== 'undefined' && formData.set(key, values[key]))
          formData.set('data', this.combineFile(values['deployment-name']))
          createTask(formData)
              .then((res) => {
                console.log(res)
                this.loading = false
                this.visible = false
                message.success('publish successful')
                this.form.resetFields()
              })
              .catch((err) => {
                this.loading = false
                message.error(err)
              })
        }
      })
    },
    combineFile(name) {
      const blob = new Blob([this.xml])
      return new File([blob], `${name}.bpmn`)
    }
  },
  components: {
    Modal,
    Input,
    Checkbox,
    Tooltip
  }
}
</script>

<style scoped>

</style>
