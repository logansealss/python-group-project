from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import db, User, Task, Tag

task_routes = Blueprint('task', __name__)

# TODO comment in login_required decorator for the routes
# TODO use current_user from flask_login to work with the User
#      model when necessary within the routes

@task_routes.route('')
# @login_required
def get_user_tasks():

    allTasks = Task.query.filter_by(user_id=1)
    tasks = dict()
    for task in allTasks:
        tasks[f'{task['id']}'] = task.to_dict()
    print(tasks)
    returnStr = f'these are the user\'s tasks'
    return returnStr

@task_routes.route('/<int:id>')
# @login_required
def get_task_by_id(id):
    returnStr = f'this is task {id}'
    return returnStr

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
