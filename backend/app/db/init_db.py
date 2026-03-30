from app.db.session import engine, Base
from app.models import user, document, chunk

def init_db():
    Base.metadata.create_all(bind=engine)