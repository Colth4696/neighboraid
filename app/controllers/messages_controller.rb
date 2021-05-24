class MessagesController < ApplicationController
    def create
        message = Message.new(message_params)
        chatroom = Chatroom.find(message_params["chatroom_id"])
        if message.save
            serialized_data = ActiveModelSerializers::Adapter::Json.new(
            MessageSerializer.new(message)
            ).serializable_hash
            MessagesChannel.broadcast_to chatroom, serialized_data
            head :ok
        # end
        else
            render json: message.errors.full_messages
        end
    end
    
    private
    
    def message_params
        params.require(:message).permit(:body, :chatroom_id, :user_id)
    end
  end


# class MessagesController < ApplicationController

#     def index
#         messages = Message.all
#         render json: messages
#     end

#     def create
#         message = Message.new(message_params)
#         chatroom = Chatroom.find(message_params["chatroom_id"])
#         if message.save
#             puts "successfully saved a message!"
#             MessagesChannel.broadcast_to chatroom, MessageSerializer.new(message) 
#             head :ok
#         end
#         render json: message
#     end


# #     def create
# #         message = Message.new(message_params)
# #         chatroom = Chatroom.find(message_params[:chatroom_id])
# #         if message.save
# #             serialized_data = ActiveModelSerializers::Adapter::Json.new(
# #                 MessageSerializer.new(message)
# #             ).serializable_hash
# #             ActionCable.server.broadcast 'chatroom_channel', serialized_data
# #             head :ok
# #             # serialized_data = ActiveModelSerializers::Adapter::Json.new(
# #             #     MessageSerializer.new(message)
# #             # ).serializable_hash
# #             # MessagesChannel.broadcast_to 'chatroom_channel', serialized_data
# #             # head :ok
# #         end
# # end

# private 

# def message_params
#     params.require(:message).permit(:body, :chatroom_id, :user_id)
# end
# end