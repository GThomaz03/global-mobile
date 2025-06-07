# 🚨 Rota Segura - App de Segurança e Solidariedade Comunitária

O **Rota Segura** é um aplicativo mobile desenvolvido em **React Native + TypeScript** com o objetivo de promover a segurança, cooperação e solidariedade entre pessoas em situações de risco, por meio de um sistema de **mapeamento colaborativo, emergências, e rede de apoio**.

---

## 📱 Funcionalidades Principais

### 🧾 Conta de Usuário
- Criar conta e realizar login com validação.
- Atualizar dados pessoais via tela de perfil.
- Excluir conta.

### 🗺️ Mapa Interativo
- Visualização de **pontos seguros e inseguros**.
- Filtros aplicáveis por tipo de ponto.

### 🆘 Emergência
- Botão de alerta para envio de localização.

### 🤝 Rede Solidária
- Visualização de voluntários disponíveis para ajuda.
- Cadastro como voluntário.
- Contato direto com voluntários.

### 📰 Postagens Comunitárias
- Criar e visualizar posts da comunidade.
- Compartilhamento de alertas, avisos e ocorrências.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia              | Descrição                                 |
|-------------------------|---------------------------------------------|
| React Native + Expo     | Criação do app cross-platform               |
| TypeScript              | Tipagem estática para maior segurança       |
| React Navigation        | Navegação entre telas                       |
| Axios                   | Requisições HTTP para API REST              |
| AsyncStorage            | Armazenamento local (login persistente)     |
| react-native-maps       | Biblioteca para renderização de mapas interativos                |
| expo-location           | Acesso à localização do dispositivo em tempo real via GPS        |

---

## 📁 Estrutura de Pastas
```
ROTASEGURA/
├── assets/ # Imagens e ícones
├── components/ # Componentes reutilizáveis
│ ├── Button.tsx
│ ├── CardPessoa.tsx
│ ├── Filtro.tsx
│ └── Post.tsx
├── screens/ # Telas principais do app
│ ├── Cadastro.tsx
│ ├── CriarConta.tsx
│ ├── CriarPost.tsx
│ ├── Emergencia.tsx
│ ├── Home.tsx
│ ├── Login.tsx
│ ├── Mapa.tsx
│ ├── Perfil.tsx
│ └── RedeSolidaria.tsx
├── services/ # Comunicação com a API
│ ├── PontosService.ts
│ ├── PostService.ts
│ ├── UsuarioService.ts
│ └── VoluntarioService.ts
├── styles/ # Estilos globais
│ └── Colors.ts
├── types/ # Tipos e interfaces
│ └── types.ts
├── App.tsx # Arquivo principal
├── AppRoute.tsx # Definição de rotas
└── index.ts # Inicialização da aplicação
```

---

## 📲 Instalação e Execução

### Pré-requisitos

- Node.js
- Expo CLI (`npm install -g expo-cli`)
- Android Studio ou emulador iOS configurado

## Passos

### Clone o repositório
```
git clone https://github.com/GThomaz03/global-mobile.git
cd rotasegura
```

### Instale as dependências
```
npm install
```

### Inicie o servidor
```
npx expo start
```


## 🌐 Configuração da API

Os serviços estão configurados para acessar endpoints REST. Atualize a URL base em cada arquivo de serviço:

Exemplo (PostService.ts):
```
export const listarPosts = async () => {
  const response = await api.get<Post[]>("/Posts");
  return response;
}
```

# Endpoints esperados:
| Serviço     | Método | Endpoint        | Descrição                  |
| ----------- | ------ | --------------- | -------------------------- |
| Usuário     | GET    | `/usuarios/:id` | Buscar dados do usuário    |
| Usuário     | POST   | `/usuarios`     | Criar novo usuário         |
| Usuário     | PUT    | `/usuarios/:id` | Atualizar dados            |
| Usuário     | DELETE | `/usuarios/:id` | Deletar conta              |
| Pontos      | GET    | `/pontos`       | Listar pontos do mapa      |
| Postagens   | GET    | `/posts`        | Buscar posts da comunidade |
| Postagens   | POST   | `/posts`        | Criar novo post            |
| Voluntários | GET    | `/voluntarios`  | Listar rede solidária      |
| Voluntários | POST   | `/voluntarios`  | Cadastrar como voluntário  |


## 📸 Telas do App
| Tela                  | Descrição                               |
| --------------------- | --------------------------------------- |
| `Login`               | Tela de autenticação do usuário         |
| `CriarConta`          | Tela de registro                        |
| `Cadastro`            | Tela auxiliar para preencher dados      |
| `Home`                | Tela inicial com opções principais      |
| `Perfil`              | Visualização e edição de dados pessoais |
| `Mapa`                | Mapa com pontos de segurança/risco      |
| `Emergencia`          | Contatos e botão de emergência          |
| `RedeSolidaria`       | Lista de voluntários e contato direto   |
| `CriarPost`           | Tela para postar avisos/alertas         |
