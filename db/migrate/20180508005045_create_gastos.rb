class CreateGastos < ActiveRecord::Migration
  def change
    create_table :gastos do |t|
      t.integer :edificio_id
      t.integer :cantidad
      t.string :detalle
      t.integer :costo
      t.integer :total

      t.timestamps null: false
    end
    add_foreign_key(:gastos, :edificios)
  end
end
