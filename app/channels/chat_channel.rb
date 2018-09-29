class ChatChannel < ApplicationCable::Channel
      def subscribed
        stream_from 'chat'
      end

      def send_message(data)
        ActionCable.server.broadcast 'chat', { message: data['message'], name: data['name']}
      end
    end
