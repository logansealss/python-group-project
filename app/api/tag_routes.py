from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload

from app.models import db, Tag, List

tag_routes = Blueprint('tag', __name__)

# TODO comment in login_required decorator for the routes
# TODO use current_user from flask_login to work with the User
#      model when necessary within the routes

@tag_routes.route('')
@login_required
def get_user_tags():
    user_tags = Tag.query.filter(Tag.user_id == current_user.id) \
                .options(joinedload(Tag.tasks)).all()

    return {tag.id: tag.to_dict() for tag in user_tags}

@tag_routes.route('/<int:id>')
# @login_required
def get_tag_by_id(id):
    returnStr = f'this is tag {id}'
    return returnStr

@tag_routes.route('', methods=['POST'])
# @login_required
def create_tag():
    return 'created new tag'   

@tag_routes.route('/<int:id>', methods=['PUT'])
# @login_required
def update_tag(id):
    returnStr = f'updated tag {id}'
    return returnStr   

@tag_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_tag(id):
    returnStr = f'deleted tag {id}'
    return returnStr 


