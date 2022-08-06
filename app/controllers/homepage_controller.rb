class HomepageController < ApplicationController
  def home
    render 'home'
  end

  def feeds
    signed_in = authenticated

    if signed_in
      render 'feeds'
    else
      redirect_to '/home'
    end
  end

  def userpage
    signed_in = authenticated

    if signed_in
      render 'userpage'
    else
      redirect_to '/home'
    end
  end

  private

  def authenticated
    token = cookies.signed[:twitter_session_token]
    session = Session.find_by(token: token)

    if session
      return true
    else
      return false
    end
  end
  
end
