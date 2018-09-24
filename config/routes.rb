Rails.application.routes.draw do
  root 'pages#index'
  

  resources :index
  mount ActionCable.server => "/cable"
  
end
