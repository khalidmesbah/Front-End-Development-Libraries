import { useState } from "react";
import ReactMarkdown from "react-markdown";
import defaultMarkdown from './assets/defaultMarkdown';

function App() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);

  return (
    <div className="markdown-previewer">
      <textarea
        id="editor"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      ></textarea>
      <div id="preview">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}

export default App;
