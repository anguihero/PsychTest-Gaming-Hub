from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3
import hashlib
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


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

@app.post("/login")
def login(data: LoginRequest):
    conn = sqlite3.connect("backend/database/everest.db")
    cursor = conn.cursor()
    hashed_pw = hashlib.sha256(data.password.encode()).hexdigest()

    cursor.execute("SELECT id, role FROM users WHERE username = ? AND password = ?", (data.username, hashed_pw))
    user = cursor.fetchone()
    conn.close()

    if user:
        return {"status": "success", "user_id": user[0], "role": user[1]}
    else:
        raise HTTPException(status_code=401, detail="Usuario o contraseña incorrectos")

@app.get("/avatar-profile/{username}")
def get_avatar_profile(username: str):
    conn = sqlite3.connect("backend/database/everest.db")
    cursor = conn.cursor()

    cursor.execute("SELECT fuerza, agilidad, equilibrio, resistencia_frio, vision, agarre, capacidad_carga, habilidad_equipo, comunicacion, orientacion, determinacion, sentido_roca FROM avatar_profiles WHERE username = ?", (username,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")

    keys = ["fuerza", "agilidad", "equilibrio", "resistencia_frio", "vision", "agarre", "capacidad_carga", "habilidad_equipo", "comunicacion", "orientacion", "determinacion", "sentido_roca"]
    return dict(zip(keys, row))

# Servidor Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.scripts.main:app", host="127.0.0.1", port=8000, reload=True)
