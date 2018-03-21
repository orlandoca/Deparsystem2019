class Inquilino < ActiveRecord::Base

  has_many :contratos

  validates :cedula, presence: true
  validates :cedula, numericality: true
  validates :cedula, length: { maximum: 10 }

  validates :nombre, presence: true

  validates :apellido, presence: true

  validates :telefono, presence: true
  validates :telefono, numericality: true
  validates :telefono, length: { maximum: 10 }

  validates :email, presence: true

end
