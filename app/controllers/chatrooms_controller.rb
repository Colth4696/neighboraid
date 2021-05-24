class ChatroomsController < ApplicationController

  def index
    chatrooms = Chatroom.all
    render json: chatrooms
  end

  def create
    chatroom = Chatroom.new(chatroom_params)
    if chatroom.save
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        ChatroomSerializer.new(chatroom)
      ).serializable_hash
      ActionCable.server.broadcast 'chatrooms_channel', serialized_data
      head :ok
    end
  end
  
  private
  
  def chatroom_params
    params.require(:chatroom).permit(:name, :request_id, :volunteer_id)
  end

    # def index
    #     chatrooms = Chatroom.all
    #     render json: chatrooms
    #   end
    
    #   def show
    #     chatroom = Chatroom.find(params[:id])
    #     render json: chatroom
    #   end

    #   def create
    #     chatroom = Chatroom.new(chatroom_params)
    #         if chatroom.save
    #           # render json: {
    #           #   status: :created,
    #           #   chatroom: chatroom
    #           # }
    #           # ActionCable.server.broadcast 'chatroom_channel', ChatroomSerializer.new(chatroom)
    #           # head :ok
    #         #   render json: {
    #         #     status: :created,
    #         #     chatroom: chatroom
    #         #   }
    #         # else 
    #         #   render json: {
    #         #     status: 500,
    #         #     errors: chatroom.errors.full_messages
    #         #   }
    #             # serialized_data = ActiveModelSerializers::Adapter::Json.new(
    #             #     ChatroomSerializer.new(@chatroom)
    #             # ).serializable_hash
    #             # ActionCable.server.broadcast 'chatroom_channel', serialized_data
    #             # head :ok
    #       end
    #       # render json: {
    #       #   status: :created,
    #       #   chatroom: chatroom
    #       # }
    # end

    # private
      
    # def chatroom_params
    #   params.require(:chatroom).permit(:name, :request_id, :volunteer_id)
    # end
  end

