from app.models import db, Tag

def seed_tags():
    important1 = Tag(
        name='important',
        user_id=1,
        color="#FF5733"
    )
    in_progress = Tag(
        name="in progress",
        user_id=1,
        color="#D433FF"
    )
    important2 = Tag(
        name='important',
        user_id=2,
        color="#FF3333"
    )
    not_important = Tag(
        name="not so important",
        user_id=2,
        color="#3352FF"
    )

    db.session.add(important1)
    db.session.add(in_progress)
    db.session.add(important2)
    db.session.add(not_important)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the tags table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tags():
    db.session.execute('TRUNCATE tags RESTART IDENTITY CASCADE;')
    db.session.commit()