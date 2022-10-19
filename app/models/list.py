from .db import db

class List(db.Model):
    __tablename__ = "lists"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(150), nullable=False)

    tasks = db.relationship("Task", back_populates="list")
    user = db.relationship("User", back_populates="lists")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'name': self.name,
            'taskCount': len(self.tasks)
        }
