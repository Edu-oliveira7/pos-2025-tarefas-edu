import requests
from xml.dom.minidom import parseString

url = "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso"

codigo = "100"

while codigo != "0":
    print("\nMenu:")
    print("1 - Ver capital do país")
    print("2 - Ver moeda do país")
    print("3 - Ver continentes ordenados por código")
    print("0 - Sair")

    codigo = input("Digite o código da opção: ")

    if codigo == "1":
        country_code = input("Digite o código do país (ex: BR, US): ").upper()
        payload = f"""<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <CapitalCity xmlns="http://www.oorsprong.org/websamples.countryinfo">
              <sCountryISOCode>{country_code}</sCountryISOCode>
            </CapitalCity>
          </soap:Body>
        </soap:Envelope>"""
        tag_resultado = "m:CapitalCityResult"

    elif codigo == "2":
        country_code = input("Digite o código do país (ex: BR, US): ").upper()
        payload = f"""<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <CountryCurrency xmlns="http://www.oorsprong.org/websamples.countryinfo">
              <sCountryISOCode>{country_code}</sCountryISOCode>
            </CountryCurrency>
          </soap:Body>
        </soap:Envelope>"""
        tag_resultado = "m:sName"

    elif codigo == "3":
        payload = """<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <ListOfContinentsByCode xmlns="http://www.oorsprong.org/websamples.countryinfo" />
          </soap:Body>
        </soap:Envelope>"""
        tag_resultado = "LIST_CONTINENTS"

    elif codigo == "0":
        print("Você saiu.")
        break

    else:
        print("Opção inválida. Tente novamente.")
        continue

    headers = {
        "Content-Type": "text/xml; charset=utf-8",
    }

    response = requests.post(url, data=payload.encode('utf-8'), headers=headers)
    dom = parseString(response.content)

    try:
        if tag_resultado == "LIST_CONTINENTS":
            nomes = dom.getElementsByTagName("m:sName")
            codigos = dom.getElementsByTagName("m:sCode")
            print("Continentes (ordenados por código):")
            for nome, codigo in zip(nomes, codigos):
                print(f" - {codigo.firstChild.nodeValue}: {nome.firstChild.nodeValue}")
        else:
            resultado = dom.getElementsByTagName(tag_resultado)[0].firstChild.nodeValue
            print("Resultado:", resultado)
    except Exception as e:
        print(" Não foi possível obter o resultado:", e)
