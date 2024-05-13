<script setup lang="ts">
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
  return str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;|&grave;|&circ;|&tilde;|&mdash;|&bull;|&ndash;|&#63;|&#58;|&#36;/g,
    (tag) => unHtmlEntities[tag] || tag,
  );
};

const renderCode = unescapeHtml(codeData);
</script>

<template>
  <div class="code-domo">
    <div>{{ renderCode }}</div>
  </div>
</template>

<style scoped lang="less">
.code-domo {
  white-space: pre-wrap;
  background: #000;
  color: #fff;
}
</style>
