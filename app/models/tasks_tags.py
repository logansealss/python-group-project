from .db import db

task_tags = db.Table(
    "task_tags",
    db.Model.metadata,
    db.Column("task_id", db.Integer, db.ForeignKey("tasks.id"), primary_key=True),
    db.Column("tag_id", db.Integer, db.ForeignKey("tags.id"), primary_key=True)
)

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

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'listId': self.list_id,
            'name': self.name,
            'priority': self.priority,
            'startDate': self.start_date.strftime('%Y-%m-%d %H:%M:%S'),
            'dueDate': self.due_date.strftime('%Y-%m-%d %H:%M:%S'),
            'duration': self.duration,
            'note': self.note,
            'completed': self.completed
        }