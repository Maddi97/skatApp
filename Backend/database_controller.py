from datetime import datetime
from flask import jsonify
from typing import List
from generate_database import create_database
from sqlalchemy.sql import select, insert
from sqlalchemy import func

class database_controller:
    def __init__(self):
        self.engine, self.meta = create_database()
        self.tables = self.meta.tables
        self.engine.execute("USE test")
        
    def add_player(self, name):
        insertion = insert(self.tables["Player"]).values(name=name)
        
        query = self.engine.execute(insertion)
        return query.inserted_primary_key[0]

    def add_game(self, date, gameRoundAmount, playerAmount):
        insertion = insert(self.tables["Game"]).values(date= date, gameRoundAmount= gameRoundAmount, playerAmount= playerAmount)
        
        query = self.engine.execute(insertion)
        return query.inserted_primary_key[0]
                    
    def add_gameDetails(self, gameRound, gameID, playerID, score, color, unter,  hand, schneider, schwarz, schneider_angesagt, schwarz_angesagt, ouvert, bock):
        insertion = insert(self.tables["GameDetails"]).values(
            gameRound= gameRound, gameID= gameID, playerID= playerID, score= score,
            scoreSum= self.get_scoreSum(gameID, gameRound, playerID)+score,
            color= color, unter= unter, hand= hand, schwarz= schwarz, schneider=schneider,
            schwarz_angesagt = schwarz_angesagt, schneider_angesagt= schneider_angesagt,
            ouvert= ouvert, bock= bock
        )

        query = self.engine.execute(insertion)
        return query.inserted_primary_key[0]

    def add_game_participants(self, gameID: int, participants: List[int]):
        values = list(map(lambda playerID: {'gameID': gameID, 'playerID': playerID}, participants))
        insertion = insert(self.tables["GameParticipants"]).values(values)
        
        query = self.engine.execute(insertion)
        return query.rowcount

    def get_player_id(self, name):
        players = self.tables["Player"]
        selection = select([players.c.playerID]).where(players.c.name == name)
        
        query = self.engine.execute(selection)
        return query.scalar()

    def get_last_game_id(self):
        result = self.engine.execute(
            "SELECT MAX(gameID) from Game"
        )
        
        return result.scalar()
    def get_game_by_id(self, gameID):
        result = self.engine.execute(
            '''
            SELECT * from Game
            WHERE gameID = {}
            '''.format(gameID)
        )

        return result.first()
    def get_gameDetails_by_id(self, gameID, playerID):
        return 
        #selection = self.tables["GameDetails"].sel
    def get_player_by_id(self, playerID):
        players = self.tables["Player"]
        selection = select([players]).where(players.c.playerID == playerID)
        
        query = self.engine.execute(selection)
        return query.first()

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

    def get_GameParticipants(self, gameID):
        self.engine.execute(
            '''
            SELECT distinct playerID 
            FROM 
            '''
        )

    def prefill_database_with_test_values(self):
        x = database_controller()
        print("inserting test values")
        x.add_player('Maddi')
        x.add_player('Johann')
        x.add_player('Johan')
        x.add_player('Friedrich')
        x.add_player('Jakob')

        x.add_game(str(datetime.now()).split(" ")[0], 1, 4)
        x.add_gameDetails(1, 1, 1, 144, 'Grand', 'Mit 4', 1, 0, 0, 1, 1, 0, 1)
        x.add_gameDetails(x.get_last_round_num(1)+1, 1, 3, 1344, 'Grün',
                        'Mit 4', 1, 0, 0, 1, 1, 0, 1)
        x.add_gameDetails(x.get_last_round_num(1)+1, 1, 4, 423, 'Rot',
                        'Mit 4', 1, 0, 0, 1, 1, 0, 1)
        x.add_gameDetails(x.get_last_round_num(1)+1, 1, 2, 144, 'Null',
                        'Mit 4', 1, 0, 0, 1, 1, 0, 1)
        x.add_gameDetails(x.get_last_round_num(1)+1, 1, 2, 1344, 'Grand',
                        'Mit 4', 1, 0, 0, 1, 1, 0, 1)
        x.add_gameDetails(x.get_last_round_num(1)+1, 1, 1, 423, 'Grand',
                        'Mit 4', 1, 0, 0, 1, 1, 0, 1)

        x.add_game(str(datetime.now()).split(" ")[0], 1, 4)

        x.add_gameDetails(1, 2, 1, 1344, 'Grand',
                        'Mit 4', 1, 0, 0, 1, 1, 0, 1)
        x.add_gameDetails(2, 2, 1, 423, 'Grand',
                        'Mit 4', 1, 0, 0, 1, 1, 0, 1)
        x.add_gameDetails(3, 2, 2, 432, 'Null',
                        'Mit 4', 1, 0, 0, 1, 1, 0, 1)
        x.add_gameDetails(4, 2, 4, 32, 'Grand',
                        'Mit 4', 1, 0, 0, 1, 1, 0, 1)
        x.add_gameDetails(5, 2, 5, 122, 'Grand',
                        'Mit 4', 1, 0, 0, 1, 1, 0, 1)

   


if __name__ == "__main__":
     x = database_controller()
     pid1 = x.add_player("hanno")
     print(x.get_player_id("hanno"))
     
    # print(pid1)
    #  pid2 = x.add_player("bob")
    #  pid3 = x.add_player("bobi")
    #  gid = x.add_game("abc", 5,5)
    #  ids = x.add_game_participants(gid, [pid1,pid2,pid3])
    #  print(ids)






