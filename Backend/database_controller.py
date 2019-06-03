from datetime import datetime

from generate_database import create_database


class database_controller:
    def __init__(self):
        self.engine = create_database()
        self.engine.execute("USE test")
    def add_player(self, name):
        self.engine.execute(
            "INSERT INTO player VALUES(null, '{}')".format(name))

    def add_game(self, count, date, playerList):
        idList = []

        for i in playerList:
            idList.append(self.get_player_id(i))


# 3-5 player per game
#date, count, p1, p2, p3, ( p4, p5)
        if(len(idList) == 3):
            self.engine.execute("INSERT INTO games VALUES(null, '{}',{}, {},{},{}, null, null)".format(
                date, count, idList[0], idList[1], idList[2]))
                
        elif(len(idList) == 4):
            self.engine.execute("INSERT INTO games VALUES(null, '{}',{}, {},{},{},{}, null)".format(
                date, count, idList[0], idList[1], idList[2], idList[3]))
        elif(len(idList) == 5):
            self.engine.execute("INSERT INTO games VALUES(null, '{}',{}, {},{},{},{},{})".format(
                date, count, idList[0], idList[1], idList[2], idList[3], idList[4]))
        else:
            print("Unknown error occurd in add_game")

    def get_player_id(self, name):
        result = None
        id = self.engine.execute(
            "SELECT playerID FROM player WHERE name= '{}' ".format(name))

        for x in id:
            result = x[0]

        return result

    def get_last_game_id(self):
        result = None
        id = self.engine.execute(
            "SELECT MAX(gameID) from games"
        )
        for x in id:
            result = x[0]

        return result

    def add_score(self, playerID, gameID, gameNum, score, color, unter, bock,  hand, schneider, schwarz, schneider_angesagt, schwarz_angesagt, ouvert ):
        self.engine.execute("INSERT INTO game VALUES({}, {}, {}, {}, '{}', '{}', {}, {}, {}, {}, {}, {})".format(
            playerID, gameID, gameNum, score, color, unter,bock, hand, schneider, schwarz, schneider_angesagt, schwarz_angesagt, ouvert
        ))

    

# x = database_controller()
# x.add_player('Maddi')
# x.add_player('Johann')
# x.add_player('Johan')
# x.add_player('Friedrich')
# x.add_player('Jakob')


# x.add_game(5, datetime.now(), [
#            'Maddi', 'Johann', 'Johan', 'Friedrich', 'Jakob'])

# x.add_game(36, datetime.now(), ['Johan', 'Friedrich', 'Jakob'])
# x.add_score(1,1, 1, 144, 'Grand', -1, 'no' )