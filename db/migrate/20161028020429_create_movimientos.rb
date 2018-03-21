class CreateMovimientos < ActiveRecord::Migration
  def change
    create_table :movimientos do |t|
      t.string :contrato_id
      t.integer :cuota
      t.date :vencimiento
      t.integer :monto
      t.boolean :estado

      t.timestamps null: false
    end
  end
end
