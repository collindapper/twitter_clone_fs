json.tweet do
  json.id @tweet.id
  json.message @tweet.message
  json.image url_for(@tweet.image) if @tweet.image.attached?

  json.user do
    json.id @tweet.user.id
    json.username @tweet.user.username
  end
end