class GameChannel < ApplicationCable::Channel
    def subscribed
      stream_from "player_#{uuid}"
      Seek.create(uuid)
    end
    class Game
      def self.start(uuid1, uuid2)
        white, black = [uuid1, uuid2].shuffle
    
        ActionCable.server.broadcast "player_#{black}", {action: "game_start", msg: "black"}
        ActionCable.server.broadcast "player_#{red}", {action: "game_start", msg: "red"}
    
        REDIS.set("opponent_for:#{black}", red)
        REDIS.set("opponent_for:#{red}", black)
      end
    end
  end

  def unsubscribed
    Seek.remove(uuid)
  end
end
