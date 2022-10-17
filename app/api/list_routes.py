from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload

from app.models import db, List

list_routes = Blueprint('list', __name__)

# TODO comment in login_required decorator for the routes
# TODO use current_user from flask_login to work with the User
#      model when necessary within the routes

@list_routes.route('')
@login_required
def get_user_lists():
    """
    gets the lists associated with the current user
    """

    lists = List.query.filter(List.user_id == current_user.id) \
        .options(joinedload(List.tasks)).all()
    return jsonify([list.to_dict() for list in lists])

@list_routes.route('/<int:id>')
@login_required
def get_list_by_id(id):
    """
    gets a list by list id
    """

    list = List.query.options(joinedload(List.tasks)).get(id)

    # list does not exist
    if list is None:
        return {
            "message": "List couldn't be found",
            "statusCode": 404}, 404

    # user does not own the list
    if list.user_id != current_user.id:
        return {
            "message": "Forbidden",
            "statusCode": 403}, 403

    return list.to_dict()

@list_routes.route('', methods=['POST'])
# @login_required
def create_list():
    return 'created new list'

@list_routes.route('/<int:id>', methods=['PUT'])
# @login_required
def update_list_by_id(id):
    returnStr = f'updated list {id}'
    return returnStr

@list_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_list_by_id(id):
    returnStr = f'deleted list {id}'
    return returnStr



