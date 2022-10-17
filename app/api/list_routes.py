from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload

from app.models import db, List
from app.forms.list_form import ListForm, UpdateListForm
from app.api.auth_routes import validation_errors_to_error_messages

list_routes = Blueprint('list', __name__)

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
@login_required
def create_list():
    """
    creates a new list from the data provided in the body
    of the request
    """

    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_list = List(name=form.data["name"],
                        user_id=current_user.id)

        db.session.add(new_list)
        db.session.commit()

        return new_list.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@list_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_list_by_id(id):
    """
    updates the list with the provided id to the information
    passed in through the body of the request
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

    form = UpdateListForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        list.name = form.data["name"] if form.data["name"] else list.name

        db.session.commit()

        return list.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@list_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_list_by_id(id):


    list = List.query.get(id)

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

    db.session.delete(list)
    db.session.commit()

    return {
        "message": "Successfully deleted",
        "statusCode": 200}



