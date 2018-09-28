Rails.application.routes.draw do
  root 'pages#index'
  # root 'dashboard#show'

   
  resources :users

  mount ActionCable.server => '/cable'
end
