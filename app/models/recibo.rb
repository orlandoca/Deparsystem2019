class Recibo < ActiveRecord::Base
  has_many :detalle_recibos
  belongs_to :contrato
end
