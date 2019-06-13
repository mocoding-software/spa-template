import { createServerRenderer, RenderResult } from "aspnet-prerendering";
import { createMemoryHistory } from "history";
import * as React from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import { App } from "../../app";
import { configureStore } from "../../app/store";

import { Html, HtmlProps } from "./Html";

export default createServerRenderer(params => {
    return new Promise<RenderResult>((resolve, reject) => {

        const history = createMemoryHistory();
        history.replace(params.location);
        const store = configureStore(createMemoryHistory());

        // const app = <App store={store} history={history} />;
        // renderToString(app);

        // TODO: implement redirect here.
        // If there's a redirection, just send this information back to the host application
        // if (routerContext.url) {
        //     resolve({ redirectUrl: routerContext.url });
        //     return;
        // }

        params.domainTasks.then(() => {

            const htmlProps: HtmlProps = { ...params.data, markup: "" };
            const state = store.getState();

            const inlineScript = "window.__STATE_CONTAINER__=" + JSON.stringify({
                state: JSON.stringify(state),
                instrumentationKey: htmlProps.instrumentationKey,
            });
            htmlProps.inlineScripts.push(inlineScript);

            const html = renderToStaticMarkup(<Html {...htmlProps} />);

            resolve({
                html,
            });
        }, reject); // Also propagate any errors back into the host application
    });
});
