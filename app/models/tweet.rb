class Tweet < ApplicationRecord
  belongs_to :user

  has_one_attached :image

  validates :user, presence: true
  validates :message, presence: true, length: { maximum: 140 }

  def created_at
    attributes['created_at'].strftime("%m/%d/%Y %H:%M")
  end
end
