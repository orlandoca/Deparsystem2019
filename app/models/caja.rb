class Caja < ActiveRecord::Base
  belongs_to :usuario
  has_many :mov_cajas
end
