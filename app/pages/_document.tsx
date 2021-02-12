import { Document, Html, DocumentHead, Main, BlitzScript /*DocumentContext*/ } from "blitz"

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }

  render() {
    return (
      <Html lang="en">
        <DocumentHead />
        <body className="bg-gray-800 font-sans leading-normal tracking-normal mt-12 text-white">
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
