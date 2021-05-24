class ChatroomChannel < ApplicationCable::Channel
  # def subscribed
  #   chatroom = Chatroom.find(params[:id])
  #   stream_for chatroom
  # end
  def subscribed
    stream_from "conversations_channel"
  end
  
def unsubcribed
end
end
