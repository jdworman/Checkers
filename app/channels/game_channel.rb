# class GameChannel < ApplicationCable::Channel
#   def subscribed
#      stream_from "player_#{uuid}"
#      Match.create(uuid)
#   end
#   def make_move(data)
#     p "Hello"
#     ActionCable.server.broadcast('player_uuid')
#   end
# end
