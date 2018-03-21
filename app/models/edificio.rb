class Edificio < ActiveRecord::Base

	has_many :departamentos

	accepts_nested_attributes_for :departamentos, allow_destroy: true

	validates :nombre_edificio, presence: true
	validates :nombre_propietario, presence: true
	validates :direccion, presence: true

end
