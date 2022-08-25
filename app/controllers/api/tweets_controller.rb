module Api  
  class TweetsController < ApplicationController
    def index
      @tweets = Tweet.all.order(created_at: :desc)
      return render json: { error: 'not_found'}, status: :not_found if !@tweets

      render 'api/tweets/index', status: :ok
    end

    def show
      @tweet = Tweet.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found if !@tweet

      render 'api/tweets/show', status: :ok
    end

    def create
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)
      user = session.user
      @tweet = user.tweets.new(tweet_params)

      if @tweet.save
        puts "params", params

        render 'api/tweets/create'
      end
    end

    def destroy
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)

      return render json: { success: false } unless session

      user = session.user
      tweet = Tweet.find_by(id: params[:id])

      # if tweet and tweet.user == user and tweet.destroy
      if tweet and tweet.destroy
        render json: { success: true }, status: :ok
      else
        render json: { success: false }, status: :bad_request
      end
    end

    def index_by_user
      user = User.find_by(username: params[:username])

      if user
        @tweets = (user.tweets).order(created_at: :desc)
        render 'api/tweets/index'
      end
    end

    private

      def tweet_params
        params.require(:tweet).permit(:message, :image, :user)
      end
  end
end
