#!flask/bin/python
from typing import List
from datetime import datetime

from flask import Flask, Response, jsonify, request
from flask_cors import CORS, cross_origin
from flask.logging import create_logger
import json
import jsonpickle

from database_controller import database_controller
from classes import *


db_controller = database_controller()
db_controller.prefill_database_with_test_values()

app = Flask(__name__)
LOG = create_logger(app)
CORS(app)


@app.route('/', methods=["GET"])
def index():
    return jsonify({'text': "Hello, World!"})

@app.route('/player', methods=['GET'])
def get_player():
    player_data = request.args
    player = db_controller.get_player(**player_data)
    return toJSONResponse(player)

@app.route('/player', methods=['POST'])
def add_player():
    playerData = request.get_json()
    player = Player.from_JSON(playerData)
    player.playerID = db_controller.add_player(player)
    return toJSONResponse(player)


@app.route('/getAllPlayer', methods=['GET'])
def get_all_player():
    players=db_controller.get_all_player()
    return jsonify(players)

# TODO test
# TODO parse players
@app.route("/game", methods=["GET"])
def get_game():
    game_data = request.args
    game = db_controller.get_game(**game_data)
    game.players = db_controller.get_game_participants(game.gameID)
    return toJSONResponse(game)

# TODO test
# TODO add checks + automatic participant handling
@app.route('/game', methods=['POST'])
def add_game():
    gameData = request.get_json()
    game = Game.from_JSON(gameData)
    game.gameID = db_controller.add_game(game)
    return toJSONResponse(game)

# TODO parse players
@app.route("/latestGame", methods=["GET"]) 
def get_latest_game():
    latestGameId = db_controller.get_last_game_id()
    game = db_controller.get_game(id= latestGameId)
    return toJSONResponse(game)

# TODO test
@app.route("/gameParticipants", methods=["GET"])
def get_game_participants():
    gameID = request.args.get("gameID")
    players = db_controller.get_game_participants(gameID)
    return toJSONResponse(players)

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
    return toJSONResponse(rounds)

# TODO test
@app.route('/gameDetails', methods=['POST'])
def add_game_details():
    roundDetails = request.get_json()
    gRound = Round.from_JSON(roundDetails)
    db_controller.add_game_details(gRound)
    return toJSONResponse(gRound)

@app.errorhandler(Exception)
def handleInternalErrors(error):
    LOG.error(error)
    response = jsonify(jsonpickle.encode(error))
    response.status_code = 500
    return response 
"""
helper methods
"""
def toJSONResponse(obj) -> Response:
    return jsonify(jsonpickle.encode(obj, unpicklable=False))

if __name__ == '__main__':
    app.run(debug=True)
