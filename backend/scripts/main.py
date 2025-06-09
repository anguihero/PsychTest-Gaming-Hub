from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, conint
import os
import sqlite3
import hashlib
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import shutil
from typing import Dict

app = FastAPI()

DB_PATH = "backend/database/everest.db"
BACKUP_DIR = "backend/database/backups"
os.makedirs(BACKUP_DIR, exist_ok=True)

# Permitir origenes cruzados (React corre en localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Ajusta si es otro puerto o dominio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    username: str
    password: str


class PerfilInput(BaseModel):
    fuerza: conint(ge=0, le=100)
    agilidad: conint(ge=0, le=100)
    equilibrio: conint(ge=0, le=100)
    resistencia_frio: conint(ge=0, le=100)
    vision: conint(ge=0, le=100)
    agarre: conint(ge=0, le=100)
    capacidad_carga: conint(ge=0, le=100)
    habilidad_equipo: conint(ge=0, le=100)
    comunicacion: conint(ge=0, le=100)
    orientacion: conint(ge=0, le=100)
    determinacion: conint(ge=0, le=100)
    sentido_roca: conint(ge=0, le=100)

class ColumnDefinition(BaseModel):
    name: str
    type: str  # Ej: TEXT, INTEGER, FLOAT, etc.


class TableSchema(BaseModel):
    table_name: str
    columns: list[ColumnDefinition]


def backup_database():
    if os.path.exists(DB_PATH):
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_path = os.path.join(BACKUP_DIR, f"everest_backup_{timestamp}.db")
        shutil.copyfile(DB_PATH, backup_path)
        print(f"🔄 Base de datos respaldada como {backup_path}")
        return backup_path
    return None

class RegistroEntrada(BaseModel):
    table: str
    data: Dict[str, str]  # puede ser cualquier tipo, usar str por simplicidad


# Servidor Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.scripts.main:app", host="127.0.0.1", port=8000, reload=True)

# Auth ---

@app.post("/login")
def login(data: LoginRequest):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    hashed_pw = hashlib.sha256(data.password.encode()).hexdigest()

    cursor.execute("SELECT id, role FROM users WHERE username = ? AND password = ?", (data.username, hashed_pw))
    user = cursor.fetchone()
    conn.close()

    if user:
        return {"status": "success", "user_id": user[0], "role": user[1]}
    else:
        raise HTTPException(status_code=401, detail="Usuario o contraseña incorrectos")


# Avatar ---

