# App.game = App.cable.subscriptions.create "GameChannel",
#   connected: ->
#     # Called when the subscription is ready for use on the server
#     $('#status').html("Waiting for an other payer")
#
#   disconnected: ->
#     # Called when the subscription has been terminated by the server
#
#   received: (data) ->
#     switch data.action
#       when "game_start"
#         init()
