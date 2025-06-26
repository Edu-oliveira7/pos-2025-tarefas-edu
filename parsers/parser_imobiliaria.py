import json

with open("parsers/imobiliaria.json", "r", encoding="utf-8") as f:
    dados = json.load(f)


imoveis = dados["imobiliaria"]["imoveis"]


print("\n===== MENU DE IMÓVEIS =====")
for i, imovel in enumerate(imoveis):
    print(f"{i} - {imovel['descricao']}")
print("5 - Sair")


while True:
    opcao = input("\nDigite o ID do imóvel que deseja ver (ou '5' para sair): ").strip()

    if opcao.lower() == '5':
        print("Encerrando o programa.")
        break

    if opcao.isdigit():
        indice = int(opcao)

        if 0 <= indice < len(imoveis):
            imovel = imoveis[indice]

            print("\n=== DETALHES DO IMÓVEL ===")
            print(f"Descrição: {imovel['descricao']}")

            print("\nProprietário:")
            print(f"  Nome: {imovel['proprietario']['nome']}")
            print(f"  Telefones: {', '.join(imovel['proprietario']['telefones'])}")

            if "email" in imovel["proprietario"]:
                print(f"  Email: {imovel['proprietario']['email']}")
            elif "emails" in imovel["proprietario"]:
                print(f"  Emails: {', '.join(imovel['proprietario']['emails'])}")

            print("\nEndereço:")
            print(f"  Rua: {imovel['endereco']['rua']}")
            print(f"  Bairro: {imovel['endereco']['bairro']}")
            print(f"  Cidade: {imovel['endereco']['cidade']}")

            if "numero" in imovel["endereco"]:
                print(f"  Número: {imovel['endereco']['numero']}")

            print("\nCaracterísticas:")
            print(f"  Tamanho: {imovel['caracteristicas']['tamanho']}")
            print(f"  Quartos: {imovel['caracteristicas']['numQuartos']}")
            print(f"  Banheiros: {imovel['caracteristicas']['numBanheiros']}")

            print(f"\nValor: R$ {imovel['valor']}\n")
        else:
            print("ID inválido. Tente novamente.")
    else:
        print("Entrada inválida. Digite um número ou 'x' para sair.")
