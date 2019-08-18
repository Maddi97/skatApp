from datetime import datetime
from flask import jsonify

from generate_database import create_database


class database_controller:
    def __init__(self):
        self.engine = create_database()
        self.engine.execute("USE test")

    def add_player(self, name):
        self.engine.execute(
            "INSERT INTO Player VALUES(null, '{}')".format(name))

    def add_gameDetails(self, gameRound, gameID, playerID, score, color, unter,  hand, schneider, schwarz, schneider_angesagt, schwarz_angesagt, ouvert, bock):
        print(gameRound, gameID, playerID, score, color, unter,  hand,
              schneider, schwarz, schneider_angesagt, schwarz_angesagt, ouvert, bock)
        self.engine.execute(
            "INSERT INTO GameDetails Values({}, {}, {}, {}, {}, '{}', '{}', {}, {}, {}, {}, {}, {}, {})".format(
                gameRound, gameID, playerID, score, self.get_scoreSum(gameID, gameRound, playerID)+score, str(color), str(unter),  hand, schneider, schwarz, schneider_angesagt, schwarz_angesagt, ouvert, bock)
        )

    def add_game(self, date, gameRoundAmount, playerAmount):
        self.engine.execute(
            "INSERT INTO Game Values(null, '{}' , {}, {})".format(
                date, gameRoundAmount, playerAmount
            )
        )

    def get_player_id(self, name):
        result = None
        id = self.engine.execute(
            "SELECT playerID FROM Player WHERE name= '{}' ".format(name))

        for x in id:
            result = x[0]

        return result

    def get_last_game_id(self):
        result = None
        gameID = self.engine.execute(
            "SELECT MAX(gameID) from Game"
        )
        for x in gameID:
            result = x[0]

        return result

    def get_scoreSum(self, gameID, gameRound, playerID):
        result = 0
        scoreSum = self.engine.execute(
            "SELECT SUM(score) FROM GameDetails WHERE GameDetails.gameID={} AND GameDetails.gameRound <= {} AND GameDetails.playerID={}".format(
                gameID, gameRound, playerID)
        )
        for x in scoreSum:
            result = x[0]
        if(result == None):
            result = 0
        return result

    def get_last_round_num(self, gameID):
        result = None
        num = self.engine.execute(
            "SELECT MAX(gameRound) from GameDetails WHERE GameDetails.gameID={}".format(
                gameID)
        )
        for x in num:
            result = x[0]

        return result

    def get_gameDetails(self, gameID):
        result = None
        details = self.engine.execute(
            "SELECT * FROM GameDetails WHERE gameID={}".format(gameID))

        currentDetailsAsDict = {}
        for x in details:
            currentDetailsAsDict[x[0]] = (dict(x))

        return currentDetailsAsDict


# x = database_controller()

# x.add_player('Maddi')
# x.add_player('Johann')
# x.add_player('Johan')
# x.add_player('Friedrich')
# x.add_player('Jakob')

# x.add_game(str(datetime.now()).split(" ")[0], 1, 4)
# x.add_gameDetails(1, 1, 1, 144, 'Grand',
#                   'Mit 4', 1, 0, 0, 1, 1, 0, 1)
# x.add_gameDetails(x.get_last_round_num(1)+1, 1, 3, 1344, 'Grün',
#                   'Mit 4', 1, 0, 0, 1, 1, 0, 1)
# x.add_gameDetails(x.get_last_round_num(1)+1, 1, 4, 423, 'Rot',
#                   'Mit 4', 1, 0, 0, 1, 1, 0, 1)
# x.add_gameDetails(x.get_last_round_num(1)+1, 1, 2, 144, 'Null',
#                   'Mit 4', 1, 0, 0, 1, 1, 0, 1)
# x.add_gameDetails(x.get_last_round_num(1)+1, 1, 2, 1344, 'Grand',
#                   'Mit 4', 1, 0, 0, 1, 1, 0, 1)
# x.add_gameDetails(x.get_last_round_num(1)+1, 1, 1, 423, 'Grand',
#                   'Mit 4', 1, 0, 0, 1, 1, 0, 1)

# x.add_game(str(datetime.now()).split(" ")[0], 1, 4)

# x.add_gameDetails(1, 2, 1, 1344, 'Grand',
#                   'Mit 4', 1, 0, 0, 1, 1, 0, 1)
# x.add_gameDetails(2, 2, 1, 423, 'Grand',
#                   'Mit 4', 1, 0, 0, 1, 1, 0, 1)
# x.add_gameDetails(3, 2, 2, 432, 'Null',
#                   'Mit 4', 1, 0, 0, 1, 1, 0, 1)
# x.add_gameDetails(4, 2, 4, 32, 'Grand',
#                   'Mit 4', 1, 0, 0, 1, 1, 0, 1)
# x.add_gameDetails(5, 2, 5, 122, 'Grand',
#                   'Mit 4', 1, 0, 0, 1, 1, 0, 1)

# x.add_game(36, datetime.now(), ['Johan', 'Friedrich', 'Jakob'])
# x.add_score(1,1, 1, 144, 'Grand', -1, 'no' )

# b = x.get_last_game_id()
# print(b)

# x.get_gameDetails(b)
# print(str(datetime.now()).split(" ")[0])
# print(str(datetime.now()).split(" "))
