class AddImagenToContrato < ActiveRecord::Migration
  def change
    add_column :contratos, :imagen, :string
  end
end

