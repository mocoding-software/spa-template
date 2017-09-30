import * as React from "react";

export class CodeSample extends React.Component {

    public markup = `<!-- HTML generated using hilite.me --><div style="background: #272822; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #66d9ef">import</span> <span style="color: #f92672">*</span> <span style="color: #66d9ef">as</span> <span style="color: #a6e22e">Redux</span> <span style="color: #a6e22e">from</span> <span style="color: #e6db74">&#39;redux&#39;</span><span style="color: #f8f8f2">;</span>
<span style="color: #66d9ef">import</span> <span style="color: #f8f8f2">{</span> <span style="color: #a6e22e">ApiClient</span><span style="color: #f8f8f2">,</span> <span style="color: #a6e22e">ExampleDto</span> <span style="color: #f8f8f2">}</span> <span style="color: #a6e22e">from</span> <span style="color: #e6db74">&#39;api&#39;</span><span style="color: #f8f8f2">;</span>
<span style="color: #66d9ef">import</span> <span style="color: #f8f8f2">{</span> <span style="color: #a6e22e">Automata</span><span style="color: #f8f8f2">,</span> <span style="color: #a6e22e">automataReducer</span> <span style="color: #f8f8f2">}</span> <span style="color: #a6e22e">from</span> <span style="color: #e6db74">&quot;redux-automata&quot;</span><span style="color: #f8f8f2">;</span>

<span style="color: #66d9ef">export</span> <span style="color: #66d9ef">interface</span> <span style="color: #a6e22e">IExampleApiState</span> <span style="color: #f8f8f2">{</span>
    <span style="color: #a6e22e">isFetching</span>: <span style="color: #66d9ef">boolean</span><span style="color: #f8f8f2">;</span>
    <span style="color: #a6e22e">data?</span>: <span style="color: #66d9ef">ExampleDto</span>
<span style="color: #f8f8f2">}</span>

<span style="color: #66d9ef">const</span> <span style="color: #a6e22e">automata</span> <span style="color: #f92672">=</span> <span style="color: #66d9ef">new</span> <span style="color: #a6e22e">Automata</span><span style="color: #f92672">&lt;</span><span style="color: #a6e22e">IExampleApiState</span><span style="color: #f92672">&gt;</span><span style="color: #f8f8f2">(</span><span style="color: #e6db74">&quot;Get Example API&quot;</span><span style="color: #f8f8f2">);</span>

<span style="color: #75715e">// States</span>
<span style="color: #66d9ef">const</span> <span style="color: #a6e22e">Idle</span> <span style="color: #f92672">=</span> <span style="color: #a6e22e">automata</span><span style="color: #f8f8f2">.</span><span style="color: #a6e22e">State</span><span style="color: #f8f8f2">(</span><span style="color: #e6db74">&quot;Idle&quot;</span><span style="color: #f8f8f2">,</span> <span style="color: #f8f8f2">()</span> <span style="color: #f92672">=&gt;</span> <span style="color: #f8f8f2">({</span> <span style="color: #a6e22e">isFetching</span>: <span style="color: #66d9ef">false</span> <span style="color: #f8f8f2">}))</span>
<span style="color: #66d9ef">const</span> <span style="color: #a6e22e">Fetching</span> <span style="color: #f92672">=</span> <span style="color: #a6e22e">automata</span><span style="color: #f8f8f2">.</span><span style="color: #a6e22e">State</span><span style="color: #f8f8f2">(</span><span style="color: #e6db74">&quot;Fetching&quot;</span><span style="color: #f8f8f2">,</span> <span style="color: #f8f8f2">()</span> <span style="color: #f92672">=&gt;</span> <span style="color: #f8f8f2">({</span> <span style="color: #a6e22e">isFetching</span>: <span style="color: #66d9ef">true</span> <span style="color: #f8f8f2">}));</span>
<span style="color: #66d9ef">const</span> <span style="color: #a6e22e">Fetched</span> <span style="color: #f92672">=</span> <span style="color: #a6e22e">automata</span><span style="color: #f8f8f2">.</span><span style="color: #a6e22e">State</span><span style="color: #f92672">&lt;</span><span style="color: #a6e22e">ExampleDto</span><span style="color: #f92672">&gt;</span><span style="color: #f8f8f2">(</span><span style="color: #e6db74">&quot;Fetched&quot;</span><span style="color: #f8f8f2">,</span> <span style="color: #f8f8f2">(</span><span style="color: #a6e22e">state</span><span style="color: #f8f8f2">,</span> <span style="color: #a6e22e">data</span><span style="color: #f8f8f2">)</span> <span style="color: #f92672">=&gt;</span> <span style="color: #f8f8f2">({</span> <span style="color: #a6e22e">isFetching</span>: <span style="color: #66d9ef">false</span><span style="color: #f8f8f2">,</span> <span style="color: #a6e22e">data</span> <span style="color: #f8f8f2">}));</span>

<span style="color: #75715e">// Actions</span>
<span style="color: #66d9ef">const</span> <span style="color: #a6e22e">Fetch</span> <span style="color: #f92672">=</span> <span style="color: #a6e22e">automata</span><span style="color: #f8f8f2">.</span><span style="color: #a6e22e">Action</span><span style="color: #f8f8f2">(</span><span style="color: #e6db74">&quot;Fetch&quot;</span><span style="color: #f8f8f2">);</span>
<span style="color: #66d9ef">const</span> <span style="color: #a6e22e">Receive</span> <span style="color: #f92672">=</span> <span style="color: #a6e22e">automata</span><span style="color: #f8f8f2">.</span><span style="color: #a6e22e">Action</span><span style="color: #f92672">&lt;</span><span style="color: #a6e22e">ExampleDto</span><span style="color: #f92672">&gt;</span><span style="color: #f8f8f2">(</span><span style="color: #e6db74">&quot;Receive&quot;</span><span style="color: #f8f8f2">);</span>
<span style="color: #66d9ef">const</span> <span style="color: #a6e22e">Refresh</span> <span style="color: #f92672">=</span> <span style="color: #a6e22e">automata</span><span style="color: #f8f8f2">.</span><span style="color: #a6e22e">Action</span><span style="color: #f8f8f2">(</span><span style="color: #e6db74">&quot;Refresh&quot;</span><span style="color: #f8f8f2">);</span>


<span style="color: #75715e">//transitions</span>
<span style="color: #66d9ef">function</span> <span style="color: #a6e22e">MakeApiCall</span> <span style="color: #f8f8f2">(</span><span style="color: #a6e22e">dispatch</span>: <span style="color: #66d9ef">Redux.Dispatch</span><span style="color: #f92672">&lt;</span><span style="color: #a6e22e">any</span><span style="color: #f92672">&gt;</span><span style="color: #f8f8f2">)</span> <span style="color: #f8f8f2">{</span>
    <span style="color: #66d9ef">var</span> <span style="color: #a6e22e">client</span> <span style="color: #f92672">=</span> <span style="color: #66d9ef">new</span> <span style="color: #a6e22e">ApiClient</span><span style="color: #f8f8f2">();</span>
    <span style="color: #a6e22e">client</span><span style="color: #f8f8f2">.</span><span style="color: #a6e22e">serverTimeGet</span><span style="color: #f8f8f2">().</span><span style="color: #a6e22e">then</span><span style="color: #f8f8f2">((</span><span style="color: #a6e22e">data</span><span style="color: #f8f8f2">)</span><span style="color: #f92672">=&gt;</span> <span style="color: #f8f8f2">{</span>
        <span style="color: #a6e22e">console</span><span style="color: #f8f8f2">.</span><span style="color: #a6e22e">log</span><span style="color: #f8f8f2">(</span><span style="color: #e6db74">&quot;received:&quot;</span> <span style="color: #f92672">+</span><span style="color: #a6e22e">JSON</span><span style="color: #f8f8f2">.</span><span style="color: #a6e22e">stringify</span><span style="color: #f8f8f2">(</span><span style="color: #a6e22e">data</span><span style="color: #f8f8f2">));</span>
        <span style="color: #a6e22e">dispatch</span><span style="color: #f8f8f2">(</span><span style="color: #a6e22e">Receive</span><span style="color: #f8f8f2">(</span><span style="color: #a6e22e">data</span><span style="color: #f8f8f2">))</span>
    <span style="color: #f8f8f2">});</span>
<span style="color: #f8f8f2">}</span>

<span style="color: #a6e22e">automata</span>
    <span style="color: #f8f8f2">.</span><span style="color: #a6e22e">In</span><span style="color: #f8f8f2">(</span><span style="color: #a6e22e">Idle</span><span style="color: #f8f8f2">)</span>
        <span style="color: #f8f8f2">.</span><span style="color: #a6e22e">On</span><span style="color: #f8f8f2">(</span><span style="color: #a6e22e">Fetch</span><span style="color: #f8f8f2">)</span>
            <span style="color: #f8f8f2">.</span><span style="color: #a6e22e">Execute</span><span style="color: #f8f8f2">(</span><span style="color: #a6e22e">MakeApiCall</span><span style="color: #f8f8f2">)</span>
            <span style="color: #f8f8f2">.</span><span style="color: #a6e22e">GoTo</span><span style="color: #f8f8f2">(</span><span style="color: #a6e22e">Fetching</span><span style="color: #f8f8f2">)</span>
    <span style="color: #f8f8f2">.</span><span style="color: #a6e22e">In</span><span style="color: #f8f8f2">(</span><span style="color: #a6e22e">Fetching</span><span style="color: #f8f8f2">)</span>
        <span style="color: #f8f8f2">.</span><span style="color: #a6e22e">On</span><span style="color: #f8f8f2">(</span><span style="color: #a6e22e">Receive</span><span style="color: #f8f8f2">)</span>
            <span style="color: #f8f8f2">.</span><span style="color: #a6e22e">GoTo</span><span style="color: #f8f8f2">(</span><span style="color: #a6e22e">Fetched</span><span style="color: #f8f8f2">)</span>
    <span style="color: #f8f8f2">.</span><span style="color: #a6e22e">In</span><span style="color: #f8f8f2">(</span><span style="color: #a6e22e">Fetched</span><span style="color: #f8f8f2">)</span>
        <span style="color: #f8f8f2">.</span><span style="color: #a6e22e">On</span><span style="color: #f8f8f2">(</span><span style="color: #a6e22e">Refresh</span><span style="color: #f8f8f2">)</span>
            <span style="color: #f8f8f2">.</span><span style="color: #a6e22e">Execute</span><span style="color: #f8f8f2">(</span><span style="color: #a6e22e">MakeApiCall</span><span style="color: #f8f8f2">)</span>
            <span style="color: #f8f8f2">.</span><span style="color: #a6e22e">GoTo</span><span style="color: #f8f8f2">(</span><span style="color: #a6e22e">Fetching</span><span style="color: #f8f8f2">)</span>

<span style="color: #a6e22e">automata</span><span style="color: #f8f8f2">.</span><span style="color: #a6e22e">BeginWith</span><span style="color: #f8f8f2">(</span><span style="color: #a6e22e">Idle</span><span style="color: #f8f8f2">);</span>

<span style="color: #66d9ef">const</span> <span style="color: #a6e22e">exampleApiReducer</span> <span style="color: #f92672">=</span> <span style="color: #a6e22e">automataReducer</span><span style="color: #f8f8f2">(</span><span style="color: #a6e22e">automata</span><span style="color: #f8f8f2">);</span>

<span style="color: #66d9ef">const</span> <span style="color: #a6e22e">GetServerTime</span> <span style="color: #f92672">=</span> <span style="color: #a6e22e">Fetch</span><span style="color: #f8f8f2">({});</span>
<span style="color: #66d9ef">const</span> <span style="color: #a6e22e">RefreshServerTime</span> <span style="color: #f92672">=</span> <span style="color: #a6e22e">Refresh</span><span style="color: #f8f8f2">({});</span>

<span style="color: #66d9ef">export</span> <span style="color: #f8f8f2">{</span>
    <span style="color: #a6e22e">exampleApiReducer</span><span style="color: #f8f8f2">,</span>
    <span style="color: #a6e22e">GetServerTime</span><span style="color: #f8f8f2">,</span>
    <span style="color: #a6e22e">RefreshServerTime</span>
<span style="color: #f8f8f2">}</span>
</pre></div>`;
    public render(): JSX.Element {
        return (
            <div dangerouslySetInnerHTML={{ __html: this.markup }} />
        );
    }
}
