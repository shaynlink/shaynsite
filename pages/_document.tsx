import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';

interface MyDocumentInitialProps extends DocumentInitialProps {
    lang: string;
}

class MyDocument extends Document<MyDocumentInitialProps> {
    static async getInitialProps(ctx: DocumentContext): Promise<MyDocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx);

        const lang = (
            Array.isArray(ctx.query.lng) ? ctx.query.lng[0] : ctx.query.lng
        )  ?? 'en';

        return { ...initialProps, lang: lang }
    }

    render() {
        return (
            <Html lang={this.props.lang}>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;
