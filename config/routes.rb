Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'homepage#home'

    namespace :api do
      # Users
      post '/users' => 'users#create'

      # Sessions
      post '/sessions' => 'sessions#create'
      get '/authenticated' => 'sessions#authenticated'
      delete '/sessions' => 'sessions#destroy'

      # Tweets
      post '/tweets' => 'tweets#create'
      get '/tweets' => 'tweets#index'
      delete '/tweets/:id' => 'tweets#destroy'
      get '/users/:username/tweets' => 'tweets#index_by_user'
      get '/tweets/search/:keyword' => 'tweets#search'
    end

    get '/feeds' => 'homepage#feeds'
    get '/:username' => 'homepage#userpage'
    get '*path' => 'homepage#home'
end
