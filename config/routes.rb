Rails.application.routes.draw do

  resources :inquilinos
  resources :inquilinos
  resources :inquilinos
  resources :mov_cajas
  resources :cajas
  resources :cajas
  resources :detalle_recibos
  resources :recibos
  resources :movimientos do
    collection do
      put :pagar
    end
  end
  resources :departamentos
  resources :contratos
  
  resources :inquilinos do
    collection do
      get :autocomplete_inquilino_nombre
    end
  end
  
  resources :edificios

  #devise_for :usuarios

  devise_for :usuario,  controllers: { sessions: "usuario/sessions", registrations: "usuario/registrations", passwords: "usuario/passwords"  }, :path_names => {:sign_in => 'login', :sign_up => 'registro', :sign_out => 'logout'}
  as :usuarios do
    get 'sign_in' => 'usuario/sessions#new', :as => :new_usuario_session_path
    get 'sign_up' => 'usuario/registrations#create', :as => :usuario_registration_path
    delete 'sign_out' => 'usuario/sessions#destroy', :as => :destroy_usuario_session_path
    get 'new' => 'usuario/sessions#destroy', :as => :new_usuario_password_path
  end

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  cajaabierto = nil
  #cajaabierto = Caja.where(estado: 0).last

  if cajaabierto != nil
    root 'contratos#index'
  else
    root 'cajas#new'
  end

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
