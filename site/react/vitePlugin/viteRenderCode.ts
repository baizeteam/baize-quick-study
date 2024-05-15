import { join } from "path";
import { PluginOption } from "vite";
import { readFileSync } from "fs";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import t from "@babel/types";

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

const getReactComponentProps = ({ data, name }) => {
  return {
    type: "JSXAttribute",
    name: {
      type: "JSXIdentifier",
      name: name,
    },
    value: {
      type: "StringLiteral",
      value: data,
    },
  };
};

const addReactCompoentProps = ({ path, data, name }) => {
  const params = getReactComponentProps({
    data,
    name,
  });
  path.node.attributes.push(params);
};

function viteRenderCode(): PluginOption {
  let _originalConfig;
  let _resolvedConfig;
  let _basePath = join(process.cwd(), "..");
  return {
    name: "vite-render-code",
    enforce: "pre",
    configResolved(resolvedConfig) {
      _resolvedConfig = resolvedConfig;
    },
    config(config) {
      _originalConfig = config;
    },
    load(id) {
      if (id.endsWith(".tsx")) {
        const code = readFileSync(id, "utf-8");
        if (code.indexOf("<CodeDemo") !== -1 && id.indexOf("CodeDemo") === -1) {
          const ast = parse(code, {
            sourceType: "module",
            plugins: ["typescript", "jsx"],
          });
          const currentPath = id.replace(_basePath, "");
          traverse.default(ast, {
            JSXOpeningElement(path) {
              if (path.node.name.name === "CodeDemo") {
                // 将 code 作为 props 注入到 CodeDemo 组件中
                const codeProp = path.node.attributes.find((attr) => attr.name.name === "codeData");
                if (!codeProp) {
                  addReactCompoentProps({
                    path,
                    data: escapeHtml(code),
                    name: "codeData",
                  });
                  addReactCompoentProps({
                    path,
                    data: currentPath,
                    name: "codePath",
                  });
                }
                const fileListProp = path.node.attributes
                  .find((attr) => attr.name.name === "fileList")
                  ?.value.expression.elements.map((item) => item.value);
                if (fileListProp) {
                  const fileListCode = [];
                  for (let item of fileListProp) {
                    const curAlias = item.split("/")[0];
                    const filePath = item.replace(curAlias, _originalConfig.resolve.alias[curAlias]);
                    const fileCode = readFileSync(filePath, "utf-8");
                    fileListCode.push({
                      fileCode: escapeHtml(fileCode),
                      filePath: filePath.replace(_basePath, ""),
                    });
                  }
                  const astFileListCode = t.jsxAttribute(
                    t.jsxIdentifier("fileListCode"),
                    t.jsxExpressionContainer(
                      t.arrayExpression(
                        fileListCode.map((item) =>
                          t.objectExpression([
                            t.objectProperty(t.stringLiteral("fileCode"), t.stringLiteral(item.fileCode)),
                            t.objectProperty(t.stringLiteral("filePath"), t.stringLiteral(item.filePath)),
                          ]),
                        ),
                      ),
                    ),
                  );
                  path.node.attributes.push(astFileListCode);
                }
              }
            },
          });
          const { code: transformedCode } = generate.default(ast);
          return transformedCode;
        }
        return code;
      }
      return null;
    },
  };
}

export default viteRenderCode;
