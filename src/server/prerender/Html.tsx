import * as React from 'react';
import Helmet from 'react-helmet';

interface InlineScript {
    position: "top" | "bottom",
    script: string;
}

export interface HtmlProps {
    styles?: string[];
    scripts?: string[];
    inlintScripts?: InlineScript[];
    markup: string;
}

export class Html extends React.Component<HtmlProps, {}> {

    getOrEmpty<T>(array: T[]): T[] {
        return array || [];
    }

    public render(): JSX.Element {

        const { markup, styles, scripts, inlintScripts } = this.props;

        const renderStyles = this.getOrEmpty(styles).map((styleRef, i) =>
            <link key={i} rel="stylesheet" type="text/css" href={styleRef} />
        );

        const renderScripts = this.getOrEmpty(scripts).map((scriptSrc, i) =>
            <script src={scriptSrc} key={i} charSet="utf-8"></script>
        );

        const renderTopInlineScripts = this.getOrEmpty(inlintScripts).filter(_ => _.position === "top").map((inline, i) =>
            <script key={i} type="text/javascript" dangerouslySetInnerHTML={{ __html: inline.script }} charSet="utf-8"></script>
        );

        const renderBottomInlineScripts = this.getOrEmpty(inlintScripts).filter(_ => _.position === "bottom").map((inline, i) =>
            <script key={i} type="text/javascript" dangerouslySetInnerHTML={{ __html: inline.script }} charSet="utf-8"></script>
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
                    {renderTopInlineScripts}
                    <main id="app" dangerouslySetInnerHTML={{ __html: markup }}></main>
                    {renderBottomInlineScripts}                    
                    {renderScripts}
                </body>
            </html>
        );
    }
}
