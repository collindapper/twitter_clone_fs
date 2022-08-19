class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def feeds
    render 'feeds'
  end

  def user_tweets
    render 'user_tweets'
  end
end
