import requests
from getpass import getpass
from rich.console import Console
from rich.table import Table

api_url = "https://suap.ifrn.edu.br/api/"

user = input("user: ")
password = getpass()

data = {"username": user, "password": password}

response = requests.post(api_url + "v2/autenticacao/token/", json=data)
token = response.json()["access"]
print(response.json())

headers = {
    "Authorization": f'Bearer {token}'
}

ano = input("Digite o ano (ex: 2024): ")

response = requests.get(f"https://suap.ifrn.edu.br/api/edu/meu-boletim/{ano}/1/", headers=headers)

print(response.text)
print(response)
if response.status_code == 200:
    boletim = response.json()

    console = Console()
    table = Table(title="Meu Boletim 2024/1")

    table.add_column("Disciplina", style="green", no_wrap=True)
    table.add_column("1º Bimestre", style="blue")
    table.add_column("2º Bimestre", style="blue")
    table.add_column("3º Bimestre", style="blue")
    table.add_column("4º Bimestre", style="blue")
    table.add_column("Média Final", style="blue")
    table.add_column("Situação", style="yellow")
    table.add_column("Faltas", style="red")

    for materia in boletim:
        table.add_row(
            materia.get("disciplina", "—"),
            str(materia.get("nota_etapa_1", {}).get("nota", "—")),
            str(materia.get("nota_etapa_2", {}).get("nota", "—")),
            str(materia.get("nota_etapa_3", {}).get("nota", "—")),
            str(materia.get("nota_etapa_4", {}).get("nota", "—")),
            str(materia.get("media_final_disciplina", "—")),
            materia.get("situacao", "—"),
            str(materia.get("numero_faltas", "—")),
        )

    console.print(table)

elif response.status_code != 200:
    print("Erro ao autenticar! Verifique usuário e senha.")
    print("Detalhes:", response.text)
    exit()
else:
    print(f" Erro ao buscar boletim ({response.status_code})")