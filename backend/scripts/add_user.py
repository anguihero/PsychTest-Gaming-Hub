import sqlite3
import hashlib

username = input("Usuario: ")
password = input("Contraseña: ")
role = input("Rol (admin, player): ")

hashed_pw = hashlib.sha256(password.encode()).hexdigest()

conn = sqlite3.connect("backend/database/everest.db")
cursor = conn.cursor()
cursor.execute("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", (username, hashed_pw, role))
conn.commit()
conn.close()
