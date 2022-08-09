class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def feeds
    render 'feeds'
  end
end
