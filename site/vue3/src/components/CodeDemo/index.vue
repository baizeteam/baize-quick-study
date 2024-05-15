<script setup lang="ts">
import { onMounted } from "vue";
import "highlight.js/styles/atom-one-dark.css";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

const { codeData } = defineProps({
  codeData: {
    required: false,
    type: String,
  },
});

const unHtmlEntities: { [key: string]: string } = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&#39;": "'",
  "&quot;": '"',
  "&grave;": "`",
  "&#94;": "^",
  "&#126;": "~",
  "&mdash;": "—",
  "&bull;": "•",
  "&ndash;": "–",
  "&#63;": "?",
  "&#58;": ":",
  "&#36;": "$",
};

const unescapeHtml = (str: string) => {
  return str?.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;|&grave;|&circ;|&tilde;|&mdash;|&bull;|&ndash;|&#63;|&#58;|&#36;/g,
    (tag) => unHtmlEntities[tag] || tag,
  );
};

onMounted(() => {
  let blocks = document.querySelectorAll("pre code");
  blocks.forEach((block) => {
    hljs.highlightBlock(block as HTMLElement);
  });
});

const renderCode = unescapeHtml(codeData);
</script>

<template>
  <div class="code-domo">
    <div style="font-weight: 600;">源码</div>
    <highlightjs language="js" :code="renderCode" />
  </div>
</template>

<style scoped lang="less">
.code-domo {
  margin-top: 24px;
  border-radius: 8px;
  overflow: hidden;
}
</style>
