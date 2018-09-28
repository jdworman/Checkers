class PagesController < ApplicationController
  def index
  end

  def chat
    message = params[:message]
    ActionCable.server.broadcast('chat', message)
  end

  def help
  end

  def contact
  end
end
