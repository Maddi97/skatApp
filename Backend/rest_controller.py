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

@app.route('/addGame', methods = ['POST'])
def add_new_game():
    jsdata = request.json
    print(jsdata)
    db_controller.add_game(1, datetime.now(), jsdata['playerList'])
    return (jsonify({'success': 'true'}))

@app.route('/addGameDetails', methods = ['POST'])
def add_game_details():
    jsdata = request.json

    game_data = game_details_datasctrucutre(jsdata)

    print("game_data= {}".format(game_data))
    db_controller.add_score(game_data['playerID'], game_data['gameID'], game_data['gameNum'], game_data['score'], game_data['color'], game_data['unter'], 
                           game_data['bock'], game_data['hand'], game_data['schneider'], game_data['schwarz'], game_data['schneider_angesagt'], game_data['schwarz_angesagt'], game_data['ouvert'])
    return (jsonify({'success': 'true'}))

@app.route('/addPlayer', methods = ['POST'])
def add_new_player():
    jsdata = request.json
    db_controller.add_player(jsdata['playerName'])
    return (jsonify({'success': 'true'}))


def game_details_datasctrucutre(game_details):
    # datastructure={'playerID': 0, 'gameID': 0, 'gameNum':0, 'score':0, 'color': '', 'unter': '',
    #                'bock':False, 'hand': False, 'schneider': False, 'schwarz': False, 'schneider_angesagt': False, 'schwarz_angesagt': False, 'ouvert': False}

    # datastructure['playerID']=db_controller.get_player_id(game_details['Gespielt'])
    # datastructure['gameID']=db_controller.get_last_game_id()
    # datastructure['gameNum']=game_details['No']
    # datastructure['score']=game_details[game_details['Gespielt']]
    # datastructure['color']=game_details['Farbe']
    # datastructure['unter']=game_details['Unter']
    datastructure={'playerID': 1, 'gameID': 1, 'gameNum':1, 'score':1010, 'color': 'Eichel', 'unter': 'Mit 2',
                   'bock':False, 'hand': False, 'schneider': False, 'schwarz': False, 'schneider_angesagt': False, 'schwarz_angesagt': False, 'ouvert': False}
    return datastructure
    

if __name__ == '__main__':
    app.run(debug=True)
