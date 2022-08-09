Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'static_pages#home'
  get '/feeds' => 'static_pages#feeds'

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


    get '/:username' => 'static_pages#userpage'
    get '*path' => 'static_pages#home'
end
