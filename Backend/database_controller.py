from datetime import datetime
from flask import jsonify
from typing import List
from generate_database import create_database
from sqlalchemy.sql import select, insert, update
from sqlalchemy import func, and_
from classes import *
from errors import *

class database_controller:
    def __init__(self):
        self.engine, self.meta = create_database()
        tables = self.meta.tables
        self.engine.execute("USE test")
        self.tPlayers = tables["Player"]
        self.tGame = tables["Game"]
        self.tGameDetails = tables["GameDetails"]
        self.tGameParticipants = tables["GameParticipants"]
    
    """
    player CRUD
    """
    def add_player(self, player: Player) -> int:
        if self.__pre_condition_fail(player):
            raise PreConditionError()

        insertion = insert(self.tPlayers).values(name=player.name)
        query = self.engine.execute(insertion)

        return query.inserted_primary_key[0]

    def get_player(self, **kwargs) -> Player:
        query = self.__defaultSelection(self.tPlayers, kwargs)

        return Player.db_mapping(dict(query.first()))

    """
    game CRUD
    """
    def add_game(self, game: Game) -> int :
        if self.__pre_condition_fail(game):
            raise PreConditionError()
        insertion = insert(self.tGame).values(date= game.date, gameRoundAmount= game.gameRoundAmount, playerAmount= len(game.players))

        query = self.engine.execute(insertion)
        gameID = query.inserted_primary_key[0]

        if game.players:
            try:
                self.add_game_participants(gameID, list(map(lambda player: player.playerID, game.players)))
            except Error as e:
                raise TransitiveError()

        return query.inserted_primary_key[0]

    def get_game(self, **kwargs) -> Game:
        query = self.__defaultSelection(self.tGame, kwargs)

        return Game.db_mapping(dict(query.first()))    

    def get_last_game_id(self) -> int:
        selection = select([func.max(self.tGame.c.gameID)])

        query = self.engine.execute(selection)      
        return query.scalar()

    """
    gameDetails CRUD
    """
    def add_game_details(self, gRound: Round) -> int:
        if self.__pre_condition_fail(gRound):
            raise PreConditionError()

        game = self.get_game(gameID= gRound.gameID)

        # please add players first
        if game.playerAmount < 1:
            raise PreConditionError()

        # 1 round -> all players play exactly once
        if gRound.gameRound/game.playerAmount > game.gameRoundAmount:
            print("exceeded maximum game rounds")
            raise PreConditionError()

        insertion = insert(self.tGameDetails).values(
            gameID= gRound.gameID, playerID= gRound.playerID,
            gameRound= gRound.gameRound , score= gRound.score,
            scoreSum= self.get_score_sum(gRound.gameID, gRound.gameRound, gRound.playerID)+gRound.score,
            color= gRound.color, unter= gRound.unter, hand= gRound.hand, 
            schwarz= gRound.schwarz, schneider= gRound.schneider,
            schwarzAngesagt = gRound.schwarzAngesagt, schneiderAngesagt= gRound.schneiderAngesagt,
            ouvert= gRound.ouvert, bock= gRound.bock
        )

        query = self.engine.execute(insertion)
        return query.inserted_primary_key[0]

    def get_game_details(self, **kwargs) -> List[Round]:
        query = self.__defaultSelection(self.tGameDetails,kwargs)

        rounds = query.fetchall()
        return list(rounds.map(lambda gRound: Round.db_mapping(dict(gRound)), rounds))

    def get_score_sum(self, gameID, gameRound, playerID) -> int:
        if (self.__pre_condition_fail(gameID, gameRound, playerID) 
        or gameID < 0 or gameRound < 0 or playerID < 0):
            raise PreConditionError()

        selection = select([func.sum(self.tGameDetails.c.score)]).where(
            and_(
                self.tGameDetails.c.gameID == gameID,
                self.tGameDetails.c.gameRound == gameRound,
                self.tGameDetails.c.playerID == playerID
            )
        )
        
        query = self.engine.execute(selection)
        scoreSum = query.scalar()
        return scoreSum if scoreSum else 0

    def get_last_round_num(self, gameID) -> int:
        if self.__pre_condition_fail(gameID) or gameID < 0:
            raise PreConditionError()
            
        selection = select([func.max(self.tGameDetails.c.gameRound)]).where(self.tGameDetails.c.gameID == gameID)

        query = self.engine.execute(selection)
        roundNum = query.scalar()
        return roundNum if roundNum else 0

    """
    gameParticipants CRUD
    """
    def add_game_participants(self, gameID: int, participants: List[int]) -> int:
        if self.__pre_condition_fail(gameID, participants) or gameID < 0:
            raise PreConditionError()

        values = list(map(lambda playerID: {'gameID': gameID, 'playerID': playerID}, participants))
        insertion = insert(self.tGameParticipants).values(values)
        
        query = self.engine.execute(insertion)
        
        updateGame = update(self.tGame).values(playerAmount = self.tGame.c["playerAmount"] + len(participants)).where(self.tGame.c["gameID"] == gameID)
        try:
            self.engine.execute(updateGame)
        except Exception as e:
            raise TransitiveError()

        return query.rowcount

    def get_game_participants(self, gameID) -> List[Player]:
        if self.__pre_condition_fail(gameID) or gameID < 0:
            raise PreConditionError()

        participants = self.get_game_participant_ids(gameID)

        return list(map(lambda playerID: self.get_player(playerID = playerID), participants))

    def get_game_participant_ids(self, gameID) -> List[int]:
        if self.__pre_condition_fail(gameID) or gameID < 0:
            raise PreConditionError()

        selection = select([self.tGameParticipants.c.playerID]).where(self.tGameParticipants.c.gameID == gameID)

        query = self.engine.execute(selection)
        return list(map(lambda x: x["playerID"], query.fetchall()))

    """
    private helper methods
    """
    def __defaultSelection(self, table, kwargs): 
        selection = select([table])

        for key in kwargs.keys():
            selection = selection.where(table.c[key] == kwargs[key])

        query = self.engine.execute(selection)
        return query

    def __pre_condition_fail(self, *args):
        for i in args:
            if i is None or not i:
                return True
        return False

    """
    init method
    """
    def prefill_database_with_test_values(self):

        """
        Players
        """
        # create new Player Object
        maddi = Player(None,'Maddi')
        # assign previously unassigned ID
        maddi.playerID = self.add_player(maddi)

        # 4 times more
        johann = Player(None,'Johann')
        johann.playerID = self.add_player(johann)
        johan = Player(None,'Johan')
        johan.playerID = self.add_player(johan)
        friedrich = Player(None,'Friedrich')
        friedrich.playerID = self.add_player(friedrich)
        jakob = Player(None,'Jakob')
        jakob.playerID = self.add_player(jakob)
        
        """
        Game
        """
        # create game
        game1 = Game(None, datetime.now().isoformat(),2, [johann, jakob, maddi]) # 2 runden
        # assign gameID
        game1.gameID = self.add_game(game1)
        # same as above
        game2 = Game(None, datetime.now().isoformat(),1, []) # 1 runde
        game2.gameID = self.add_game(game2)
        
        """
        Participants
        """
        # add gameParticipants in DB
        # validation
        try:
            self.add_game_participants(game1.gameID, list(map(lambda player: player.playerID, game1.players)))
            print("ERROR - this should've failed")
        except Exception as e:
            # everything is gucci
            pass

        self.add_game_participants(game2.gameID, list(map(lambda player: player.playerID, game1.players)))
        """
        Rounds
        """
        #game 1
        round1 = Round(game1.gameID, johann.playerID, self.get_last_round_num(game1.gameID)+1, 144, None, 'Grand', 'Mit 4', 1, 0, 0, 1, 1, 0, 1)
        self.add_game_details(round1)
        round2 = Round(game1.gameID, jakob.playerID, self.get_last_round_num(game1.gameID)+1, 1344, None, 'Grün',
                        'Mit 4', 1, 0, 0, 1, 1, 0, 1 )
        self.add_game_details(round2)
        round3 = Round(game1.gameID, maddi.playerID, self.get_last_round_num(game1.gameID)+1, 1341, None, 'Grün',
                        'Mit 4', 1, 0, 0, 1, 1, 0, 1 )
        self.add_game_details(round3)
        round4 = Round(game1.gameID, johann.playerID, self.get_last_round_num(game1.gameID)+1, 423, None, 'Rot',
                        'Mit 4', 1, 0, 0, 1, 1, 0, 1 )
        self.add_game_details(round4)
        round5 = Round(game1.gameID, jakob.playerID, self.get_last_round_num(game1.gameID)+1, 144, None, 'Null',
                        'Mit 4', 1, 0, 0, 1, 1, 0, 1 )
        self.add_game_details(round5)
        round6 = Round(game1.gameID, maddi.playerID, self.get_last_round_num(game1.gameID)+1, 1344, None, 'Grand',
                        'Mit 4', 1, 0, 0, 1, 1, 0, 1 )
        self.add_game_details(round6)

        # game 2
        roundA = Round(game2.gameID, johan.playerID, self.get_last_round_num(game2.gameID)+1, 1344, None, 'Grün',
                        'Mit 4', 1, 0, 0, 1, 1, 0, 1 )
        self.add_game_details(roundA)
        roundB = Round(game2.gameID, friedrich.playerID, self.get_last_round_num(game2.gameID)+1, 1344, None, 'Grün',
                        'Mit 4', 1, 0, 0, 1, 1, 0, 1 )
        self.add_game_details(roundB)
        roundC = Round(game2.gameID, johann.playerID, self.get_last_round_num(game2.gameID)+1, 1344, None, 'Grün',
                        'Mit 4', 1, 0, 0, 1, 1, 0, 1 )
        self.add_game_details(roundC)

        roundD = Round(game2.gameID, johann.playerID, self.get_last_round_num(game2.gameID)+1, 1344, None, 'Grün',
                        'Mit 4', 1, 0, 0, 1, 1, 0, 1 )
        
        # validation
        try:
            self.add_game_details(roundD)
            print("Problems occured during setup")
        except Exception as e:
            print("Setup finished without problems")

   


if __name__ == "__main__":
     controller = database_controller()
     controller.prefill_database_with_test_values()

     
     
    
     
    # print(pid1)
    #  pid2 = x.add_player("bob")
    #  pid3 = x.add_player("bobi")
    #  gid = x.add_game("abc", 5,5)
    #  ids = x.add_game_participants(gid, [pid1,pid2,pid3])
    #  print(ids)






