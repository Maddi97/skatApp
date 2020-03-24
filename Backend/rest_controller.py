#!flask/bin/python
from flask import Flask
from flask_cors import CORS, cross_origin
from flask import jsonify
from flask import request
from datetime import datetime
from typing import List
import time
from database_controller import database_controller
from classes import *
import json

db_controller = database_controller()
db_controller.prefill_database_with_test_values()

app = Flask(__name__)
CORS(app)


@app.route('/', methods=["GET"])
def index():
    return jsonify({'text': "Hello, World!"})

@app.route('/player', methods=['GET'])
def get_player():
    player_data = request.args
    player = db_controller.get_player(**player_data)
    return jsonify(**player.__dict__)

@app.route('/player', methods=['POST'])
def add_player():
    playerData = request.get_json()
    player = Player.from_JSON(playerData)
    player.playerID = db_controller.add_player(player)
    return jsonify(**player.__dict__)

<<<<<<< HEAD

@app.route('/getAllPlayer', methods=['GET'])
def get_all_player():
    players=db_controller.get_all_player()
    return jsonify(players)


=======
>>>>>>> develop
# TODO test
# TODO parse players
@app.route("/game", methods=["GET"])
def get_game():
    game_data = request.args
    game = db_controller.get_game(**game_data)
    return jsonify(**game.__dict__)

# TODO test
# TODO add checks + automatic participant handling
@app.route('/game', methods=['POST'])
def add_game():
    gameData = request.get_json()
    game = Game.from_JSON(gameData)
    game.gameID = db_controller.add_game(game)
    return jsonify(**game.__dict__)

# TODO parse players
<<<<<<< HEAD
@app.route("/latestGame", methods=["GET"]) 
def get_latest_game():
    latestGameId = db_controller.get_last_game_id()
    game = db_controller.get_game(gameID= latestGameId)
=======
@app.route("/latestGame", methods=["GET"])
def get_latest_game():
    latestGameId = db_controller.get_last_game_id()
    game = db_controller.get_game(id= latestGameId)
>>>>>>> develop
    return jsonify(**game.__dict__)

# TODO test
@app.route("/hameParticipants", methods=["GET"])
def get_game_participants():
    gameID = request.args.get("gameID")
    players = db_controller.get_game_participants(gameID)
    return jsonify(**players.__dict__)

# TODO test
@app.route("/gameParticipants", methods=["POST"])
def add_game_participants():
    gameId = request.args.get('gameID')
    playerList = request.get_json()
    insertedPlayerAmount = db_controller.add_game_participants(gameId,playerList)
    return jsonify(playerAmount= insertedPlayerAmount)

# TODO test
@app.route('/gameDetails', methods=['GET'])
def get_game_details():
    game_data = request.args
    rounds = db_controller.get_game_details(**game_data)
    return jsonify(**rounds.__dict__)

# TODO test
@app.route('/gameDetails', methods=['POST'])
def add_game_details():
    roundDetails = request.get_json()
    gRound = Round.from_JSON(roundDetails)
    db_controller.add_game_details(gRound)
    return jsonify(**gRound.__dict__)



if __name__ == '__main__':
    app.run(debug=True)
