import sqlite3

def conectar_db(DB_PATH):
    try:
        conn = sqlite3.connect(DB_PATH)
        print(f"Conectado a la base de datos")
        return conn
    except sqlite3.Error as e:
        print(f"Error al conectar con la base de datos: {e}")
        return None

def crear_o_reemplazar_perfil_avatar(
    db_path, username, fuerza, agilidad, equilibrio, resistencia_frio,
    vision, agarre, capacidad_carga, habilidad_equipo,
    comunicacion, orientacion, determinacion, sentido_roca
):
    """
    Crea o reemplaza un perfil de avatar para el usuario especificado.
    Si ya existe, lo elimina y lo reemplaza con los valores proporcionados.
    """
    conn = conectar_db(db_path)
    if conn is None:
        return {"status": "error", "message": "No se pudo conectar a la base de datos"}

    cursor = conn.cursor()

    try:
        # Elimina el perfil si ya existe
        cursor.execute("DELETE FROM avatar_profiles WHERE username = ?", (username,))

        # Inserta el nuevo perfil
        cursor.execute("""
            INSERT INTO avatar_profiles (
                username, fuerza, agilidad, equilibrio, resistencia_frio,
                vision, agarre, capacidad_carga, habilidad_equipo,
                comunicacion, orientacion, determinacion, sentido_roca
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            username, fuerza, agilidad, equilibrio, resistencia_frio,
            vision, agarre, capacidad_carga, habilidad_equipo,
            comunicacion, orientacion, determinacion, sentido_roca
        ))

        conn.commit()
        print(f"✅ Perfil de avatar creado o reemplazado para '{username}'.")
        return {"status": "ok", "message": f"Perfil actualizado para {username}"}

    except sqlite3.Error as e:
        print(f"Error durante la operación en la base de datos: {e}")
        return {"status": "error", "message": str(e)}

    finally:
        conn.close()
