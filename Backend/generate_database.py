from os import environ
from sqlalchemy import engine, create_engine, inspect, schema, MetaData, Table, Column, Integer, String, Boolean, PrimaryKeyConstraint, ForeignKey

databaseName = "test"

def create_database(dataBaseName= databaseName, dropOnStart = True):

    # ubuntu:password
    # windows:root
    if dropOnStart:
            engine = create_engine('mysql+pymysql://root:password@127.0.0.1')
            if databaseName in inspect(engine).get_schema_names():
                engine.execute(schema.DropSchema(databaseName))
            engine.execute(schema.CreateSchema(databaseName))  # create db
            del engine
    
    engine = create_engine('mysql+pymysql://root:password@127.0.0.1/{}'.format(databaseName))

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
        Column('hand', Boolean),
        Column('schneider', Boolean),
        Column('schwarz', Boolean),
        Column('schneiderAngesagt', Boolean),
        Column('schwarzAngesagt', Boolean),
        Column('ouvert', Boolean),
        Column('bock', Boolean),
        PrimaryKeyConstraint('gameID', 'gameRound', name='gameDetails')
    )

    meta.create_all(engine)
    return engine, meta
