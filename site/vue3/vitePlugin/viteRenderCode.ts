import { PluginOption } from "vite";
import { parse, compileTemplate } from "@vue/compiler-sfc";
import { readFileSync } from "fs";

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
  let _originalConfig;
  return {
    name: "vite-render-code",
    enforce: "pre",
    config(config) {
      _originalConfig = config;
    },
    transform(code, id) {
      if (!/\.(tsx?|jsx?|less|vue)$/.test(id) || id.includes("node_modules")) {
        return null;
      }
      if (code.indexOf("<code-demo") !== -1) {
        const { descriptor } = parse(code);
        const oldCode = escapeHtml(JSON.parse(JSON.stringify(code)));
        const template = compileTemplate({ source: descriptor.template.content, filename: id, id });

        let fileListProp = [];
        let fileListCode = [];
        template.ast.children.map((node: any) => {
          if (node?.tag === "code-demo") {
            node.props.map((prop: any) => {
              if (prop.rawName === ":fileList") {
                fileListProp = prop.exp.ast.elements.map((element: any) => element.value);
                for (let item of fileListProp) {
                  const curAlias = item.split("/")[0];
                  const filePath = item.replace(curAlias, _originalConfig.resolve.alias[curAlias]);
                  const fileCode = readFileSync(filePath, "utf-8");
                  fileListCode.push({
                    fileCode: escapeHtml(fileCode),
                    filePath: filePath,
                  });
                }
              }
            });
            return node;
          }
        });
        code = code.replace(
          /<\/script>/,
          `const codeData =\`${oldCode}\`; const codePath = \`${id}\`;` +
            `\n const fileCode = ${JSON.stringify(fileListCode)};` +
            "\n</script>",
        );
        code = code.replace("<code-demo", '<code-demo :codeData="codeData" :codePath="codePath" :fileCode="fileCode"');
      }

      return code;
    },
  };
}
export default viteRenderCode;
