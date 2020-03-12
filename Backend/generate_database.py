from os import environ
from sqlalchemy import create_engine, inspect, schema, MetaData, Table, Column, Integer, String, Boolean, PrimaryKeyConstraint, ForeignKey

databaseName = "test"

def create_database():

    # ubuntu:password
    # windows:root

    engine = create_engine('mysql+pymysql://root:password@127.0.0.1')

    if databaseName in inspect(engine).get_schema_names():
        engine.execute(schema.DropSchema(databaseName))
    engine.execute(schema.CreateSchema(databaseName))  # create db
    engine.execute("USE {}".format(databaseName))  # select new db

    meta = MetaData()

    Player = Table(
        'Player', meta,
        Column('playerID', Integer, primary_key=True, autoincrement=True),
        Column('name', String(35), unique=True),
    )

    Game = Table(
        'Game', meta,
        Column('gameID', Integer, primary_key=True, autoincrement=True),
        Column('date', String(35)),
        Column('gameRoundAmount', Integer, nullable=False),
        Column('playerAmount', Integer, nullable=False),
    )

    Game_Participants = Table(
        'GameParticipants', meta,
        Column('gameID', Integer, ForeignKey("Game.gameID")),
        Column('playerID', Integer, ForeignKey("Player.playerID")),
        PrimaryKeyConstraint("gameID", "playerID", name="gameParticipants")
    )

    GameDetails = Table(
        'GameDetails', meta,
        Column('gameRound', Integer, nullable=False),
        Column('gameID', Integer, ForeignKey('Game.gameID')),
        Column('playerID', Integer, ForeignKey('Player.playerID')),
        Column('score', Integer, nullable=False),
        Column('scoreSum', Integer),
        Column('color', String(35)),
        Column('unter', String(35)),
        Column('Hand', Boolean),
        Column('Schneider', Boolean),
        Column('Schwarz', Boolean),
        Column('Schneider angesagt', Boolean),
        Column('Schwarz angesagt', Boolean),
        Column('Ouvert', Boolean),
        Column('Bock', Boolean),
        PrimaryKeyConstraint('gameID', 'gameRound', name='gameDetails')
    )

    meta.create_all(engine)
    return engine, meta
