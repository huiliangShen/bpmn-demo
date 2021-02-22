<template>
  <Modal v-model="visible" title="XML Preview" :footer="null" :width="'80%'">
    <div v-text="xmlString"></div>
  </Modal>
</template>

<script>
import {Modal} from 'ant-design-vue'
export default {
  name: 'index',
  data() {
    return {
      visible: false,
      xmlString: ''
    }
  },
  methods: {
    showModal(str) {
      this.visible = true
      this.xmlString = str
      console.log(this.xmlString)
    },
    handleCancel() {
      this.visible = false
    }
  },
  components: {
    Modal
  }
}
</script>

<style scoped>

</style>
