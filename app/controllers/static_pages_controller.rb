class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def feeds
    render 'feeds'
  end

  def user_tweets
    @data = { username: params[:username] }.to_json
    render 'user_tweets'
  end

end
