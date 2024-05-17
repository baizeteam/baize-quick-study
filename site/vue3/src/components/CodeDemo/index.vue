<script setup lang="ts">
import "highlight.js/styles/atom-one-dark.min.css";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

const { codeData } = defineProps({
  codeData: {
    required: false,
    type: String,
  },
  codePath: {
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

const renderCode = unescapeHtml(codeData);
</script>

<template>
  <div class="code-domo">
    <div class="title">{{ codePath }}</div>
    <div class="content">
      <highlightjs language="tsx" :code="renderCode" />
    </div>
  </div>
</template>

<style scoped lang="less">
.code-domo {
  margin-top: 24px;
  .title {
    color: #888;
    margin-bottom: 4px;
  }

  .content {
    border-radius: 8px;
    overflow: hidden;
  }
}
</style>
