class Pago < ActiveRecord::Base
	
	validates :contrato_id, presence: true

	validates :inquilino_id, presence: true

	validates :fecha_pago, presence: true

	validates :monto, presence: true

  	validates :estado, presence: true

end
