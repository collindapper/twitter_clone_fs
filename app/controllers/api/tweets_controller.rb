<<<<<<< HEAD
module Api
  class TweetsController < ApplicationController
    def index
      @tweets = Tweet.all.order(created_at: :desc)
      render 'tweets/index'
    end
  
=======
module Api  
  class TweetsController < ApplicationController
    def index
      @tweets = Tweet.all.order(created_at: :desc)
      return render json: { error: 'not_found'}, status: :not_found
      if !@tweets

      render 'api/tweets/index', status: :ok
    end

    def show
      @tweet = Tweet.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found if !@tweet

      render 'api/tweets/show', status: :ok
    end

>>>>>>> dd82b751fa4af90f7ac2e057882531c35197f724
    def create
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)
      user = session.user
      @tweet = user.tweets.new(tweet_params)
<<<<<<< HEAD
  
      # check rate limit
      # user.tweets count in the past 60 minutes should be less than 30
      if user.tweets.where('created_at > ?', Time.now - 60.minutes).count >= 30
        return render json: {
          error: {
            message: 'Rate limit exceeded (30 tweets/hour). Please try again later.'
          }
        }
      end 
  
        @tweet = user.tweets.new(tweet_params)
  
      if @tweet.save
        TweetMailer.notify(@tweet).deliver! # invoke TweetMailer to send out the email when a tweet is successfully posted
        render 'tweets/create', status: 201
      end
    end
  
    def destroy
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)
  
      return render json: { success: false } unless session
  
      user = session.user
      tweet = Tweet.find_by(id: params[:id])
  
      if tweet and tweet.user == user and tweet.destroy
        render json: {
          success: true
        }
      else
        render json: {
          success: false
        }
      end
    end
  
    def index_by_user
      user = User.find_by(username: params[:username])
  
      if user
        @tweets = user.tweets
        render 'tweets/index'
      end
    end
  
    private
  
=======

      if @tweet.save
        render 'api/tweets/create'
      end
    end

    def destroy
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)

      return render json: { success: false } unless session

      user = session.user
      tweet = Tweet.find_by(id: params[:id])

      if tweet and tweet.user == user and tweet.destroy
        render json: { success: true }, status: :ok
      else
        render json: { success: false }, status: :bad_request
      end
    end

    def index_by_user
      user = User.find_by(username: params[:username])

      if user
        @tweets = user.tweets
        render 'api/tweets/details'
      end
    end

    private

>>>>>>> dd82b751fa4af90f7ac2e057882531c35197f724
      def tweet_params
        params.require(:tweet).permit(:message, :image)
      end
  end
<<<<<<< HEAD
=======
end
>>>>>>> dd82b751fa4af90f7ac2e057882531c35197f724
end