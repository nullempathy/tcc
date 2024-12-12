import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Confia Primo</title>
        <link rel="icon" href="/favicon.ico" sizes="15x25" />
        
        {/* Script do Google Tradutor */}
        <script
          type="text/javascript"
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />

        {/* Div do Google Tradutor */}
        <div id="google_translate_element"></div>

        {/* Função de inicialização do tradutor */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en', // Idioma original da página (Inglês)
                  includedLanguages: 'pt', // Idioma disponível (Português)
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                }, 'google_translate_element');
              }
            `,
          }}
        />
      </body>
    </Html>
  );
}
