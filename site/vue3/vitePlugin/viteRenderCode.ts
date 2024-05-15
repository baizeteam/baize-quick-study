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
  return str?.replace(/[&<>'"`^~—•–?:$]/g, (tag) => htmlEntities[tag] || tag);
};

function viteRenderCode(): PluginOption {
  return {
    name: "vite-render-code",
    enforce: "pre",
    transform(code, id) {
      if (!/\.(tsx?|jsx?|less|vue)$/.test(id) || id.includes("node_modules")) {
        return null;
      }
      if (code.indexOf("<code-demo") !== -1) {
        const oldCode = escapeHtml(JSON.parse(JSON.stringify(code)));
        code = code.replace(
          /<\/script>/,
          `const codeData =\`${oldCode}\`; const codePath = \`${id}\`;` + "\n</script>",
        );
        code = code.replace("<code-demo", '<code-demo :codeData="codeData" :codePath="codePath"');
      }

      return code;
    },
  };
}
export default viteRenderCode;
