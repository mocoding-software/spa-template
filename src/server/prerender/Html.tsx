import * as React from "react";
import Helmet from "react-helmet";

interface InlineScript {
    position: "top" | "bottom";
    script: string;
}

export interface HtmlProps {
    styles?: string[];
    scripts?: string[];
    inlineScripts?: string[];
    markup: string;
    instrumentationKey: string;
}

export class Html extends React.Component<HtmlProps, {}> {
    public render(): JSX.Element {

        const { markup, styles, scripts, inlineScripts } = this.props;

        const renderStyles = this.getOrEmpty(styles).map((styleRef, i) =>
            <link key={i} rel="stylesheet" type="text/css" href={styleRef} />,
        );

        const renderScripts = this.getOrEmpty(scripts).map((scriptSrc, i) =>
            <script src={scriptSrc} key={i} charSet="utf-8" />,
        );

        const renderInlineScripts = this.getOrEmpty(inlineScripts).map((inlineScript, i) =>
            <script key={i} type="text/javascript" dangerouslySetInnerHTML={{ __html: inlineScript }} charSet="utf-8" />,
        );

        const helmet = Helmet.renderStatic();

        const htmlAttrs = helmet.htmlAttributes.toComponent();
        const bodyAttrs = helmet.bodyAttributes.toComponent();

        return (
            <html {...htmlAttrs}>
                <head>
                    {helmet.title.toComponent()}
                    {helmet.meta.toComponent()}
                    {helmet.link.toComponent()}
                    {renderStyles}
                </head>
                <body {...bodyAttrs}>
                    <main id="app" dangerouslySetInnerHTML={{ __html: markup }} />
                    {renderInlineScripts}
                    {renderScripts}
                </body>
            </html>
        );
    }

    private getOrEmpty<T>(array: T[]): T[] {
        return array || [];
    }
}
