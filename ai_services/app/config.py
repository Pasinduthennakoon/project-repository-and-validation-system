from dotenv import load_dotenv
import os

load_dotenv()


DB_CONFIG = {
    "host": os.getenv("HOST_NAME"),
    "user": os.getenv("USER_NAME"),
    "password": os.getenv("PASSWORD"),
    "database": os.getenv("DATABASE_NAME")
}

THRESHOLD = 0.7
TOP_K = 1