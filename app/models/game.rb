# class Game < ApplicationRecord
#   def self.start(player1, player2)
#     # Randomly choses who gets to be noughts or crosses
#     red, black = [player1, player2].shuffle
#
#     # Broadcast back to the players subscribed to the channel that the game has started
#     ActionCable.server.broadcast "player_#{red}", {action: "game_start", msg: "red"}
#     ActionCable.server.broadcast "player_#{black}", {action: "game_start", msg: "black"}
#
#     # Store the details of each opponent
#     REDIS.set("opponent_for:#{red}", black)
#     REDIS.set("opponent_for:#{black}", red)
#   end
# end
