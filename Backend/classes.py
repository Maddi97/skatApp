from typing import List
from datetime import datetime

class Player:

    @staticmethod
    def db_mapping(player: dict):
        return Player(player["playerID"], player["name"])

    def __init__(self, playerID, name):
        self.playerID = playerID
        self.name = name

class Game:

    @staticmethod
    def db_mapping(game: dict, players: List[Player] = []):
        return Game(game["gameID"], game["date"], game["gameRoundAmount"], players, game["playerAmount"])

    def __init__(self, gameID, date, gameRoundAmount, players: List[Player], playerAmount = None):
        self.gameID = gameID
        self.date = date if date else datetime.now().isoformat()
        self.gameRoundAmount = gameRoundAmount
        self.players = players if players else []
        self.playerAmount = playerAmount if playerAmount else len(players)

class Round:

    @staticmethod
    def db_mapping(roundDetails: dict):
        return Round(roundDetails["gameID"], roundDetails["playerID"], roundDetails["gameRound"], roundDetails["score"], roundDetails["scoreSum"],
        roundDetails["color"], roundDetails["unter"], roundDetails["hand"], roundDetails["schneider"], roundDetails["schwarz"],
        roundDetails["schneiderAngesagt"], roundDetails["schwarzAngesagt"], roundDetails["ouvert"], roundDetails["bock"])

    def __init__(self, gameID, playerID, gameRound, score, scoreSum, color, unter, hand, schneider, schwarz,
        schneiderAngesagt, schwarzAngesagt, ouvert, bock):

        self.gameID = gameID
        self.gameRound = gameRound
        self.playerID = playerID
        self.score = score
        self.scoreSum = scoreSum
        self.color = color
        self.unter = unter
        self.hand = hand
        self.schneider = schneider
        self.schwarz = schwarz
        self.schneiderAngesagt = schneiderAngesagt
        self.schwarzAngesagt = schwarzAngesagt
        self.ouvert = ouvert
        self.bock = bock