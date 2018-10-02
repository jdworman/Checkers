# class GameChannel < ApplicationCable::Channel
#   def subscribed
#     stream_from "player_#{uuid}"
#   def self.create(uuid)
#     if opponent = REDIS.spop("seeks")
# 		red, black = [uuid, uuid2].shuffle
#       ActionCable.server.broadcast "player_#{black}", {action: "game_start", msg: "black"}
#       ActionCable.server.broadcast "player_#{red}", {action: "game_start", msg: "red"}
#     else
#       REDIS.sadd("seeks", uuid)
#     end
#   end
#
#   def self.remove(uuid)
#     REDIS.srem("seeks", uuid)
#   end
#
#   def self.clear_all
#     REDIS.del("seeks")
#   end
# end
