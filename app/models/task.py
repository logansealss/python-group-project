from .db import db
from .task_tags import task_tags

class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey("lists.id"))
    name = db.Column(db.String(150), nullable=False)
    priority = db.Column(db.Integer)
    start_date = db.Column(db.DateTime)
    due_date = db.Column(db.DateTime)
    duration = db.Column(db.Integer)
    note = db.Column(db.String())
    completed = db.Column(db.Boolean, default=False)

    user = db.relationship("User", back_populates="tasks")
    list = db.relationship("List", back_populates="tasks")
    tags = db.relationship("Tag", secondary=task_tags, back_populates="tasks")

    ## TODO create to_dict function