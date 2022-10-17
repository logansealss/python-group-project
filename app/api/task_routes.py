from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, User, Task, Tag
from app.forms.task_form import TaskForm
from app.api.auth_routes import validation_errors_to_error_messages

task_routes = Blueprint('task', __name__)

# TODO comment in login_required decorator for the routes
# TODO use current_user from flask_login to work with the User
#      model when necessary within the routes

@task_routes.route('')
@login_required
def get_user_tasks():
    """
    returns a normalized object containing tasks using the task ID as
    the key and the task dict as the value
    """

    allTasks = Task.query.filter_by(user_id=current_user.id)
    tasks = dict()
    for t in allTasks:
        task = t.to_dict()
        taskId = task['id']
        tasks[taskId] = task

    return tasks

@task_routes.route('/<int:id>')
@login_required
def get_task_by_id(id):
    """
    returns a single task's details as a dict
    """

    task = Task.query.get(id)

    # task does not exist
    if task is None:
        print("task is none")
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
                        note=form_data["note"],
                        completed=form_data["completed"])

        db.session.add(new_task)
        db.session.commit()

        return new_task.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@task_routes.route('/<int:task_id>/tags/<int:tag_id>', methods=['PUT'])
@login_required
def add_tag_to_task(task_id, tag_id):

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
# @login_required
def update_task_by_id(id):
    returnStr = f'updated task {id}'
    return returnStr

@task_routes.route('/<int:id>', methods=['DELETE'])
def delete_task_by_id(id):
    returnStr = f'deleted task {id}'
    return returnStr

@task_routes.route('/<int:task_id>/tags/<int:tag_id>', methods=['DELETE'])
def remove_tag_from_task(task_id, tag_id):
    returnStr = f'removed tag {tag_id} from task {task_id}'
    return returnStr
