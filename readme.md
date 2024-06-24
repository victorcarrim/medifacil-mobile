# MediFácil Mobile


> O MediFácil é um sistema idealizado para facilitar a comunicação e gestão de medicamentos entre médicos e pacientes, oferecendo uma interface visual e acessível.
### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [] Desenvolvimento da funcionalidade de prontuarios de um paciente.
- [] Desevolvimento da integração com IA para auxilio ao profissional de saúde sobre o histórico médico de um paciente.
- [] Desenvolvimento da funcionalidade de familiares poderem acompanhar o tratamento de um paciente.

## 🗃 Repositórios Complementares

[MediFácil Frontend](https://github.com/victorcarrim/medifacil-frontend) - Repositório com o frontend da aplicação MediFácil

[MediFácil Backend](https://github.com/victorcarrim/medifacil-backend) - Repositório com o backend da aplicação MediFácil

Frontend disponível para acesso em: https://medifacil-frontend-two.vercel.app/

Backend disponível para consumo em: https://medifacil-backend.vercel.app/

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

Para executar o projeto é necessário baixar a instalar a Node.js , e o repositório medifacil-backend. Também é necessário que o Android Studio esteja instalado e o emulador já configurado (não possui restrição para qual versão do android será utilizado). Caso deseje rodar diretamente pelo dispositivo mobile, é necessário ter instalado o Expo Go, disponível para Android ou IOS. Após isso deve-se serguir os passos da seção abaixo.

Configurar os seguintes arquivos:

    - No aquivo login.jsx
        - Substituir a string presente na variavel handleLogin, na const response pela rota em que seu backend medifacil-backend esteja rodando, caso não queira utilizar nosso backend presente na nuvem.

    - No arquivo axiosConfig.js
        - Substituir a string presente no baseUrl pela rota em que seu backend medifacil-backend esteja rodando, caso não queira utilizar nosso backend presente na nuvem.

## 🚀 Rodando MediFácil

Para rodar o MediFácil, siga estas etapas:

1 - Acessar a pastar do projeto
```
cd medifacil-mobile/
```

2 - Instalar as dependências do projeto
```
npm install
```

3 - Rodar a aplicação
```
npx expo start
```

4.1 - Acessar via emulador android
```
1 - Estar com o emulador do android studio aberto.
2 - Digitar a no terminal em que o projeto estiver rodando.
3 - O expo realizada a instalação do Expo Go no emulador e irá abrir com a aplicação rodando logo depois.
```

4.2 - Acessar via Dispositivo Android
```
1 - Estar com o Expo Go instalado.
2 - Abrir o Expo Go, clicar no leitor de QR code e escanear o QR code que aparece no terminal em que o projeto estiver rodando.
3 - Esperar o build finalizar.
4 - Caso de algum erro no aplicativo e o indicativo do build não ter finalizado no terminal,
esperar esse build ser finalizado, voltar para tela inicial do expo e acessa a aplicação via a
lista de ultimas aplicação abertas no expo, que aparece logo abaixo do leito de QR Code.
```

4.3 - Acessar via Dispositivo IOS
```
1 - Estar com o Expo Go instalado.
2 - Abrir a camêra do IOS e escanear o QR code que aparece no terminal em que o projeto estiver rodando. O aplicativo do expo irá abrir com o build da aplicação sendo realizado.
3 - Esperar o build finalizar.
4 - Caso de algum erro no aplicativo e o indicativo do build não ter finalizado no terminal,
esperar esse build ser finalizado, voltar para tela inicial do expo e acessa a aplicação via a
lista de ultimas aplicação abertas no expo, que é a unica ná tela inicial.
```

## ☕ Usando MediFácil

Usuários criados ao iniciar a aplicação

```
Usuário admin:
    - Login: 00000000000
    - Senha: 12345
    
Usuário profissional de saude:
    - Login: 11111111111
    - Senha: 123456
```

Usuários pacientes para a utilização do aplicativo deverão ser criados (via app ou pelo web em pré cadastro) e ser cadastrado receitas.

Na pasta apk possui o aplicativo android conectado diretamente com nosso servidor na nuvem. Caso opte por usar ele possuimos um usuário paciente ja cadastrado (ou de cima tambem estão presentes).

```angular2html
- Login: 22222222222
- Senha: 12345
```

Acesso a aplicação web online: https://medifacil-frontend-two.vercel.app/

Acesso ao backend online: https://medifacil-backend.vercel.app/

## 💻 Funcionalidades presentes no aplicativo

- Login usuários:

    - Pela tela inicial, o usuário pode optar por realizar o login por cpf e senha, ou pelo QRCode que existe em sua receita.
  
    - O usuário tambem pode se cadastrar pelo botão de cadastre-se.

    - - Caso o cadastro do paciente tenha sido realizado no web pelo profissional de saude, a unica forma de se logar é via QRCode presente na receita. Após logado, na aba de perfil, haverá um botão informando que o usuário pode finalizar seu cadastro. Na tela de finalização, o usuário deve inserir o email e senha. Após a finalização desse cadastro, o usuário poderá começar a se logar com cpf e senha.

- Manter receitas:

    - O paciente tem em sua tela inicial todas as suas receitas ativas. Em cada receita, tem os medicamentos que deverão ser tomados, e um botão que sinaliza para o início do tratamento, onde o usuário paciente deve informar se foi tomado no momento em que clicou no botão ou anteriormente. Caso seja anteriormente, ele deverá informar a data e hora.

    - Com o início do tratamento do medicamento, o aplicativo mostra a data e hora de tomar a próxima dose, e três outros botões. O primeiro, se foi tomado na hora informada. O segundo, se foi tomado com atraso, onde deve informar a data e hora em que foi tomado. O terceiro é um botão de atualização da foto do medicamento, para o caso de não ter encontrado o especificado na receita e ter pego outro semelhante/genérico.

    - Ao final de cada tratamento, quando o usuário tomou todas as doses, a receita é finalizada automaticamente e deixa de estar disponível para o usuário pelo aplicativo.

    - Somente usuário do tipo cliente que pertence aquela receita pode iniciar um tratamento e registrar novas doses tomadas.


## 📫 Contribuindo para Medifácil

Para contribuir com MediFácil, siga estas etapas:

1. Bifurque este repositório.
2. Crie um branch: `git checkout -b <nome_branch>`.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
4. Envie para o branch original: `git push origin medifacil-mobile / <local>`
5. Crie a solicitação de pull.

Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## 🤝 Colaboradores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/victorcarrim" title="Github Victor">
        <img src="https://avatars.githubusercontent.com/u/89991160?v=4" width="100px;" alt="Foto do Victor Ferrari"/><br>
        <sub>
          <b>Victor Ferrari</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/mayspiek" title="Github Mayara Spieker Carvalho">
        <img src="https://avatars.githubusercontent.com/u/79992764?v=4" width="100px;" alt="Foto da Mayara Spieker Carvalho"/><br>
        <sub>
          <b>Mayara Spieker Carvalho</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/gabrielamarqs" title="Github Gabriela Marques dos Santos">
        <img src="https://avatars.githubusercontent.com/u/106118943?v=4" width="100px;" alt="Foto da Gabriela Marques dos Santos"/><br>
        <sub>
          <b>Gabriela Marques dos Santos</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#" title="">
        <img src="https://media-gru2-2.cdn.whatsapp.net/v/t61.24694-24/439076101_462422389479867_2862236630768755022_n.jpg?ccb=11-4&oh=01_Q5AaIFPWiIylvkt3PUfUs-xRG-SHcuPKj0NX8SR_EXP10BjE&oe=6685A66D&_nc_sid=e6ed6c&_nc_cat=100" width="100px;" alt="Foto da Larissa Gregorio Kaluck"/><br>
        <sub>
          <b>Larissa Gregório Klauck</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
