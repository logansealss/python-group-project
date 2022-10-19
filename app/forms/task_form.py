from flask_wtf import FlaskForm
from wtforms import (
    StringField, 
    IntegerField, 
    DateTimeField, 
    BooleanField, 
    TextAreaField)
from wtforms.validators import DataRequired, Length


class TaskForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(1, 150)])
    list_id = IntegerField('List Id')
    priority = IntegerField('Priority')
    start_date = DateTimeField('Start Time')
    due_date = DateTimeField('Due Date')
    duration = IntegerField('Duration')
    note = TextAreaField('Note')
    completed = BooleanField('Completed', default=False)

class UpdateTaskForm(FlaskForm):
    name = StringField('Name', validators=[Length(0, 150)])
    list_id = IntegerField('List Id')
    priority = IntegerField('Priority')
    start_date = DateTimeField('Start Time')
    due_date = DateTimeField('Due Date')
    duration = IntegerField('Duration')
    note = TextAreaField('Note')
    completed = BooleanField('Completed', default=False)
