from users import UserAPI
import argparse
import json

api = UserAPI(base_url="https://jsonplaceholder.typicode.com/users")

parser = argparse.ArgumentParser(description="CLI para gerenciar usuários (JSONPlaceholder)")

parser.add_argument("action", choices=["list", "create", "read", "update", "delete"], help="Ação a realizar")
parser.add_argument("--id", help="ID do usuário")
parser.add_argument("--name", type=str, help="Nome do usuário (para create ou update)")
parser.add_argument("--email", type=str, help="Email do usuário (para create ou update)")
args = parser.parse_args()

if True:
    if args.action == "list":
        users = api.list()
        for user in users:
            print(f"{user['id']}: {user['name']} - {user['email']}")

    elif args.action == "read":
        if args.id is None:
            print("Erro: --id é necessário para ler um usuário.")
        else:
            user = api.read(args.id)
            print(user)

    elif args.action == "create":
        if not args.name or not args.email:
            print("Erro: --name e --email são obrigatórios para criar um usuário.")
        else:
            new_user = {"name": args.name, "email": args.email}
            user = api.create(new_user)
            print("Usuário criado com sucesso:", user)

    elif args.action == "update":
        if not args.id or not args.name or not args.email:
            print("Erro: --id, --name e --email são obrigatórios para atualizar um usuário.")
        else:
            updated_user = {"name": args.name, "email": args.email}
            user = api.update(args.id, updated_user)
            print("Usuário atualizado com sucesso:", user)

    elif args.action == "delete":
        if not args.id:
            print("Erro: --id é necessário para deletar um usuário.")
        else:
            result = api.delete(args.id)
            print(result)

else:
    print(f"Erro: {e}")