actioncable_methods =
  connected: ->
    console.log 'connected to ChatChannel'

  disconnected: ->

  received: (data) ->
    console.log "Receive message #{data} from ChatChannel"
    messageEl = document.createElement("div")
    messageEl.innerHTML = data["message"]
    chatEl = document.getElementById("chat")
    chatEl.appendChild(messageEl)

  send_message: (name, message) ->
    console.log "Send message #{message} to ChatChannel"
    @perform 'send_message', { message: message, name: name }


App.chat = App.cable.subscriptions.create { channel: "ChatChannel" }, actioncable_methods
App.onPressSend = (event) ->
  currentMessageEl = document.getElementById("current-message")
  App.chat.send({message: currentMessageEl.value})
  currentMessageEl.value = ''

