class AddImagendosToContratos < ActiveRecord::Migration
  def change
    add_column :contratos, :imagendos, :string
  end
end
