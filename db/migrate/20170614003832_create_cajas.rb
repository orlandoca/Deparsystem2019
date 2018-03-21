class CreateCajas < ActiveRecord::Migration
  def change
    create_table :cajas do |t|
      t.integer :usuario_id
      t.datetime :fecha_cierre
      t.integer :apertura
      t.integer :cierre
      t.integer :entrada
      t.integer :salida
      t.boolean :estado

      t.timestamps null: false
    end
  end
end
