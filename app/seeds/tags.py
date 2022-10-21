from app.models import db, Tag

def seed_tags():
    create = Tag(
        name='Create',
        user_id=1,
        color="#B84A47"
    )
    read = Tag(
        name="Read",
        user_id=1,
        color="#FFBF00"
    )
    update = Tag(
        name='Update',
        user_id=1,
        color="#FF5733"
    )
    delete = Tag(
        name="Delete",
        user_id=1,
        color="#800080"
    )

    db.session.add(create)
    db.session.add(read)
    db.session.add(update)
    db.session.add(delete)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the tags table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tags():
    db.session.execute('TRUNCATE tags RESTART IDENTITY CASCADE;')
    db.session.commit()
