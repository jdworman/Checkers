Rails.application.routes.draw do
  root 'pages#index'
  # root 'dashboard#show'

  get 'users/new'
  get 'login', to: 'sessions#new'
  get 'logout', to: 'sessions#destroy'

  

  resources :index
  resources :sessions, only: [:create]
  resources :users
end
