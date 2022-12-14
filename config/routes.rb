Rails.application.routes.draw do
  root 'static_pages#home'

    get '/feeds' => 'static_pages#feeds'
    get '/feeds/:username' => 'static_pages#user_tweets'

    namespace :api do
      # USERS
      post '/users' => 'users#create'

      # SESSIONS
      post '/sessions' => 'sessions#create'
      get '/authenticated' => 'sessions#authenticated'
      get  '/sessions/:id' => 'sessions#show'
      delete '/sessions' => 'sessions#destroy'

      # Tweets
      post '/tweets' => 'tweets#create'
      get '/tweets/' => 'tweets#index'
      get '/tweets/:id' => 'tweets#show'
      get '/:username/tweets' => 'tweets#index_by_user'
      get '/tweets/search/:keyword' => 'tweets#search'
      delete '/tweets/:id' => 'tweets#destroy'
    end

    # get '*path' => 'static_pages#home'
end
