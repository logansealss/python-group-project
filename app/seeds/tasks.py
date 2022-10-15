from app.models import db, Task

def seed_tasks():
    milk = Task(
        name='remember the milk',
        user_id=1,
        list_id=1
    )
    frog = Task(
        name="eat the frog",
        user_id=1,
        list_id=2,
        duration=30,
        note="It has to be done",
        priority=1
    )
    grandma = Task(
        name="call grandma",
        user_id=1,
        list_id=1,
        duration=20,
        note="Wish her happy birthday"
    )
    fun = Task(
        name="have fun",
        user_id=1
    )
    haircut = Task(
        name='get a haircut',
        user_id=2,
        list_id=3
    )
    movie = Task(
        name="movie",
        user_id=2,
        list_id=3,
        note="See a movie with a friend"
    )
    grandpa = Task(
        name="call grandpa",
        user_id=2,
        duration=20,
        priority=1,
        note="Wish him happy birthday"
    )

    db.session.add(milk)
    db.session.add(frog)
    db.session.add(grandma)
    db.session.add(fun)
    db.session.add(haircut)
    db.session.add(movie)
    db.session.add(grandpa)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the tasks table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tasks():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()