class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_from "player_#{uuid}"
  end
end
