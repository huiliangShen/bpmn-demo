<template>
  <div class="home">
    <div class="home-container">
      <page-header
          :ghost="false"
          title="BPMN Project"
          sub-title="仅供测试用途"
          :backIcon="false"
      >
        <template slot="extra">
          <a-radio-group v-model="lang" button-style="solid" @change="langChange">
            <a-radio-button value="zh">
              中文
            </a-radio-button>
            <a-radio-button value="en">
              English
            </a-radio-button>
          </a-radio-group>
          <a-button key="2">
            back
          </a-button>
          <a-button key="1" type="primary" @click="goto">
            Add
          </a-button>
        </template>
      </page-header>
      <a-card style="width: 100%">
        <a-row :gutter="[16, 16]">
          <a-col class="gutter-row" :span="6" v-for="i in 10" :key="i">
            <div class="gutter-box">
              col-6
            </div>
          </a-col>
        </a-row>
      </a-card>
    </div>
  </div>
</template>

<script>
import {PageHeader} from 'ant-design-vue'

export default {
  components: {
    PageHeader
  },
  data() {
    return {
      lang: 'en'
    }
  },
  methods: {
    goto() {
      this.$router.push({path: '/detail/' + 1})
    },
    langChange(e) {
      this.lang = e.target.value
      localStorage.setItem('locale', e.target.value)
    }
  },
  created() {
    this.lang = localStorage.getItem('locale') || 'en'
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;

  .home-container {
    padding: 20px;

    .gutter-box {
      height: 200px;
      background: rgba(0, 0, 255, 0.26);
      border-radius: 15px;
    }
  }
}
</style>
