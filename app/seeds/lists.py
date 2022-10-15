from app.models import db, List

def seed_lists():
    personal1 = List(
        name='personal',
        user_id=1
    )
    work1 = List(
        name="work",
        user_id=1
    )
    personal2 = List(
        name='personal',
        user_id=2
    )
    work2 = List(
        name="work",
        user_id=2
    )

    db.session.add(personal1)
    db.session.add(work1)
    db.session.add(personal2)
    db.session.add(work2)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the lists table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_lists():
    db.session.execute('TRUNCATE lists RESTART IDENTITY CASCADE;')
    db.session.commit()