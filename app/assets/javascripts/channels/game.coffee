# App.game = App.cable.subscriptions.create "GameChannel",
# connected: ->
#     @printMessage("Waiting for opponent...")
#
#   printMessage: (message) ->
#     $("#messages").append("<p>#{message}</p>")
#
#   disconnected: ->
#     # Called when the subscription has been terminated by the server
#
#   received: (data) ->
#      switch data.action
#       when "game_start"
#         App.board.position("start")
#         App.board.orientation(data.msg)
#         @printMessage("Game started! You play as #{data.msg}.")