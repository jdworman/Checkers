Rails.application.routes.draw do
  
  get 'users/new'
  get 'users/create'
  root 'pages#index'
  root 'dashboard#show'

  get 'users/new'
  get 'login', to: 'sessions#new'
  get 'logout', to: 'sessions#destroy'

  resources :sessions, only: [:create]
  resources :users, only: [:new, :create]
 


  resources :users

  mount ActionCable.server => '/cable'
end
