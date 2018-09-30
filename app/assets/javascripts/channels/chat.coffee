actioncable_methods =
  connected: ->
    console.log 'connected to ChatChannel'

  disconnected: ->

  received: (data) ->
    console.log data
    messageEl = document.createElement("div") 
    messageEl.innerHTML = data['html']
    chatEl = document.getElementById("chat")
    chatEl.prepend(messageEl)

  send_message: (name, message) ->
    console.log "Send message #{message} to ChatChannel"
    @perform 'send_message', { message: message, name: name }


App.chat = App.cable.subscriptions.create { channel: "ChatChannel" }, actioncable_methods
App.onPressSend = (event) ->
  userName = document.getElementById("user-name").dataset.name
  currentMessageEl = document.getElementById("current-message")
  App.chat.send({name: userName, message: currentMessageEl.value})
  currentMessageEl.value = ''

