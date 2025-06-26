import json
from xml.dom.minidom import parse


dom = parse("parsers/imobiliaria.xml")
raiz = dom.documentElement

lista_imoveis = []

imoveis = raiz.getElementsByTagName("imovel")

for imovel in imoveis:
    
    descricao = imovel.getElementsByTagName("descricao")[0].firstChild.nodeValue

    
    proprietario_tag = imovel.getElementsByTagName("proprietario")[0]
    nome = proprietario_tag.getElementsByTagName("nome")[0].firstChild.nodeValue

    
    telefones = []
    for tel in proprietario_tag.getElementsByTagName("telefone"):
        telefones.append(tel.firstChild.nodeValue)

    
    emails = []
    for email in proprietario_tag.getElementsByTagName("email"):
        emails.append(email.firstChild.nodeValue)

    proprietario = {
        "nome": nome,
        "telefones": telefones
    }

    if len(emails) == 1:
        proprietario["email"] = emails[0]
    elif len(emails) > 1:
        proprietario["emails"] = emails

    endereco_tag = imovel.getElementsByTagName("endereco")[0]
    rua = endereco_tag.getElementsByTagName("rua")[0].firstChild.nodeValue
    bairro = endereco_tag.getElementsByTagName("bairro")[0].firstChild.nodeValue
    cidade = endereco_tag.getElementsByTagName("cidade")[0].firstChild.nodeValue

    endereco = {
        "rua": rua,
        "bairro": bairro,
        "cidade": cidade
    }

    numero_tag = endereco_tag.getElementsByTagName("numero")
    if numero_tag:
        numero_texto = numero_tag[0].firstChild.nodeValue
        try:
            endereco["numero"] = int(numero_texto)
        except:
            endereco["numero"] = numero_texto

    caracteristicas_tag = imovel.getElementsByTagName("caracteristicas")[0]
    tamanho = caracteristicas_tag.getElementsByTagName("tamanho")[0].firstChild.nodeValue
    quartos = int(caracteristicas_tag.getElementsByTagName("numQuartos")[0].firstChild.nodeValue)
    banheiros = int(caracteristicas_tag.getElementsByTagName("numBanheiros")[0].firstChild.nodeValue)

    caracteristicas = {
        "tamanho": tamanho,
        "numQuartos": quartos,
        "numBanheiros": banheiros
    }


    valor = imovel.getElementsByTagName("valor")[0].firstChild.nodeValue

    imovel_dict = {
        "descricao": descricao,
        "proprietario": proprietario,
        "endereco": endereco,
        "caracteristicas": caracteristicas,
        "valor": valor
    }

    
    lista_imoveis.append(imovel_dict)

dados_finais = {
    "imobiliaria": {
        "imoveis": lista_imoveis
    }
}


with open("parsers/imobiliaria.json", "w", encoding="utf-8") as f:
    json.dump(dados_finais, f, indent=2, ensure_ascii=False)

print("Arquivo imobiliaria.json gerado com sucesso.")
