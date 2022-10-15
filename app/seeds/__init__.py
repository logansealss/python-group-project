from flask.cli import AppGroup
from .users import seed_users, undo_users
from .lists import seed_lists, undo_lists
from .tags import seed_tags, undo_tags
from .tasks import seed_tasks, undo_tasks

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_lists()
    seed_tags()
    seed_tasks()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_tasks()
    undo_tags()
    undo_lists()
    undo_users()
