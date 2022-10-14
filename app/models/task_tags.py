from .db import db

task_tags = db.Table(
    "task_tags",
    db.Model.metadata,
    db.Column("task_id", db.Integer, db.ForeignKey("tasks.id"), primary_key=True),
    db.Column("tag_id", db.Integer, db.ForeignKey("tags.id"), primary_key=True)
)