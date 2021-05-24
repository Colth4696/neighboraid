class ChatroomSerializer < ActiveModel::Serializer
  attributes :id, :name, :volunteer_id, :request_id
  has_many :messages
end
