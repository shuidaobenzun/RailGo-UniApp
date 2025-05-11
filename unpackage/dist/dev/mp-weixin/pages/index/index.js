"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "海内存知己，天涯若比邻。",
      visit: 0,
      query: 0
    };
  },
  mounted() {
    this.fetchTitle();
  },
  methods: {
    async fetchTitle() {
      try {
        const response = await common_vendor.axios.get("https://api.state.railgo.zenglingkun.cn/yiyan");
        this.title = response.data;
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:35", "Error fetching title:", error);
        this.title = "海内存知己，天涯若比邻。";
      }
    },
    async fetchTitle() {
      try {
        const add = await common_vendor.axios.get("https://api.state.railgo.zenglingkun.cn/visit");
        const response = await common_vendor.axios.get("https://api.state.railgo.zenglingkun.cn/state");
        this.visit = response.data.visits;
        this.query = response.data.queries;
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:46", "Error fetching title:", error);
        this.visit = 0;
        this.query = 0;
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  _easycom_uni_section2();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  _easycom_uni_section();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.visit),
    b: common_vendor.t($data.query),
    c: common_vendor.p({
      type: "line",
      title: $data.title,
      ["title-color"]: "black",
      titleFontSize: "18px"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
