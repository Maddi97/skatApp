#!flask/bin/python
from flask import Flask
from flask_cors import CORS, cross_origin
from flask import jsonify
from flask import request
from datetime import datetime
from typing import List
import time
from database_controller import database_controller

db_controller = database_controller()
db_controller.prefill_database_with_test_values()

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return jsonify({'text': "Hello, World!"})


@app.route('/addGame', methods=['POST'])
def add_new_game():
    jsdata = request.json
    print(jsdata)
    db_controller.add_game(str(datetime.now()).split(" ")[
                           0], 1, len(jsdata['playerList']))
    return (jsonify({'success': 'true'}))

@app.route("/addGameParticipants", methods=["POST"])
def add_game_participants():
    gameId = request.args.get('gameID')
    playerList = request.json
    db_controller.add_game_participants(gameId,playerList)
    return (jsonify({'success': 'true'}))


@app.route('/addGameDetails', methods=['POST'])
def add_game_details():
    time.sleep(1)
    jsdata = request.json
   # print(jsdata)
    game_data = game_details_datasctrucutre(jsdata)
    gameID = db_controller.get_last_game_id()
    playerID = db_controller.get_player_id(game_data['Gespielt'])

   # print("game_data= {}".format(game_data))

    db_controller.add_gameDetails(game_data['No'], gameID, playerID, game_data[game_data['Gespielt']], game_data['Farbe'], game_data['Unter'],
                                  game_data['Hand'], game_data['Schneider'], game_data['Schwarz'], game_data['Schneider_angesagt'], game_data['Schwarz_angesagt'], game_data['Ouvert'], game_data['Bock'])

    return (jsonify({'success': 'true'}))


@app.route('/addPlayer', methods=['POST'])
def add_new_player():
    jsdata = request.json
    db_controller.add_player(jsdata['playerName'])
    return (jsonify({'success': 'true'}))


@app.route('/getGameDetailsCurrentGame', methods=['GET'])
def get_gameDetailsCurrentGame():
    time.sleep(2)
    gameID = db_controller.get_last_game_id()
    gameDetails = db_controller.get_gameDetails(gameID)

    scores =  {}

    # for roundi in gameDetails:
    #     scores.get(roundi.playerID, )

    
    return jsonify({'currentGameDetails': gameDetails})

@app.route("/latestGameID", methods=["GET"])
def get_latestGameId():
    return jsonify({'gameID':db_controller.get_last_game_id()})

def game_details_datasctrucutre(game_details):

    specs = game_details['Specs']
    game_details.pop('Specs', None)
    game_details['Hand'] = 0
    game_details['Schneider'] = 0
    game_details['Schwarz'] = 0
    game_details['Schneider_angesagt'] = 0
    game_details['Schwarz_angesagt'] = 0
    game_details['Ouvert'] = 0
    for i in specs:
        game_details[i] = 1

    if (game_details['Bock'] == True):
        game_details['Bock'] = 1

    return game_details


if __name__ == '__main__':
    app.run(debug=True)
