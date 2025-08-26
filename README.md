# Kokoro TTS Brave Addon

Um addon para o navegador Brave (ou qualquer navegador baseado em Chromium) que permite selecionar um texto em qualquer página web e reproduzir a fala gerada por um servidor local do Kokoro TTS (usando Kokoro-FastAPI).

## Funcionalidades

*   **Seleção de Texto**: Selecione qualquer texto em uma página web.
*   **Menu de Contexto**: Opção "Kokoro TTS" disponível ao clicar com o botão direito no texto selecionado.
*   **Integração com Kokoro-FastAPI**: Envia o texto selecionado para o seu servidor local Kokoro-FastAPI.
*   **Reprodução de Áudio**: Reproduz o áudio WAV gerado diretamente no navegador.
*   **Compatibilidade Manifest V3**: Utiliza um documento offscreen para reprodução de áudio, em conformidade com as políticas de Service Workers do Manifest V3.

## Pré-requisitos

Para usar este addon, você precisa ter o seguinte:

1.  **Navegador Brave** (ou Google Chrome, Microsoft Edge, etc.).
2.  **Servidor Kokoro-FastAPI em Execução**: Este addon se conecta a uma instância local do servidor [remsky/Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI) (Dockerized FastAPI wrapper para o modelo Kokoro TTS).

    ### Configuração do Kokoro-FastAPI

    Para configurar e executar o servidor Kokoro-FastAPI:

    a.  **Instale o Docker Desktop** se ainda não o tiver.
    b.  **Clone ou baixe** o repositório [remsky/Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI) para o seu computador.
    c.  Abra um terminal no diretório raiz do projeto `Kokoro-FastAPI`.
    d.  Construa a imagem Docker (isso pode levar alguns minutos na primeira vez):
        ```bash
        docker build -t kokoro-fastapi .
        ```
    e.  Execute o contêiner Docker. **Certifique-se de que a porta 8880 esteja livre**:
        ```bash
        docker run -p 8880:8000 --name kokoro-server kokoro-fastapi
        ```
    f.  Verifique se o servidor está funcionando acessando [http://localhost:8880/docs](http://localhost:8880/docs) no seu navegador. Você deve ver a documentação da API.

## Instalação do Addon

1.  **Baixe ou Clone este repositório** do addon para o seu computador.
2.  Abra o navegador Brave e vá para `brave://extensions/`.
3.  Ative o **"Modo Desenvolvedor"** (geralmente um botão de alternância no canto superior direito).
4.  Clique em **"Carregar sem compactação"** (Load unpacked).
5.  Selecione a pasta onde você baixou/clonou este repositório do addon (`Kokoro-addon`).

## Como Usar

1.  Certifique-se de que o **servidor Kokoro-FastAPI esteja em execução** (conforme as instruções acima, geralmente em `http://localhost:8880/`).
2.  Abra qualquer página da web no seu navegador Brave.
3.  **Selecione um trecho de texto** na página.
4.  Clique com o **botão direito** no texto selecionado.
5.  No menu de contexto, clique na opção **"Kokoro TTS"**.
6.  O addon enviará o texto para o seu servidor local, gerará o áudio e o reproduzirá.

## Configuração (Opcional)

Você pode ajustar algumas opções de áudio diretamente no arquivo `background.js`:

*   `voice`: Atualmente definido como `"pf_dora"`. Você pode mudar para qualquer voz suportada pelo seu servidor Kokoro-FastAPI.
*   `speed`: Atualmente definido como `1`. Você pode ajustar a velocidade da fala.
*   `response_format`: Atualmente `"wav"`. Você pode mudar para `"mp3"` se preferir (e se o servidor Kokoro-FastAPI o suportar).

## Resolução de Problemas

*   **"HTTP error! status: XXX"**: Certifique-se de que o servidor Kokoro-FastAPI está rodando e acessível na porta `8880` (`http://localhost:8880/docs`). Se o erro for `404`, verifique se o servidor está configurado corretamente.
*   **Addon não aparece ou não funciona**: Verifique a página `brave://extensions/`. Certifique-se de que o "Modo Desenvolvedor" está ativado, o addon está listado e não há erros (vermelhos) sob ele. Tente recarregá-lo (ícone de seta circular).
*   **Sem áudio**: Verifique o console das Ferramentas do Desenvolvedor (F12) para erros na aba `Console` do seu addon (clicando em `(Service Worker)` ou `offscreen.html`).

## Contribuição

Sinta-se à vontade para abrir issues ou pull requests neste repositório.

## Agradecimentos

*   [remsky/Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI) - O servidor FastAPI que faz a mágica do TTS.
*   O modelo base [Kokoro-TTS](https://huggingface.co/hexgrad/Kokoro-82M).
