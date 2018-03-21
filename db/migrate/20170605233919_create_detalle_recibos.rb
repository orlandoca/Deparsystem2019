class CreateDetalleRecibos < ActiveRecord::Migration
  def change
    create_table :detalle_recibos do |t|
      t.integer :recibo_id
      t.integer :cuota
      t.string :descripcion
      t.integer :total

      t.timestamps null: false
    end
  end
end
