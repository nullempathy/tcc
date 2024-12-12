import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="15x25" />
        {/* Script do Google Tradutor carregado de forma assíncrona */}
        <script
          type="text/javascript"
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          async
        ></script>
        {/* Estilo para esconder a interface do Google Tradutor */}
        <style>
          {`
            /* Esconde o painel de idiomas */
            #google_translate_element {
              display: none !important;
            }
            /* Esconde o cabeçalho do Google Tradutor */
            .goog-te-banner-frame {
              display: none !important;
            }
            /* Esconde o iframe do Google Tradutor (se aparecer) */
            .goog-te-menu-frame {
              display: none !important;
            }
          `}
        </style>
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />

        {/* Div para o Google Tradutor */}
        <div id="google_translate_element"></div>

        {/* Função de inicialização do tradutor */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en', // Idioma original da página
                  includedLanguages: 'pt', // Idiomas disponíveis
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: true // Tradução automática assim que a página carregar
                }, 'google_translate_element');

                // Traduzir automaticamente para o português
                setTimeout(function() {
                  const translateFrame = document.querySelector('iframe.goog-te-menu-frame');
                  if (translateFrame) {
                    const iframeWindow = translateFrame.contentWindow;
                    iframeWindow.document.querySelector('span[text="Portuguese"]').click(); // Força a tradução para o português
                  }
                }, 1000); // Atraso de 1 segundo para garantir que a interface de tradução tenha sido carregada
              }
            `,
          }}
        />
      </body>
    </Html>
  );
}
