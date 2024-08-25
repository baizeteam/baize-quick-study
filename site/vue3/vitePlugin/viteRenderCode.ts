import type {Options, default as vuePlugin} from "@vitejs/plugin-vue";
import {
  compile,
  parse,
  RootNode,
  TemplateChildNode,
  ComponentNode,
  DirectiveNode,
  findProp,
  createSimpleExpression,
  NodeTypes,
} from '@vue/compiler-dom'
import { isStringLiteral, isArrayExpression, objectExpression, objectProperty, ObjectProperty, stringLiteral, arrayExpression} from '@babel/types'
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
  return str?.replace(/[&<>'"`^~—•–?:$]/g, (tag) => htmlEntities[tag] || tag) ?? '';
};

const findAllCodeNode = (ast: RootNode) => {
  const codeNodeList: ComponentNode[] = []
  type Node = RootNode | TemplateChildNode
  type Child<T> = T extends { children: Array<infer U> } ? U : never
  let list: Array<Node | Child<Node>> = [ast]
  while (list.length) {
    const node = list.shift()
    if (typeof node === 'object' && 'tag' in node &&  /^(CodeDemo|code-demo)$/.test(node.tag)) {
      codeNodeList.push(node as ComponentNode)
    }
    if (typeof node === 'object' && 'children' in node && node.children.length) {
      list = list.concat(...node.children)
    }
  }
  return codeNodeList;
}

const getFileListValue = (node: ComponentNode) => {
  const fileListProp = findProp(node, 'fileList', true) as DirectiveNode|undefined
  const fileListAST = fileListProp?.exp?.ast ?? null
  const fileListArrAST =
  fileListAST && isArrayExpression(fileListAST) ? fileListAST : null
  return fileListArrAST?.elements
      ?.filter?.((item) => isStringLiteral(item))
      ?.map?.((item) => item.value) ?? []
}

const createBindStrNode = (key: string, value: string): DirectiveNode => {
  return {
    type: NodeTypes.DIRECTIVE,
    name: 'bind',
    exp: createSimpleExpression(JSON.stringify(value)),
    arg: createSimpleExpression(key, true),
    modifiers: [],
    loc: {} as any
  }
}

const createBindNode = (key: string, value: Record<string, string>[]): DirectiveNode => {
  const arrNode = value.map(item => {
    const properties: ObjectProperty[] = []
    for (const key in item) {
      properties.push(objectProperty(stringLiteral(key), stringLiteral(item[key])))
    }
    return objectExpression(properties)
  })
  return {
    type: NodeTypes.DIRECTIVE,
    name: 'bind',
    exp: Object.assign(createSimpleExpression(JSON.stringify(value), false), {
      ast: arrayExpression(arrNode),
      // loc: null
    }),
    arg: createSimpleExpression(key, true),
    modifiers: [],
    loc: {} as any
  }
}
const addBindProp = (comp: ComponentNode, key: string, bind: DirectiveNode) => {
  const oldBind = findProp(comp, key, true) as DirectiveNode|undefined
  if (oldBind) {
    Object.assign(oldBind, bind)
  } else {
    comp.props.push(bind)
  }
}

function viteRenderCode(vue: typeof vuePlugin, options: Options = {}) {
  let _originalConfig;
  const vueP = vue({
    ...options,
    template: {
      compiler: {
          compile(source, options) {
            const currentPath = options.filename
            if (typeof source !== 'string' || /\/node_modules\//.test(currentPath) || !/(CodeDemo|code-demo)/.test(source)) {
              return compile(source, options)
            }
            const ast = parse(source, options)
            const codeNodeList = findAllCodeNode(ast)
            if (!codeNodeList.length) {
              return compile(ast, options)
            }
            const fileCode = readFileSync(currentPath, "utf-8");
            for (const item of codeNodeList) {
              const fileListArrValue = getFileListValue(item)
              const fileListCode = fileListArrValue.map(item => {
                const curAlias = item.split("/")[0];
                const filePath = item.replace(curAlias, _originalConfig.resolve.alias[curAlias]);
                const fileCode = readFileSync(filePath, "utf-8");
                return {
                  fileCode: escapeHtml(fileCode),
                  filePath: filePath,
                };
              })
              const directiveNode = createBindNode('fileCode', fileListCode)
              addBindProp(item, 'fileCode', directiveNode)

              const codePathNode = createBindStrNode('codePath', currentPath)
              addBindProp(item, 'codePath', codePathNode)

              const codeDataNode = createBindStrNode('codeData', escapeHtml(fileCode))
              addBindProp(item, 'codeData', codeDataNode)
            }
            return compile(ast, options)
          },
          parse,
      },
    }
  })
  const vuePConfig = vueP.config as Function
  return Object.assign(vueP, {
    config(config, ...args: unknown[]) {
      _originalConfig = config;
      return vuePConfig.call(vueP, config, ...args)
    }
  })
}
export default viteRenderCode;
