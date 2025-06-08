import yaml
from pathlib import Path

def cargar_configuracion(ruta_config=None):
    """
    Carga un archivo config.yml. Si no se pasa ruta_config, se solicita por input.
    Retorna un diccionario con la configuración cargada.
    """
    if ruta_config is None:
        ruta_config = input("Ingrese la ruta del archivo config.yml: ").strip()

    ruta = Path(ruta_config)
    if not ruta.exists():
        raise FileNotFoundError(f"Archivo no encontrado: {ruta_config}")

    with open(ruta, "r", encoding="utf-8") as f:
        config = yaml.safe_load(f)

    print(f"Configuración cargada desde: {ruta.resolve()}")
    return config
