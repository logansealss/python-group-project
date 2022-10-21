from flask import Blueprint, request
from flask_login import current_user, login_required

from app.models import db, Task, Tag, List
from app.forms.task_form import TaskForm, UpdateTaskForm
from app.api.auth_routes import validation_errors_to_error_messages

task_routes = Blueprint('task', __name__)

@task_routes.route('')
@login_required
def get_user_tasks():
    """
    returns a normalized object containing tasks using the task ID as
    the key and the task dict as the value
    """

    user_tasks = Task.query.filter_by(user_id=current_user.id)

    return {task.id: task.to_dict() for task in user_tasks}

@task_routes.route('/<int:id>')
@login_required
def get_task_by_id(id):
    """
    returns a single task's details as a dict
    """

    task = Task.query.get(id)

    # task does not exist
    if task is None:
        return {
            "message": "Task couldn't be found",
            "statusCode": 404}, 404

    # user does not own the task
    if task.user_id != current_user.id:
        return {
            "message": "Forbidden",
            "statusCode": 403}, 403

    return task.to_dict()

@task_routes.route('', methods=['POST'])
@login_required
def create_task():
    """
    creates a new task from the data provided in the body
    of the request
    """

    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form_data = form.data
        new_task = Task(user_id=current_user.id,
                        name=form_data["name"],
                        priority=form_data["priority"],
                        start_date=form_data["start_date"],
                        due_date=form_data["due_date"],
                        duration=form_data["duration"],
                        list_id=form_data["list_id"],
                        note=form_data["note"],
                        completed=form_data["completed"])

        db.session.add(new_task)
        db.session.commit()

        return new_task.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@task_routes.route('/<int:task_id>/tags/<int:tag_id>', methods=['PUT'])
@login_required
def add_tag_to_task(task_id, tag_id):
    """
    adds a tag to a task
    """

    task = Task.query.get(task_id)
    tag = Tag.query.get(tag_id)

    # task does not exist
    if task is None:
        return {
            "message": "Task couldn't be found",
            "statusCode": 404}, 404

    #  tag does not exist
    if tag is None:
        return {
            "message": "Tag couldn't be found",
            "statusCode": 404}, 404

    # user does not own the task or user does not own the tag
    if task.user_id != current_user.id or tag.user_id != current_user.id:
        return {
            "message": "Forbidden",
            "statusCode": 403}, 403

    task.tags.append(tag)
    db.session.commit()

    return {"taskId": task_id,
            "tagId": tag_id}

@task_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_task_by_id(id):
    """
    updates the task with the provided id to the information
    passed in through the body of the request
    """

    task = Task.query.get(id)

    # task does not exist
    if task is None:
        return {
            "message": "Task couldn't be found",
            "statusCode": 404}, 404

    # user does not own the task
    if task.user_id != current_user.id:
        return {
            "message": "Forbidden",
            "statusCode": 403}, 403

    form = UpdateTaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form_data = form.data

        if form_data["list_id"]:

            list = List.query.get(form_data["list_id"])

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

        task.name = form_data["name"]
        task.list_id = form_data["list_id"] if form_data["list_id"] else None
        task.priority = form_data["priority"] if form_data["priority"] else 0
        task.start_date = form_data["start_date"] if form_data["start_date"] else None
        task.due_date = form_data["due_date"] if form_data["due_date"] else None
        task.duration = form_data["duration"] if form_data["duration"] else None
        task.note = form_data["note"] if form_data["note"] else None
        task.completed = form_data["completed"] if form_data["completed"] in [True, False] else task.completed

        db.session.commit()

        return task.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@task_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_task_by_id(id):
    """
    delete a task with the provided id
    """

    task = Task.query.get(id)

    # task does not exist
    if task is None:
        return {
            "message": "Task couldn't be found",
            "statusCode": 404}, 404

    # user does not own the task
    if task.user_id != current_user.id:
        return {
            "message": "Forbidden",
            "statusCode": 403}, 403

    db.session.delete(task)
    db.session.commit()

    return {
        "message": "Successfully deleted",
        "statusCode": 200}

@task_routes.route('/<int:task_id>/tags/<int:tag_id>', methods=['DELETE'])
@login_required
def remove_tag_from_task(task_id, tag_id):
    """
    remove a tag from a task
    """

    task = Task.query.get(task_id)
    tag = Tag.query.get(tag_id)

    # task does not exist
    if task is None:
        return {
            "message": "Task couldn't be found",
            "statusCode": 404}, 404

    #  tag does not exist
    if tag is None:
        return {
            "message": "Tag couldn't be found",
            "statusCode": 404}, 404

    # user does not own the task or user does not own the tag
    if task.user_id != current_user.id or tag.user_id != current_user.id:
        return {
            "message": "Forbidden",
            "statusCode": 403}, 403

    if tag in task.tags:
        task.tags.remove(tag)
        db.session.commit()
        return {
            "message": "Successfully removed tag from task",
            "statusCode": 200}

    return{
        "message": "Task does not have the provided tag",
        "statusCode": 404}, 404
