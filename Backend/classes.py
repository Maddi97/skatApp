from typing import List
from datetime import datetime

class Player:

    @staticmethod
    def db_mapping(player: dict):
        return Player(player["playerID"], player["name"])

    @staticmethod
    def from_JSON(player: dict):
        return Player(player.get("playerID", None),player.get("name", None))
    
    def __init__(self, playerID, name):
        self.playerID = playerID
        self.name = name

class Game:

    @staticmethod
    def db_mapping(game: dict, players: List[Player] = []):
        if not players:
            players = game.get("players", [])

        return Game(game["gameID"], game["date"], game["gameRoundAmount"], players, game["playerAmount"])

    @staticmethod
    def from_JSON(game: dict):
        if ("players" in game.keys()):
            game["players"] = list(map(lambda player: Player.from_JSON(player), game["players"]))

        return Game(
            game.get("gameID", None),
            game.get("date", datetime.now().isoformat()),
            game.get("gameRoundAmount", 1),
            game.get("players", None),
            len(game.get("players", []))
        )

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

    @staticmethod
    def from_JSON(gRound: dict):
        return Round(
            gRound.get("gameID", None),
            gRound.get("gameRound", 0),
            gRound.get("playerID", None),
            gRound.get("score", 0),
            gRound.get("scoreSum", 0),
            gRound.get("color", None),
            gRound.get("unter", False),
            gRound.get("hand", False),
            gRound.get("schneider", False),
            gRound.get("schwarz", False),
            gRound.get("schneiderAngesagt", False),
            gRound.get("schwarzAngesagt", False),
            gRound.get("ouvert", False),
            gRound.get("bock", False)
        )


    def __init__(self, gameID, playerID, gameRound, score, scoreSum, color, unter, hand, schneider, schwarz,
        schneiderAngesagt, schwarzAngesagt, ouvert, bock):

        self.gameID = gameID
        self.gameRound = gameRound
        self.playerID = playerID
        self.score = score
        self.scoreSum = scoreSum
        self.color = bool(color)
        self.unter = bool(unter)
        self.hand = bool(hand)
        self.schneider = bool(schneider)
        self.schwarz = bool(schwarz)
        self.schneiderAngesagt = bool(schneiderAngesagt)
        self.schwarzAngesagt = bool(schwarzAngesagt)
        self.ouvert = bool(ouvert)
        self.bock = bool(bock)