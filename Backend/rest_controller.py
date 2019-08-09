#!flask/bin/python
from flask import Flask
from flask_cors import CORS, cross_origin
from flask import jsonify
from flask import request
from datetime import datetime

from database_controller import database_controller
db_controller = database_controller()
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


@app.route('/addGameDetails', methods=['POST'])
def add_game_details():
    jsdata = request.json

    game_data = game_details_datasctrucutre(jsdata)
    gameID = db_controller.get_last_game_id()
    playerID = db_controller.get_player_id(game_data['Gespielt'])
    print("game_data= {}".format(game_data))
    db_controller.add_gameDetails(game_data['No'], gameID, playerID, game_data[game_data['Gespielt']], game_data['color'], game_data['unter'],
                                  game_data['hand'], game_data['schneider'], game_data['schwarz'], game_data['schneider_angesagt'], game_data['schwarz_angesagt'], game_data['ouvert'], game_data['bock'])
    return (jsonify({'success': 'true'}))


@app.route('/addPlayer', methods=['POST'])
def add_new_player():
    jsdata = request.json
    db_controller.add_player(jsdata['playerName'])
    return (jsonify({'success': 'true'}))


def game_details_datasctrucutre(game_details):
    # TODO
    return game_details


if __name__ == '__main__':
    app.run(debug=True)
