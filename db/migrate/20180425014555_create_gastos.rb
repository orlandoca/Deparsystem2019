class CreateGastos < ActiveRecord::Migration
  def change
    create_table :gastos do |t|
      t.integer :cantidad
      t.string :detalle
      t.integer :costo
      t.integer :total

      t.timestamps null: false
    end
  end
end
