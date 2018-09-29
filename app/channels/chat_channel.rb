class ChatChannel < ApplicationCable::Channel
    def subscribed
      stream_from 'chat'
    end

      def subscribed
        stream_from CHANNEL_NAME
      end

      # a simple echo implementation
      def send_message(data)
        ActionCable.server.broadcast CHANNEL_NAME, { message: data['message'], name: data['name']}
      end
    end
