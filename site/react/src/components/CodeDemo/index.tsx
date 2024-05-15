import React, { useEffect } from "react";
import hljs from "highlight.js";
// import "highlight.js/styles/dark.css";
import "highlight.js/styles/atom-one-dark.min.css";
import "./index.module.less";

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

interface ICodeDemoProps {
  codeData?: string;
  codePath?: string;
  fileList?: string[];
  fileListCode?: {
    fileCode: string;
    filePath: string;
  }[];
}

function decodeEscapedCharacters(code) {
  // 替换转义字符 \n 为换行符
  code = code.replace(/\\n/g, "\n");
  code = code.replace(/\\r/g, "\r");
  // 替换 Unicode 转义字符 \uXXXX 为实际字符
  code = code.replace(/\\u([a-fA-F0-9]{4})/g, (_, group) => String.fromCharCode(parseInt(group, 16)));
  return unescapeHtml(code);
}

export function CodeDemoItem(props: ICodeDemoProps) {
  const { codeData, codePath } = props;
  const codeRef = React.useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (codeRef.current && codeData) {
      hljs.highlightElement(codeRef.current);
    }
  }, [codeData]);
  return (
    <div styleName="code-domo">
      <div styleName="title">{codePath}</div>
      <div styleName="content">
        <pre className="line-numbers">
          {codeData && (
            <code ref={codeRef} className="tsx">
              {decodeEscapedCharacters(codeData)}
            </code>
          )}
        </pre>
      </div>
    </div>
  );
}

export default function CodeDemo(props: ICodeDemoProps) {
  const { codeData, codePath, fileListCode } = props;
  return (
    <>
      {fileListCode?.map((item) => (
        <CodeDemoItem key={item.filePath} codeData={item.fileCode} codePath={item.filePath} />
      ))}
      <CodeDemoItem codeData={codeData} codePath={codePath} />
    </>
  );
}
