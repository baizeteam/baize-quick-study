import { PluginOption } from "vite";

const htmlEntities: { [key: string]: string } = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  '"': "&quot;",
  "`": "&grave;",
  "^": "&circ;",
  "~": "&tilde;",
  "—": "&mdash;",
  "•": "&bull;",
  "–": "&ndash;",
  "?": "&#63;",
  ":": "&#58;",
  $: "&#36;",
};

const escapeHtml = (str: string) => {
  return str.replace(/[&<>'"`^~—•–?:$]/g, (tag) => htmlEntities[tag] || tag);
};

function viteRenderCode(): PluginOption {
  return {
    name: "vite-render-code",
    enforce: "pre",
    transform(code, id) {
      if (!/\.(tsx?|jsx?|less|vue)$/.test(id) || id.includes("node_modules")) {
        return null;
      }
      const oldCode = escapeHtml(JSON.parse(JSON.stringify(code)));
      if (code.indexOf("<CodeDemo") !== -1) {
        code = code.replace(/<\/script>/, `const codeData =\`${oldCode}\`` + "\n</script>");
        code = code.replace(/\:codeData\=\"null\"/g, ':codeData="codeData"');
      }
      return code;
    },
  };
}
export default viteRenderCode;
