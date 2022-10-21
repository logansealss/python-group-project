from app.models import db, Task

def seed_tasks():
    add_task = Task(
        name='Create a Task',
        user_id=1,
        list_id=1,
        duration=1,
    )
    edit_task = Task(
        name='Edit Task',
        user_id=1,
        list_id=1,
        duration=1,
    )
    delete_task = Task(
        name='Delete Task',
        user_id=1,
        list_id=1,
        duration=1,
        note="It has to be done",
        priority=1
    )
    add_list = Task(
        name='Create a List',
        user_id=1,
        list_id=2,
        duration=1,
    )
    edit_list = Task(
        name='Edit List',
        user_id=1,
        list_id=2,
        duration=1,
    )
    delete_list = Task(
        name='Delete List',
        user_id=1,
        list_id=2,
        duration=1,
        note="It has to be done",
        priority=1
    )
    add_tag = Task(
        name='Create a Tag',
        user_id=1,
        list_id=3,
        duration=1,
    )
    edit_tag = Task(
        name='Edit Tag',
        user_id=1,
        list_id=3,
        duration=1,
    )
    delete_tag = Task(
        name='Delete Tag',
        user_id=1,
        list_id=3,
        duration=1,
        note="It has to be done",
        priority=1
    )
    show_search = Task(
        name = 'Demonstrate Search Bar',
        user_id=1
        list_id=4,
        duration=1,
    )

    db.session.add(add_task)
    db.session.add(edit_task)
    db.session.add(delete_task)
    db.session.add(add_list)
    db.session.add(edit_list)
    db.session.add(delete_list)
    db.session.add(add_tag)
    db.session.add(edit_tag)
    db.session.add(delete_tag)
    db.session.add(show_search)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the tasks table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tasks():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
