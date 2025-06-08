import os
import shutil
import sqlite3
from datetime import datetime

DB_PATH = "backend/database/everest.db"
BACKUP_DIR = "backend/database/backups"

# Paso 1: crear carpeta de backups si no existe
os.makedirs(BACKUP_DIR, exist_ok=True)

# Paso 2: respaldar si ya existe
if os.path.exists(DB_PATH):
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_path = os.path.join(BACKUP_DIR, f"everest_backup_{timestamp}.db")
    shutil.copyfile(DB_PATH, backup_path)
    print(f"🔄 Base de datos existente respaldada como {backup_path}")

# Paso 3: crear nueva base de datos e inicializar estructura
conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
);
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    level INTEGER,
    timestamp TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS test_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    test_id TEXT,
    score INTEGER,
    timestamp TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS avatar_profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    fuerza INTEGER,
    agilidad INTEGER,
    equilibrio INTEGER,
    resistencia_frio INTEGER,
    vision INTEGER,
    agarre INTEGER,
    capacidad_carga INTEGER,
    habilidad_equipo INTEGER,
    comunicacion INTEGER,
    orientacion INTEGER,
    determinacion INTEGER,
    sentido_roca INTEGER
);
""")


cursor.execute("""
CREATE TABLE IF NOT EXISTS medals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    description TEXT,
    test_id TEXT,
    awarded_on TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
""")

conn.commit()
conn.close()

print("✅ Base de datos creada y tablas inicializadas correctamente.")
