from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload


from app.models import db, Tag
from app.forms.tag_form import TagForm, UpdateTagForm
from app.api.auth_routes import validation_errors_to_error_messages

tag_routes = Blueprint('tag', __name__)

@tag_routes.route('')
@login_required
def get_user_tags():
    """
    gets the tags associated with the current user
    """

    user_tags = Tag.query.filter(Tag.user_id == current_user.id) \
                .options(joinedload(Tag.tasks)).all()

    return {tag.id: tag.to_dict() for tag in user_tags}

@tag_routes.route('/<int:id>')
@login_required
def get_tag_by_id(id):
    """
    gets a tag by tag id
    """

    tag = Tag.query.options(joinedload(Tag.tasks)).get(id)

    # tag does not exist
    if tag is None:
        return {
            "message": "Tag couldn't be found",
            "statusCode": 404}, 404

    # user does not own the tag
    if tag.user_id != current_user.id:
        return {
            "message": "Forbidden",
            "statusCode": 403}, 403

    return tag.to_dict()

@tag_routes.route('', methods=['POST'])
@login_required
def create_tag():
    """
    creates a new tag from the data provided in the body
    of the request
    """

    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_tag = Tag(name=form.data["name"],
                      color=form.data["color"] if form.data["color"] else None,
                      user_id=current_user.id)

        db.session.add(new_tag)
        db.session.commit()

        return new_tag.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
   

@tag_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_tag(id):

    tag = Tag.query.options(joinedload(Tag.tasks)).get(id)

    # tag does not exist
    if tag is None:
        return {
            "message": "Tag couldn't be found",
            "statusCode": 404}, 404

    # user does not own the tag
    if tag.user_id != current_user.id:
        return {
            "message": "Forbidden",
            "statusCode": 403}, 403

    form = UpdateTagForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        tag.name = form.data["name"] if form.data["name"] else tag.name
        tag.color = form.data["color"] if form.data["color"] else tag.color

        db.session.commit()

        return tag.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@tag_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_tag(id):
    """
    delete a tag with the provided id
    """
    
    tag = Tag.query.get(id)

    # tag does not exist
    if tag is None:
        return {
            "message": "Tag couldn't be found",
            "statusCode": 404}, 404

    # user does not own the tag
    if tag.user_id != current_user.id:
        return {
            "message": "Forbidden",
            "statusCode": 403}, 403

    db.session.delete(tag)
    db.session.commit()

    return {
        "message": "Successfully deleted",
        "statusCode": 200}


