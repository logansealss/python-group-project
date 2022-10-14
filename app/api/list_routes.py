from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import db, User

list_routes = Blueprint('list', __name__)

# TODO comment in login_required decorator for the routes
# TODO use current_user from flask_login to work with the User
#      model when necessary within the routes

@list_routes.route('')
# @login_required
def get_user_lists():
    return 'these are the user\'s lists'

@list_routes.route('/<int:id>')
# @login_required
def get_list_by_id(id):
    returnStr = f'this is list {id}'
    return returnStr

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



