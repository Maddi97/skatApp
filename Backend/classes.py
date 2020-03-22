from typing import List

class Player:

    @staticmethod
    def parse(player: dict):
        return Player(player["playerID"], player["name"])

    def __init__(self, playerID, name):
        self.playerID = playerID
        self.name = name

class Game:

    @staticmethod
    def parse(game: dict, players: List[Player] = []):
        return Game(game["gameID"], game["date"], game["gameRoundAmount"], game["playerAmount"], players)

    def __init__(self, gameID, date, gameRoundAmount, playerAmount, players):
        self.gameID = gameID
        self.date = date
        self.gameRoundAmount = gameRoundAmount
        self.playerAmount = playerAmount
        self.players = players

class Round:

    @staticmethod
    def parse(roundDetails: dict):
        return Round(roundDetails["gameID"], roundDetails["gameRound"], roundDetails["playerID"], roundDetails["score"], roundDetails["scoreSum"], 
        roundDetails["color"], roundDetails["unter"], roundDetails["hand"], roundDetails["schneider"], roundDetails["schwarz"],
        roundDetails["schneider_angesagt"], roundDetails["schwarz_angesagt"], roundDetails["ouvert"], roundDetails["bock"])

    def __init__(self, gameID, gameRound, playerID, score, scoreSum, color, unter, hand, schneider, schwarz,
        schneider_angesagt, schwarz_angesagt, ouvert, bock):

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
        self.schneider_angesagt = schneider_angesagt
        self.schwarz_angesagt = schwarz_angesagt
        self.ouvert = ouvert
        self.bock = bock