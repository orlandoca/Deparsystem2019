class Gasto < ActiveRecord::Base
  belongs_to :edificio
  belongs_to :caja

  validates :detalle, presence: true

  validates :costo, presence: true
  validates :costo, numericality: true
  validates :costo, length: { maximum: 10 }


end
