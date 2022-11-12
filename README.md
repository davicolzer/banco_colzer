Projeto: Banco Colzer

Regras de negócio:

- Para abrir uma conta é necessário apenas o nome completo e CPF da pessoa, mas só é permitido uma conta por pessoa;
- Com essa conta é possível realizar transferências para outras contas e depositar;
- Não aceitamos valores negativos nas contas;
- Por questão de segurança cada transação de depósito não pode ser maior do que R$2.000;
- As transferências entre contas são gratuitas e ilimitadas;

### Pacotes/Programas necessários:

- Docker / Docker compose
- Node v14 ou maior

### Configurando projeto:

1. Crie um arquivo .env na raiz com as inforamções referente ao banco (sua preferencia) seguindo template abaixo:

```bash
# Prisma
DATABASE_URL="postgresql://<DB_USER>:<DB_PASSWORD>@localhost:<DB_PORT>/<DB_NAME>?schema=public"

# Docker
DB_PORT=<DB_PORT>
DB_USER=<DB_USER>
DB_PASSWORD=<DB_PASSWORD>
DB_NAME=<DB_NAME>

# Project
PROJECT_PORT=3333
PROJECT_PASSWORD_SALT=*Bcrypt Salt* (numero) 
PROJECT_JWD_SECRET=*Hash MD5*
```

1. Iniciando banco de dados com:
 `sudo docker compose up`
2. Instalando pacotes do Projeto:
`npm install`
3. Executando migrations
`npx prisma migrate dev`
4. Iniciar projeto
`npm run dev`

Executar os testes
`npm run test`

Visualizar Banco de Dados
`npx prisma studio`

### Na aplicação temos as seguintes rotas

- Criação de usuário
    - Rota: `/user/create`
    - Body:
    
    ```json
    {
    	"fullname": "Beltrano",
    	"cpf": "78302781649",
    	"password": "Teste#321"
    }
    ```
    
- Autenticação do usuário
    - Rota: `/auth/login`
    - Body:
    
    ```json
    {
    	"cpf": "",
    	"password": "Teste#321"
    }
    ```
    
- Tranferência de dinheiro
    - Rota: `/user/transfer`
    - Bearer Token: *Gerado após authenticação*
    - Body:
    
    ```json
    {
        "cpfTo": "",
        "value": 2050
    }
    ```
    
- Deposito de dinheiro
    - Rota:`/user/deposite`
    - Body:
    
    ```json
    {
        "cpf": "",
        "value": 2000
    }
    ```
    
- Saldo da conta (Precisa deToken JWT gerado pela autenticação para Bearer Token)
    - Rota: `/user/balance/`
    - Bearer Token: *Gerado após authenticação*
