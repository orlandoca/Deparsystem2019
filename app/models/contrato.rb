class Contrato < ActiveRecord::Base

	mount_uploader :imagen, FotoUploader
	mount_uploader :imagendos, FotoUploader

	belongs_to :inquilino
	belongs_to :departamento

	has_many :movimientos
	has_many :recibos

	validates :inquilino_id,  presence: true
	validates :departamento_id,  presence: true



end
