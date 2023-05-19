// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

// Rendering HTML Structure
class MyDocument extends Document {

    render() {
        return (
            <Html>
                <Head>
                    {/* Metadata */}
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Minecraft Database</title>
                    <link rel="stylesheet" href="/css/styles.css" />
                </Head>
                <body>
                    <h1 className="title">MINECRAFT DATABASE</h1>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
