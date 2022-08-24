json.tweets do
  json.array! @tweets do |tweet|
    json.id tweet.id
    json.message tweet.message
    json.username tweet.user.username
    json.created_at tweet.created_at
    
    if tweet.image.attached?
      json.image url_for(tweet.image)
    else
      json.image nil
    end

  end
end