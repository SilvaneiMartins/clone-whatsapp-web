// Este código opcional é usado para registrar um trabalhador de serviço.
// register () não é chamado por padrão.

// Isso permite que o aplicativo seja carregado mais rapidamente nas visitas subseqüentes na produção e fornece
// recursos off-line. No entanto, isso também significa que os desenvolvedores (e usuários)
// verá apenas as atualizações implantadas nas visitas subseqüentes a uma página, depois de todas as
// as guias existentes abertas na página foram fechadas, pois o cache anterior
// os recursos são atualizados em segundo plano.

// Para saber mais sobre os benefícios deste modelo e instruções sobre como
// aceitar, ler https://bit.ly/CRA-PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 são considerados host local para IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
   // O construtor de URL está disponível em todos os navegadores que suportam SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Nosso técnico de serviço não funcionará se PUBLIC_URL estiver em uma origem diferente
      // em que nossa página é veiculada. Isso pode acontecer se uma CDN for usada para
      // serve ativos; consulte https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

       // Adicione algum log adicional ao localhost, apontando os desenvolvedores para o
      // técnico do serviço / documentação do PWA.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'Este aplicativo Web está sendo veiculado em cache primeiro por um serviço' +
              'trabalhador. Aprender mais.'
          );
        });
      } else {
        // Não é localhost. Basta registrar o trabalhador de serviço
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // Neste ponto, o conteúdo pré-cacheado atualizado foi buscado,
              // mas o trabalhador de serviço anterior ainda atenderá aos mais velhos
              // conteúdo até que todas as guias do cliente sejam fechadas.
              console.log(
                'Novo conteúdo está disponível e será usado quando todos' +
                  'guias para esta página estão fechadas.'
              );

              // Executa o callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
            // Neste momento, tudo foi precached.
            // É o momento perfeito para exibir um
            // "O conteúdo é armazenado em cache para uso offline." mensagem.
              console.log('O conteúdo é armazenado em cache para uso offline.');

              // Executa o callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Erro durante o registro do trabalhador de serviço:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
 // Verifique se o trabalhador do serviço pode ser encontrado. Se não conseguir recarregar a página.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then(response => {
      // Verifique se existe um trabalhador de serviço e que realmente estamos obtendo um arquivo JS.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // Nenhum trabalhador de serviço encontrado. Provavelmente um aplicativo diferente. Recarregue a página.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Trabalhador de serviço encontrado. Prossiga normalmente.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'Nenhuma conexão à Internet encontrada. O aplicativo está sendo executado no modo offline.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
}
