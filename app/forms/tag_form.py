from flask_wtf import FlaskForm
from wtforms import (
    StringField)
from wtforms.validators import DataRequired, Length

class TagForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(1, 150)])
    color = StringField('Color')

class UpdateTagForm(FlaskForm):
    name = StringField('Name', validators=[Length(0, 150)])
    color = StringField('Color')