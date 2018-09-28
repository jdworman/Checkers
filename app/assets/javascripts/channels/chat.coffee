App.chatChannel = App.cable.subscriptions.create { channel: "ChatChannel"},
  received: (data) ->
    alert(data)
 