
export type Usuario = {
  nome: string | null; // Nome pode ser nulo
  email?: string;
  id?: number ;
  senha?: string;
  cidade?: string;
  badge?: string; // Adicionando a propriedade badge
};


export type Post = {
  id?: number;
  tipo: string;
  localizacao: string;
  descricao: string;
  imagem: string;
};

export type RooteStackParamList = {
  Login: undefined;
  'Criar Conta': undefined;
  Cadastro: undefined;
  'Criar Post': undefined;
  Tabs: {
    screen: keyof RooteTabParamList; // indica que a propriedade "screen" deve ser uma chave do Tab Navigator
  };
};

export type RooteTabParamList = {
  Home: undefined;
  Mapa: undefined;
  Emergência: undefined;
  Abrigo: undefined;
  'Rede Solidaria': undefined;
  Perfil: undefined;
};

export type Voluntario = {
  id?: number;
  email?: string;
  telefone?: string;
  nome: string;
  cidade: string;
  imagem?: string;
  areaAtuacao: string;
};