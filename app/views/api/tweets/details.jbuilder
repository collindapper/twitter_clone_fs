json.tweets do
  json.array! @tweets do |tweet|
    json.id tweet.id
    json.message tweet.message
    json.image url_for(tweet.image)
  end
end