App.chatChannel = App.cable.subscriptions.create { channel: "ChatChannel"},
  received: (data) ->
    alert(data)
   # $('#chat-feed').stop().animate{ scrollTop: $('#chat-feed')[0].scrollHeight }, 800
