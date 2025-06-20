from xml.dom.minidom import parse

dom = parse("parsers/cardapio.xml")
cardapio = dom.documentElement

pratos = cardapio.getElementsByTagName("prato")
mapa_pratos = {}


print("\n=== MENU ===")
for prato in pratos:
    id_prato = prato.getAttribute("id").replace("p", "")
    nome = prato.getElementsByTagName("nome")[0].firstChild.nodeValue
    mapa_pratos[id_prato] = prato
    print(f"{id_prato} - {nome}")


escolha = input("\nDigite o id do prato para saber mais: ")

if escolha in mapa_pratos:
    prato = mapa_pratos[escolha]
    nome = prato.getElementsByTagName("nome")[0].firstChild.nodeValue
    descricao = prato.getElementsByTagName("descricao")[0].firstChild.nodeValue
    ingredientes = prato.getElementsByTagName("ingrediente")
    preco = prato.getElementsByTagName("preco")[0].firstChild.nodeValue
    calorias = prato.getElementsByTagName("calorias")[0].firstChild.nodeValue
    tempo = prato.getElementsByTagName("tempoPreparo")[0].firstChild.nodeValue

    print(f"\nNome: {nome}")
    print(f"Descrição: {descricao}")
    print("Ingredientes:")
    for ingrediente in ingredientes:
        print(f"{ingrediente.firstChild.nodeValue}")
    print(f"Preço: R${preco}")
    print(f"Calorias: {calorias}kcal")
    print(f"Tempo de preparo: {tempo}.")
else:
    print("ID inválido. Tente novamente.")
