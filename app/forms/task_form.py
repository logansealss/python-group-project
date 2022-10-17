from xmlrpc.client import Boolean
from flask_wtf import FlaskForm
from wtforms import (
    StringField, 
    IntegerField, 
    DateTimeField, 
    BooleanField, 
    TextAreaField)
from wtforms.validators import DataRequired, ValidationError
from app.models import User


class TaskForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    priority = IntegerField('Priority')
    start_date = DateTimeField('Start Time')
    due_date = DateTimeField('Due Date')
    duration = IntegerField('Duration')
    note = TextAreaField('Note')
    completed = BooleanField('Completed', default=False)
