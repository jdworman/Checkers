class ChatChannel < ApplicationCable::Channel
    def subscribed
      stream_from 'chat'
    end

    def receive(data)
      p data
      view = ActionView::Base.new(ActionController::Base.view_paths, {})
      html = view.render(partial: 'pages/message', locals: {name: data['name'], message: data['message']}) 
      ActionCable.server.broadcast('chat', {html: html})
    end

      def send_message(data)
        ActionCable.server.broadcast 'chat', { message: data['message'], name: data['name']}
      end
    end
