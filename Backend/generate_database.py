from os import environ
from sqlalchemy import *


def create_database():

    # ubuntu:password
    # windows:root

    engine = create_engine('mysql+pymysql://root:root@127.0.0.1')

    # TODO Drop IF exists
    engine.execute("DROP SCHEMA test")
    engine.execute("CREATE DATABASE test")  # create db
    engine.execute("USE test")  # select new db

    meta = MetaData()

    player = Table(
        'player', meta,
        Column('playerID', Integer, primary_key=True, autoincrement=True),
        Column('name', String(35), unique=True),
    )

    game = Table(
        'game', meta,
        Column('gameID', Integer, primary_key=True, autoincrement=True),
        Column('date', Date),
        Column('count', Integer, nullable=False),
        Column('player1', Integer, ForeignKey(
            "player.playerID"), nullable=False),
        Column('player2', Integer, ForeignKey(
            "player.playerID"), nullable=False),
        Column('player3', Integer, ForeignKey(
            "player.playerID"), nullable=False),
        Column('player4', Integer, ForeignKey(
            "player.playerID"), nullable=True),
        Column('player5', Integer, ForeignKey(
            "player.playerID"), nullable=True),
    )

    score = Table(
        'score', meta,
        Column('playerID', Integer, ForeignKey('player.playerID')),
        Column('gameID', Integer, ForeignKey('game.gameID')),
        Column('score', Integer, nullable=False),
        PrimaryKeyConstraint('playerID', 'gameID', name='pk')
    )

    meta.create_all(engine)
    return engine
