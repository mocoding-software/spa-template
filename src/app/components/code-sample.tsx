import * as React from "react";

export class CodeSample extends React.Component {
  public markup = `<!-- HTML generated using hilite.me --><div style="background: #272822; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%">
  <span style="color: #66d9ef">import</span> <span style="color: #f8f8f2">{</span> <span style="color: #a6e22e">ApiClient</span><span style="color: #f8f8f2">,</span> <span style="color: #a6e22e">ExampleDto</span> <span style="color: #f8f8f2">}</span> <span style="color: #a6e22e">from</span> <span style="color: #e6db74">&quot;api&quot;</span><span style="color: #f8f8f2">;</span>
  <span style="color: #66d9ef">import</span> <span style="color: #f8f8f2">{</span> <span style="color: #a6e22e">createTaskAutomation</span><span style="color: #f8f8f2">,</span> <span style="color: #a6e22e">TaskState</span> <span style="color: #f8f8f2">}</span> <span style="color: #a6e22e">from</span> <span style="color: #e6db74">&quot;redux-automata&quot;</span><span style="color: #f8f8f2">;</span>
  
  <span style="color: #66d9ef">export</span> <span style="color: #a6e22e">type</span> <span style="color: #a6e22e">ExampleApiState</span> <span style="color: #f92672">=</span> <span style="color: #a6e22e">TaskState</span><span style="color: #f92672">&lt;</span><span style="color: #a6e22e">ExampleDto</span><span style="color: #f92672">&gt;</span><span style="color: #f8f8f2">;</span>
  
  <span style="color: #66d9ef">function</span> <span style="color: #a6e22e">getServerTime</span><span style="color: #f8f8f2">()</span><span style="color: #f92672">:</span> <span style="color: #a6e22e">Promise</span><span style="color: #f92672">&lt;</span><span style="color: #a6e22e">ExampleDto</span><span style="color: #f92672">&gt;</span> <span style="color: #f8f8f2">{</span>
    <span style="color: #66d9ef">const</span> <span style="color: #a6e22e">api</span> <span style="color: #f92672">=</span> <span style="color: #66d9ef">new</span> <span style="color: #a6e22e">ApiClient</span><span style="color: #f8f8f2">();</span>
    <span style="color: #66d9ef">return</span> <span style="color: #a6e22e">api</span><span style="color: #f8f8f2">.</span><span style="color: #a6e22e">serverTime</span><span style="color: #f8f8f2">();</span>
  <span style="color: #f8f8f2">}</span>
  
  <span style="color: #66d9ef">const</span> <span style="color: #a6e22e">automation</span> <span style="color: #f92672">=</span> <span style="color: #a6e22e">createTaskAutomation</span><span style="color: #f92672">&lt;</span><span style="color: #a6e22e">ExampleDto</span><span style="color: #f92672">&gt;</span><span style="color: #f8f8f2">(</span><span style="color: #e6db74">&quot;Get Data&quot;</span><span style="color: #f8f8f2">,</span> <span style="color: #a6e22e">getServerTime</span><span style="color: #f8f8f2">);</span>
  
  <span style="color: #66d9ef">const</span> <span style="color: #a6e22e">GetServerTime</span> <span style="color: #f92672">=</span> <span style="color: #a6e22e">automation</span><span style="color: #f8f8f2">.</span><span style="color: #a6e22e">start</span><span style="color: #f8f8f2">;</span>
  <span style="color: #66d9ef">const</span> <span style="color: #a6e22e">RefreshServerTime</span> <span style="color: #f92672">=</span> <span style="color: #a6e22e">automation</span><span style="color: #f8f8f2">.</span><span style="color: #a6e22e">restart</span><span style="color: #f8f8f2">;</span>
  <span style="color: #66d9ef">const</span> <span style="color: #a6e22e">exampleApiReducer</span> <span style="color: #f92672">=</span> <span style="color: #a6e22e">automation</span><span style="color: #f8f8f2">.</span><span style="color: #a6e22e">reducer</span><span style="color: #f8f8f2">;</span>
  
  <span style="color: #66d9ef">export</span> <span style="color: #f8f8f2">{</span> <span style="color: #a6e22e">exampleApiReducer</span><span style="color: #f8f8f2">,</span> <span style="color: #a6e22e">GetServerTime</span><span style="color: #f8f8f2">,</span> <span style="color: #a6e22e">RefreshServerTime</span> <span style="color: #f8f8f2">};</span>
  </pre></div>
  `;

  public render(): JSX.Element {
    return <div dangerouslySetInnerHTML={{ __html: this.markup }} />;
  }
}
