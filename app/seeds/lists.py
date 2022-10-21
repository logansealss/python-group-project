from app.models import db, List

def seed_lists():
    task_feature = List(
        name='Tasks Feature',
        user_id=1
    )
    list_feature = List(
        name="Lists Feature",
        user_id=1
    )
    tags_feature = List(
        name='Tags Feature',
        user_id=1
    )
    search = List(
        name="Search Feature",
        user_id=1
    )

    db.session.add(task_feature)
    db.session.add(list_feature)
    db.session.add(tags_feature)
    db.session.add(search)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the lists table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_lists():
    db.session.execute('TRUNCATE lists RESTART IDENTITY CASCADE;')
    db.session.commit()
