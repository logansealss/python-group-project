from .db import db
from .task_tags import task_tags

class Tag(db.Model):
    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(150), nullable=False)
    color = db.Column(db.String(7))

    user = db.relationship("User", back_populates="tags")
    tasks = db.relationship("Task", secondary=task_tags, back_populates="tags")    
    
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'name': self.name,
            'color': self.color
        }