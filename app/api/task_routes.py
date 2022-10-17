from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import db, User, Task, Tag

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

    if task is None:
        print("task it none")
        return

    if task.user_id != current_user.id:
        print("user does not own this task")

    return task.to_dict()

@task_routes.route('', methods=['POST'])
# @login_required
def create_task():
    return 'created new task'

@task_routes.route('/<int:id>/tags', methods=['POST'])
# @login_required
def add_tag_to_task(id):
    returnStr = f'added tag to task {id}'
    return returnStr

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
