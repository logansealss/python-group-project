from flask_wtf import FlaskForm
from wtforms import (
    StringField)
from wtforms.validators import DataRequired, Length

class ListForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(1, 150)])

class UpdateListForm(FlaskForm):
    name = StringField('Name', validators=[Length(0, 150)])
