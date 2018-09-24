App.game = App.cable.subscriptions.create "GameChannel",
connected: ->
    @printMessage("Waiting for opponent...")

  printMessage: (message) ->
    $("#messages").append("<p>#{message}</p>")

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