@app.get("/avatar-profile/{username}")
def get_avatar_profile(username: str):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("SELECT fuerza, agilidad, equilibrio, resistencia_frio, vision, agarre, capacidad_carga, habilidad_equipo, comunicacion, orientacion, determinacion, sentido_roca FROM avatar_profiles WHERE username = ?", (username,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")

    keys = ["fuerza", "agilidad", "equilibrio", "resistencia_frio", "vision", "agarre", "capacidad_carga", "habilidad_equipo", "comunicacion", "orientacion", "determinacion", "sentido_roca"]
    return dict(zip(keys, row))

@app.post("/corregir-avatar/{username}")
def corregir_avatar(username: str, perfil: PerfilInput):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        # Elimina perfil anterior si existe
        cursor.execute("DELETE FROM avatar_profiles WHERE username = ?", (username,))

        # Inserta nuevo perfil validado
        cursor.execute("""
            INSERT INTO avatar_profiles (
                username, fuerza, agilidad, equilibrio, resistencia_frio,
                vision, agarre, capacidad_carga, habilidad_equipo,
                comunicacion, orientacion, determinacion, sentido_roca
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            username,
            perfil.fuerza,
            perfil.agilidad,
            perfil.equilibrio,
            perfil.resistencia_frio,
            perfil.vision,
            perfil.agarre,
            perfil.capacidad_carga,
            perfil.habilidad_equipo,
            perfil.comunicacion,
            perfil.orientacion,
            perfil.determinacion,
            perfil.sentido_roca,
        ))

        conn.commit()
        return {"status": "ok", "message": f"Perfil corregido para {username}"}

    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en base de datos: {str(e)}")

    finally:
        conn.close()


# DB Managing ---

@app.get("/tablas/")
def listar_tablas():
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';")
        tablas = [row[0] for row in cursor.fetchall()]

        conn.close()
        return {"tablas": tablas}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al listar tablas: {str(e)}")


@app.post("/crear-tabla/")
def crear_tabla(schema: TableSchema):
    try:
        backup_database()

        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        table_name = schema.table_name
        columnas = schema.columns

        # Construir la sentencia SQL
        cols_sql = ", ".join([f"{col.name} {col.type}" for col in columnas])
        sql = f"CREATE TABLE IF NOT EXISTS {table_name} ({cols_sql});"

        cursor.execute(sql)
        conn.commit()
        conn.close()

        return {
            "status": "success",
            "message": f"Tabla '{table_name}' creada (si no existía).",
            "columns": [col.dict() for col in columnas]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear la tabla: {str(e)}")



@app.post("/insertar_registro")
def insertar_registro(payload: RegistroEntrada):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        # Obtener nombres de columnas válidas para la tabla
        cursor.execute(f"PRAGMA table_info({payload.table})")
        columnas_info = cursor.fetchall()
        columnas_validas = [col[1] for col in columnas_info]

        if not columnas_validas:
            raise HTTPException(status_code=400, detail=f"La tabla '{payload.table}' no existe.")

        # Filtrar solo columnas existentes
        datos_filtrados = {k: v for k, v in payload.data.items() if k in columnas_validas}

        if not datos_filtrados:
            raise HTTPException(status_code=400, detail="No hay columnas válidas para insertar.")

        columnas = ", ".join(datos_filtrados.keys())
        placeholders = ", ".join(["?"] * len(datos_filtrados))
        valores = tuple(datos_filtrados.values())

        sql = f"INSERT INTO {payload.table} ({columnas}) VALUES ({placeholders})"
        cursor.execute(sql, valores)
        conn.commit()

        insert_id = cursor.lastrowid
        conn.close()

        return {
            "mensaje": "✅ Registro insertado con éxito",
            "tabla": payload.table,
            "id_insertado": insert_id
        }

    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Error de base de datos: {str(e)}")
    

# Quizz ---

@app.get("/cuestionario/{cuestionario_id}/pregunta-id/{pregunta_id}")
def obtener_detalle_pregunta(cuestionario_id: int, pregunta_id: int):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        cursor.execute("""
            SELECT p.id, p.texto, p.tipo, p.pista, p.tiempo_limite, p.nivel_dificultad,
                   c.id, c.titulo, c.tematica, c.descripcion
            FROM preguntas p
            JOIN cuestionarios c ON p.cuestionario_id = c.id
            WHERE c.id = ? AND p.id = ?
        """, (cuestionario_id, pregunta_id))
        
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Pregunta no encontrada o no pertenece al cuestionario.")

        pregunta_data = {
            "id": row[0],
            "texto": row[1],
            "tipo": row[2],
            "pista": row[3],
            "tiempo_limite": row[4],
            "nivel_dificultad": row[5]
        }
        cuestionario_data = {
            "id": row[6],
            "titulo": row[7],
            "tematica": row[8],
            "descripcion": row[9]
        }

        # Obtener respuestas
        cursor.execute("""
            SELECT texto, es_correcta, etiqueta_lift
            FROM respuestas
            WHERE pregunta_id = ?
        """, (pregunta_id,))
        
        respuestas = cursor.fetchall()
        conn.close()

        return {
            "cuestionario": cuestionario_data,
            "pregunta": pregunta_data,
            "respuestas": [
                {
                    "texto": r[0],
                    "es_correcta": bool(r[1]),
                    "etiqueta_lift": r[2]
                }
                for r in respuestas
            ]
        }

    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Error al consultar: {str(e)}")
